import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const projectTypes = [
  'Kitchen Countertop',
  'Bathroom Vanity',
  'Flooring',
  'Staircase',
  'Wall Cladding',
  'Outdoor Paving',
  'Monument',
  'Other',
];

const stoneTypes = [
  'Granite',
  'Marble',
  'Quartz',
  'Sandstone',
  'Limestone',
  'Other',
];

const finishTypes = ['Polished', 'Honed', 'Leathered', 'Flamed', 'Brushed'];
const thicknessOptions = ['18mm', '20mm', '30mm', '40mm', 'Custom'];
const budgetRanges = [
  'Under ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,50,000',
  '₹2,50,000 - ₹5,00,000',
  'Above ₹5,00,000',
];

const estimationSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  mobile_number: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  project_location: z.string().min(3, 'Project location is required'),
  project_types: z.array(z.string()).min(1, 'Select at least one project type'),
  stone_type: z.string().optional(),
  finish_type: z.string().optional(),
  thickness: z.string().optional(),
  budget_range: z.string().optional(),
  additional_notes: z.string().optional(),
});

type EstimationFormData = z.infer<typeof estimationSchema>;

const steps = [
  { title: 'Personal Info', description: 'Your contact details' },
  { title: 'Project Details', description: 'What you need' },
  { title: 'Preferences', description: 'Stone specifications' },
  { title: 'Review', description: 'Confirm details' },
];

export default function EstimationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EstimationFormData>({
    resolver: zodResolver(estimationSchema),
    defaultValues: {
      full_name: '',
      mobile_number: '',
      email: '',
      project_location: '',
      project_types: [],
      stone_type: '',
      finish_type: '',
      thickness: '',
      budget_range: '',
      additional_notes: '',
    },
  });

  const onSubmit = async (data: EstimationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('estimation_enquiries').insert({
        full_name: data.full_name,
        mobile_number: data.mobile_number,
        email: data.email || null,
        project_location: data.project_location,
        project_types: data.project_types,
        stone_type: data.stone_type || null,
        finish_type: data.finish_type || null,
        thickness: data.thickness || null,
        budget_range: data.budget_range || null,
        additional_notes: data.additional_notes || null,
      });

      if (error) throw error;

      toast.success('Estimation request submitted! We will contact you soon.');
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fields = [
      ['full_name', 'mobile_number', 'email'],
      ['project_location', 'project_types'],
      ['stone_type', 'finish_type', 'thickness', 'budget_range'],
      [],
    ];
    
    const isValid = await form.trigger(fields[currentStep] as any);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-medium"
          >
            Free Quote
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-2 mb-4"
          >
            Get Your Estimation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Fill out the form below and our team will provide you with a 
            detailed estimation for your project.
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  'flex flex-col items-center relative',
                  index < steps.length - 1 &&
                    'flex-1 after:content-[""] after:absolute after:top-4 after:left-1/2 after:w-full after:h-0.5 after:bg-border'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center z-10 text-sm font-medium',
                    index < currentStep
                      ? 'bg-primary text-primary-foreground'
                      : index === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className="text-xs mt-2 text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <p className="text-muted-foreground text-sm">
              {steps[currentStep].description}
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Step 1: Personal Info */}
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobile_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="project_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Area" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="project_types"
                      render={() => (
                        <FormItem>
                          <FormLabel>Project Type *</FormLabel>
                          <div className="grid grid-cols-2 gap-3">
                            {projectTypes.map((type) => (
                              <FormField
                                key={type}
                                control={form.control}
                                name="project_types"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(type)}
                                        onCheckedChange={(checked) => {
                                          const value = field.value || [];
                                          if (checked) {
                                            field.onChange([...value, type]);
                                          } else {
                                            field.onChange(
                                              value.filter((v) => v !== type)
                                            );
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                      {type}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="stone_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stone Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {stoneTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="finish_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Finish Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select finish" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {finishTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="thickness"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Thickness</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select thickness" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {thicknessOptions.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map((range) => (
                                  <SelectItem key={range} value={range}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="additional_notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements or details..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Name</span>
                          <p className="font-medium">{form.watch('full_name')}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Mobile</span>
                          <p className="font-medium">{form.watch('mobile_number')}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Email</span>
                          <p className="font-medium">{form.watch('email') || '-'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Location</span>
                          <p className="font-medium">{form.watch('project_location')}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Project Types</span>
                        <p className="font-medium">
                          {form.watch('project_types')?.join(', ') || '-'}
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Stone Type</span>
                          <p className="font-medium">{form.watch('stone_type') || '-'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Finish</span>
                          <p className="font-medium">{form.watch('finish_type') || '-'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Thickness</span>
                          <p className="font-medium">{form.watch('thickness') || '-'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Budget</span>
                          <p className="font-medium">{form.watch('budget_range') || '-'}</p>
                        </div>
                      </div>
                      {form.watch('additional_notes') && (
                        <div>
                          <span className="text-sm text-muted-foreground">Notes</span>
                          <p className="font-medium">{form.watch('additional_notes')}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
