-- Insert sample products with category references
INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Black Galaxy Granite', 'black-galaxy-granite', 4500, 5500, 100, true, true, 
  'Premium black granite with golden speckles', 
  'Luxurious Black Galaxy Granite features a deep black base with stunning golden and white speckles. Perfect for kitchen countertops, flooring, and wall cladding. Origin: India.',
  id FROM product_categories WHERE slug = 'kitchen-countertops';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Absolute Black Granite', 'absolute-black-granite', 3800, 4200, 150, true, true, 
  'Pure jet black granite with consistent color', 
  'Absolute Black Granite offers a uniform jet black appearance without any patterns. Ideal for modern minimalist designs. Origin: India.',
  id FROM product_categories WHERE slug = 'kitchen-countertops';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Kashmir White Granite', 'kashmir-white-granite', 3200, null, 80, true, false, 
  'Elegant white granite with grey veining', 
  'Kashmir White Granite features a creamy white background with subtle grey and burgundy minerals. Perfect for brightening any space.',
  id FROM product_categories WHERE slug = 'kitchen-countertops';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Tan Brown Granite', 'tan-brown-granite', 2800, 3200, 120, true, true, 
  'Warm brown granite with natural patterns', 
  'Tan Brown Granite displays rich brown tones with black and grey mineral deposits. A versatile choice for traditional and contemporary settings.',
  id FROM product_categories WHERE slug = 'flooring';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Blue Pearl Granite', 'blue-pearl-granite', 5200, 6000, 60, true, true, 
  'Stunning blue granite with shimmering effect', 
  'Blue Pearl Granite showcases a unique blue-grey base with iridescent feldspar crystals that shimmer in light. Origin: Norway.',
  id FROM product_categories WHERE slug = 'bathroom';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Imperial Red Granite', 'imperial-red-granite', 3500, null, 90, true, false, 
  'Bold red granite with dramatic appearance', 
  'Imperial Red Granite features a striking deep red color with black and grey mineral patterns. Makes a bold statement in any design.',
  id FROM product_categories WHERE slug = 'staircases';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Steel Grey Granite', 'steel-grey-granite', 2600, 2900, 200, true, false, 
  'Modern grey granite for contemporary designs', 
  'Steel Grey Granite offers a sleek grey appearance with subtle variations. Perfect for modern architectural projects.',
  id FROM product_categories WHERE slug = 'flooring';

INSERT INTO products (name, slug, price, compare_price, stock_quantity, is_active, is_featured, short_description, description, category_id) 
SELECT 'Green Galaxy Granite', 'green-galaxy-granite', 4800, 5500, 45, true, true, 
  'Exotic green granite with unique patterns', 
  'Green Galaxy Granite displays deep green tones with white mineral veining. An exotic choice for luxury interiors.',
  id FROM product_categories WHERE slug = 'wall-cladding';