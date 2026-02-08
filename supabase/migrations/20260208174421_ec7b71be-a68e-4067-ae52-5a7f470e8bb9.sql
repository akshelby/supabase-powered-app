-- Create enum types for estimation enquiries
CREATE TYPE public.kitchen_type AS ENUM ('straight', 'l_shape', 'u_shape', 'island');
CREATE TYPE public.project_nature_type AS ENUM ('new_construction', 'renovation');
CREATE TYPE public.stone_type_enum AS ENUM ('granite', 'marble', 'quartz', 'porcelain', 'not_sure');
CREATE TYPE public.finish_type_enum AS ENUM ('polished', 'honed', 'leather');
CREATE TYPE public.thickness_option AS ENUM ('18mm', '20mm', '30mm');
CREATE TYPE public.urgency_level AS ENUM ('flexible', 'within_1_month', 'within_2_weeks', 'urgent');
CREATE TYPE public.budget_range_enum AS ENUM ('under_50k', '50k_to_1l', '1l_to_2l', '2l_to_5l', 'above_5l', 'not_decided');
CREATE TYPE public.enquiry_status AS ENUM ('new', 'contacted', 'quoted', 'in_progress', 'completed', 'cancelled');

-- Add new columns to estimation_enquiries table
ALTER TABLE public.estimation_enquiries
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS project_type_other TEXT,
ADD COLUMN IF NOT EXISTS number_of_counters INTEGER,
ADD COLUMN IF NOT EXISTS approximate_length TEXT,
ADD COLUMN IF NOT EXISTS approximate_width TEXT,
ADD COLUMN IF NOT EXISTS tile_size_preference TEXT,
ADD COLUMN IF NOT EXISTS total_flooring_area TEXT,
ADD COLUMN IF NOT EXISTS cutouts_required TEXT[],
ADD COLUMN IF NOT EXISTS edge_profile_preference TEXT,
ADD COLUMN IF NOT EXISTS assigned_to UUID;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_estimation_enquiries_status ON public.estimation_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_estimation_enquiries_created_at ON public.estimation_enquiries(created_at DESC);