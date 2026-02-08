import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, Lock, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Profile, Address } from '@/types/database';
import { toast } from 'sonner';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().optional(),
  alternate_phone: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  company_name: z.string().optional(),
  gst_number: z.string().optional(),
});

const addressSchema = z.object({
  label: z.string().optional(),
  full_name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone required'),
  address_line_1: z.string().min(5, 'Address is required'),
  address_line_2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Valid pincode required'),
  is_default: z.boolean().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type AddressFormData = z.infer<typeof addressSchema>;

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      alternate_phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      pincode: '',
      company_name: '',
      gst_number: '',
    },
  });

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: '',
      full_name: '',
      phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      pincode: '',
      is_default: false,
    },
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const [profileRes, addressesRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle(),
      supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false }),
    ]);

    if (profileRes.data) {
      setProfile(profileRes.data as Profile);
      profileForm.reset({
        full_name: profileRes.data.full_name || '',
        phone: profileRes.data.phone || '',
        alternate_phone: profileRes.data.alternate_phone || '',
        address_line_1: profileRes.data.address_line_1 || '',
        address_line_2: profileRes.data.address_line_2 || '',
        city: profileRes.data.city || '',
        state: profileRes.data.state || '',
        pincode: profileRes.data.pincode || '',
        company_name: profileRes.data.company_name || '',
        gst_number: profileRes.data.gst_number || '',
      });
    }
    if (addressesRes.data) setAddresses(addressesRes.data as Address[]);
    setLoading(false);
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user?.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const onAddressSubmit = async (data: AddressFormData) => {
    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update({ ...data, country: 'India' })
          .eq('id', editingAddress.id);
        if (error) throw error;
        toast.success('Address updated');
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({ ...data, user_id: user?.id, country: 'India' } as any);
        if (error) throw error;
        toast.success('Address added');
      }
      setAddressDialogOpen(false);
      setEditingAddress(null);
      addressForm.reset();
      fetchData();
    } catch (error) {
      toast.error('Failed to save address');
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await supabase.from('addresses').delete().eq('id', id);
      toast.success('Address deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    addressForm.reset({
      label: address.label || '',
      full_name: address.full_name,
      phone: address.phone,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2 || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      is_default: address.is_default,
    });
    setAddressDialogOpen(true);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
          <div className="h-96 bg-muted animate-pulse rounded-xl" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">My Profile</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <MapPin className="h-4 w-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={profileForm.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="gst_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GST Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </div>
                <Dialog open={addressDialogOpen} onOpenChange={(open) => {
                  setAddressDialogOpen(open);
                  if (!open) {
                    setEditingAddress(null);
                    addressForm.reset();
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...addressForm}>
                      <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                        <FormField
                          control={addressForm.control}
                          name="label"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Label (e.g., Home, Office)</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={addressForm.control}
                          name="address_line_1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 1 *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="address_line_2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pincode *</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          {editingAddress ? 'Update Address' : 'Add Address'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {addresses.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No addresses saved yet
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="p-4 border rounded-lg relative"
                      >
                        {address.is_default && (
                          <span className="absolute top-2 right-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                        <h4 className="font-medium">
                          {address.label || address.full_name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.address_line_1}
                          {address.address_line_2 && `, ${address.address_line_2}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.phone}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditAddress(address)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => deleteAddress(address.id!)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Email Address</h4>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-2">Sign Out</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Sign out from your account on this device
                  </p>
                  <Button variant="outline" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
