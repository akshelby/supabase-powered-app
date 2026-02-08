-- Insert sample categories
INSERT INTO product_categories (name, slug, description, is_active) VALUES
('Kitchen Countertops', 'kitchen-countertops', 'Premium granite and marble countertops for modern kitchens', true),
('Flooring', 'flooring', 'Elegant stone flooring solutions for homes and commercial spaces', true),
('Bathroom', 'bathroom', 'Luxurious marble and granite for bathroom vanities and walls', true),
('Staircases', 'staircases', 'Stunning granite steps and staircase solutions', true),
('Wall Cladding', 'wall-cladding', 'Natural stone wall cladding for interior and exterior', true);

-- Insert sample services
INSERT INTO services (name, slug, short_description, description, icon, display_order, is_active) VALUES
('Stone Fabrication', 'stone-fabrication', 'Custom cutting and shaping of granite and marble', 'Our state-of-the-art fabrication facility uses CNC machines and skilled craftsmen to cut, shape, and edge stone slabs to your exact specifications.', '🔧', 1, true),
('Professional Installation', 'professional-installation', 'Expert installation by certified technicians', 'Our certified installation team ensures perfect fitting of your stone surfaces with minimal disruption to your daily routine.', '🏗️', 2, true),
('Stone Polishing & Restoration', 'stone-polishing', 'Restore the original shine of your stone surfaces', 'We bring back the natural beauty of your granite and marble surfaces through deep cleaning, scratch removal, and protective sealing.', '✨', 3, true),
('Design Consultation', 'design-consultation', 'Expert advice for your stone selection', 'Our design consultants help you choose the perfect stone for your project considering your style, budget, and requirements.', '📐', 4, true),
('Delivery Services', 'delivery-services', 'Safe and timely delivery across the region', 'Our specialized vehicles and trained handlers guarantee damage-free delivery to your project site.', '🚚', 5, true);

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, designation, company, review_text, rating, display_order, is_active) VALUES
('Rajesh Kumar', 'Homeowner', 'Mumbai', 'Excellent quality granite! The Black Galaxy countertop looks stunning in our kitchen.', 5, 1, true),
('Priya Sharma', 'Interior Designer', 'Design Studio Mumbai', 'Their collection, quality, and service are unmatched in the market.', 5, 2, true),
('Vikram Patel', 'Builder', 'Patel Constructions', 'Consistency in quality and competitive pricing makes them our preferred supplier.', 5, 3, true),
('Anita Desai', 'Architect', 'ASD Architects', 'The Blue Pearl granite we ordered exceeded our expectations.', 5, 4, true),
('Mohammed Ali', 'Contractor', 'Ali & Sons', 'Reliable supplier with excellent after-sales service. Highly recommended!', 4, 5, true);

-- Insert sample banners
INSERT INTO banners (title, subtitle, image_url, link_url, button_text, display_order, is_active) VALUES
('Premium Granite Collection', 'Discover luxury stones for your dream home', '/placeholder.svg', '/products', 'Explore Collection', 1, true),
('Expert Installation', 'Professional fitting by certified technicians', '/placeholder.svg', '/services', 'Our Services', 2, true),
('Free Estimation', 'Get a detailed quote for your project', '/placeholder.svg', '/estimation', 'Get Estimate', 3, true);

-- Insert sample hero carousel cards
INSERT INTO hero_carousel_cards (title, image_url, display_order, is_active) VALUES
('Black Galaxy Granite', '/placeholder.svg', 1, true),
('Kitchen Countertops', '/placeholder.svg', 2, true),
('Luxury Flooring', '/placeholder.svg', 3, true),
('Modern Bathrooms', '/placeholder.svg', 4, true),
('Stone Staircases', '/placeholder.svg', 5, true);

-- Insert carousel settings
INSERT INTO hero_carousel_settings (auto_rotate, rotation_speed, initial_visible_count, scroll_sensitivity) VALUES
(true, 3000, 5, 50.00);

-- Insert sample store locations
INSERT INTO store_locations (name, address, phone, email, google_maps_url, display_order, is_active) VALUES
('Main Showroom', 'Plot No. 45, Industrial Area, Sector 18, Navi Mumbai, Maharashtra 400705', '+91 98765 43210', 'info@shreegranites.com', 'https://maps.google.com', 1, true),
('Factory Outlet', 'Survey No. 123, Stone Market, Hosur Road, Bangalore, Karnataka 560100', '+91 98765 43211', 'bangalore@shreegranites.com', 'https://maps.google.com', 2, true);

-- Insert sample catalogs
INSERT INTO catalogs (title, description, file_url, is_active) VALUES
('Granite Collection 2024', 'Complete catalog of our premium granite collection', 'https://example.com/catalog.pdf', true),
('Marble Selection Guide', 'Explore our exclusive marble collection', 'https://example.com/marble-catalog.pdf', true),
('Kitchen Countertop Brochure', 'Design ideas for modern kitchen countertops', 'https://example.com/kitchen-brochure.pdf', true);