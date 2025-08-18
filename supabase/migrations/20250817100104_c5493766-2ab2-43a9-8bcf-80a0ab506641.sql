-- Create demo profiles with proper user data
INSERT INTO profiles (user_id, full_name, username, bio, location, specialties, is_artisan, verified, followers_count, following_count, posts_count) VALUES
(gen_random_uuid(), 'Rashida Begum', 'rashida_textiles', 'Master weaver specializing in traditional Bangladeshi textiles and Jamdani sarees. 25+ years of experience.', 'Dhamrai, Dhaka', ARRAY['Jamdani Weaving', 'Silk Textiles', 'Traditional Patterns'], true, true, 1250, 340, 45),
(gen_random_uuid(), 'Mohammad Rahman', 'mohammad_pottery', 'Traditional potter creating beautiful terracotta and clay vessels. Keeping ancient techniques alive.', 'Kagozipara, Rangpur', ARRAY['Terracotta Pottery', 'Clay Vessels', 'Decorative Items'], true, true, 890, 220, 32),
(gen_random_uuid(), 'Fatima Khan', 'fatima_jewelry', 'Jewelry artisan crafting exquisite pieces with silver and traditional stones.', 'Sonargaon, Narayanganj', ARRAY['Silver Jewelry', 'Traditional Ornaments', 'Stone Setting'], true, true, 2100, 180, 67),
(gen_random_uuid(), 'Ahmed Hassan', 'ahmed_metalwork', 'Metalwork specialist creating brass and copper decorative items and utensils.', 'Dhamoirhat, Naogaon', ARRAY['Brass Work', 'Copper Crafts', 'Metal Engraving'], true, true, 650, 150, 28),
(gen_random_uuid(), 'Nasreen Akter', 'nasreen_crafts', 'Multi-craft artisan working with bamboo, jute, and natural materials.', 'Tangail, Dhaka', ARRAY['Bamboo Crafts', 'Jute Work', 'Natural Materials'], true, true, 1100, 290, 39);

-- Clear existing demo data
DELETE FROM gallery_items;
DELETE FROM stories; 
DELETE FROM events;

-- Add sample gallery items
INSERT INTO gallery_items (user_id, title, description, image_url, category, tags, likes_count, comments_count) VALUES
((SELECT user_id FROM profiles WHERE username = 'rashida_textiles'), 'Exquisite Jamdani Saree', 'Hand-woven Jamdani saree with traditional motifs. This piece took 3 months to complete with intricate geometric patterns.', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 'Textiles', ARRAY['Jamdani', 'Saree', 'Traditional', 'Handwoven'], 89, 12),
((SELECT user_id FROM profiles WHERE username = 'mohammad_pottery'), 'Traditional Terracotta Pot Set', 'Beautiful set of terracotta pots perfect for cooking and storage. Made using 500-year-old techniques.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Pottery', ARRAY['Terracotta', 'Kitchen', 'Traditional', 'Handmade'], 67, 8),
((SELECT user_id FROM profiles WHERE username = 'fatima_jewelry'), 'Silver Filigree Necklace', 'Intricate silver necklace with traditional Bengali patterns. Each detail is hand-crafted with precision.', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop', 'Jewelry', ARRAY['Silver', 'Necklace', 'Filigree', 'Traditional'], 134, 19),
((SELECT user_id FROM profiles WHERE username = 'ahmed_metalwork'), 'Brass Decorative Plate', 'Hand-engraved brass plate with floral motifs. Perfect for decoration or special occasions.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop', 'Metalwork', ARRAY['Brass', 'Decorative', 'Engraved', 'Floral'], 45, 6),
((SELECT user_id FROM profiles WHERE username = 'nasreen_crafts'), 'Bamboo Basket Collection', 'Set of bamboo baskets in various sizes. Eco-friendly and perfect for storage.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 'Woodcraft', ARRAY['Bamboo', 'Baskets', 'Eco-friendly', 'Storage'], 78, 11);

-- Add sample stories
INSERT INTO stories (user_id, title, content, image_url, category, tags, likes_count, comments_count) VALUES
((SELECT user_id FROM profiles WHERE username = 'rashida_textiles'), 'The Art of Jamdani Weaving', 'Jamdani is a time-honored tradition passed down through generations. Each saree tells a story of patience, skill, and cultural heritage. The geometric patterns are not just designs but symbols of our rich history...', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 'Craftsmanship', ARRAY['Jamdani', 'Tradition', 'Heritage', 'Weaving'], 234, 45),
((SELECT user_id FROM profiles WHERE username = 'mohammad_pottery'), 'From Clay to Art: My Journey', 'Working with clay is like meditation. Every piece I create carries the spirit of the earth and the wisdom of my ancestors. Today I want to share how I learned this ancient craft...', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Personal Story', ARRAY['Pottery', 'Journey', 'Clay', 'Traditional'], 189, 32);

-- Add sample events
INSERT INTO events (user_id, title, description, location, event_date, category, image_url, max_participants, current_participants, is_online, contact_info) VALUES
((SELECT user_id FROM profiles WHERE username = 'rashida_textiles'), 'Jamdani Weaving Workshop', 'Learn the ancient art of Jamdani weaving in this hands-on workshop. We will cover basic techniques, pattern creation, and the history behind this UNESCO-recognized craft.', 'Dhamrai Cultural Center, Dhaka', '2024-03-15 10:00:00+06', 'Workshop', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 20, 12, false, '{"phone": "+8801712345678", "email": "rashida@example.com"}'),
((SELECT user_id FROM profiles WHERE username = 'mohammad_pottery'), 'Pottery Making for Beginners', 'Join us for an introduction to traditional pottery making. Learn to shape clay, understand glazing techniques, and create your own piece to take home.', 'Rahman Pottery Studio, Rangpur', '2024-03-20 14:00:00+06', 'Workshop', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 15, 8, false, '{"phone": "+8801787654321", "email": "mohammad@example.com"}');