// Custom types for easier use throughout the app

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  stock_quantity: number;
  images: string[];
  specifications: Record<string, string>;
  category_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category?: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  shipping_address: Address | null;
  billing_address: Address | null;
  payment_id: string | null;
  payment_status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Address {
  id?: string;
  user_id?: string;
  label?: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  address_type?: 'home' | 'office' | 'other';
  is_default?: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  company: string | null;
  designation: string | null;
  review_text: string;
  rating: number;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerReview {
  id: string;
  user_id: string | null;
  customer_name: string;
  rating: number;
  review_text: string | null;
  photos: string[];
  video_url: string | null;
  profile_photo_url: string | null;
  pincode: string | null;
  area_name: string | null;
  city: string | null;
  street: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  button_text: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Catalog {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  thumbnail_url: string | null;
  is_active: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface EstimationEnquiry {
  id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  project_location: string | null;
  project_types: string[];
  project_nature: string | null;
  kitchen_type: string | null;
  stone_type: string | null;
  finish_type: string | null;
  thickness: string | null;
  quantity: string | null;
  flooring_required: boolean | null;
  budget_range: string | null;
  completion_urgency: string | null;
  expected_start_date: string | null;
  drawing_data: string | null;
  voice_recording_url: string | null;
  voice_transcription: string | null;
  reference_images: string[];
  preferred_color: string | null;
  additional_notes: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes: string | null;
  estimated_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface HeroCarouselCard {
  id: string;
  title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  google_maps_url: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  alternate_phone: string | null;
  avatar_url: string | null;
  gender: string | null;
  date_of_birth: string | null;
  address: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  country: string | null;
  company_name: string | null;
  gst_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteVisitor {
  id: string;
  ip_address: string | null;
  user_agent: string | null;
  page_url: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  visited_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: 'new' | 'contacted' | 'interested' | 'quoted' | 'converted' | 'lost';
  assigned_to: string | null;
  related_profile_id: string | null;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrmNote {
  id: string;
  lead_id: string | null;
  user_id: string | null;
  author_id: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface CrmFollowup {
  id: string;
  lead_id: string | null;
  user_id: string | null;
  due_at: string;
  completed_at: string | null;
  status: 'pending' | 'done' | 'skipped';
  channel: string | null;
  summary: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}
