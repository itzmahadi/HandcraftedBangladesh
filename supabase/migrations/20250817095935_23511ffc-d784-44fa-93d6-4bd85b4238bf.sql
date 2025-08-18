-- Update profiles with proper demo data and add sample content

-- Update profiles with proper demo data
UPDATE profiles SET 
  full_name = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 'Rashida Begum'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 'Mohammad Rahman'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 'Fatima Khan'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 'Ahmed Hassan'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 'Nasreen Akter'
    ELSE 'Artisan ' || substring(user_id::text from 1 for 8)
  END,
  username = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 'rashida_textiles'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 'mohammad_pottery'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 'fatima_jewelry'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 'ahmed_metalwork'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 'nasreen_crafts'
    ELSE 'artisan_' || substring(user_id::text from 1 for 8)
  END,
  bio = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 'Master weaver specializing in traditional Bangladeshi textiles and Jamdani sarees. 25+ years of experience.'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 'Traditional potter creating beautiful terracotta and clay vessels. Keeping ancient techniques alive.'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 'Jewelry artisan crafting exquisite pieces with silver and traditional stones.'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 'Metalwork specialist creating brass and copper decorative items and utensils.'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 'Multi-craft artisan working with bamboo, jute, and natural materials.'
    ELSE 'Traditional craftsperson dedicated to preserving Bangladeshi heritage through art.'
  END,
  location = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 'Dhamrai, Dhaka'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 'Kagozipara, Rangpur'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 'Sonargaon, Narayanganj'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 'Dhamoirhat, Naogaon'
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 'Tangail, Dhaka'
    ELSE 'Dhaka, Bangladesh'
  END,
  specialties = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN ARRAY['Jamdani Weaving', 'Silk Textiles', 'Traditional Patterns']
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN ARRAY['Terracotta Pottery', 'Clay Vessels', 'Decorative Items']
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN ARRAY['Silver Jewelry', 'Traditional Ornaments', 'Stone Setting']
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN ARRAY['Brass Work', 'Copper Crafts', 'Metal Engraving']
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN ARRAY['Bamboo Crafts', 'Jute Work', 'Natural Materials']
    ELSE ARRAY['Traditional Crafts', 'Handmade Items']
  END,
  is_artisan = true,
  verified = true,
  followers_count = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 1250
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 890
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 2100
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 650
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 1100
    ELSE floor(random() * 1000 + 100)
  END,
  following_count = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 340
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 220
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 180
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 150
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 290
    ELSE floor(random() * 300 + 50)
  END,
  posts_count = CASE user_id
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 0) THEN 45
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 1) THEN 32
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 2) THEN 67
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 3) THEN 28
    WHEN (SELECT user_id FROM profiles LIMIT 1 OFFSET 4) THEN 39
    ELSE floor(random() * 50 + 10)
  END
WHERE user_id IN (SELECT user_id FROM profiles LIMIT 5);

-- Clear existing demo data first
DELETE FROM gallery_items;
DELETE FROM stories;
DELETE FROM events;

-- Add sample gallery items with proper images
INSERT INTO gallery_items (user_id, title, description, image_url, category, tags, likes_count, comments_count) VALUES
((SELECT user_id FROM profiles LIMIT 1 OFFSET 0), 'Exquisite Jamdani Saree', 'Hand-woven Jamdani saree with traditional motifs. This piece took 3 months to complete with intricate geometric patterns.', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 'Textiles', ARRAY['Jamdani', 'Saree', 'Traditional', 'Handwoven'], 89, 12),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 1), 'Traditional Terracotta Pot Set', 'Beautiful set of terracotta pots perfect for cooking and storage. Made using 500-year-old techniques.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Pottery', ARRAY['Terracotta', 'Kitchen', 'Traditional', 'Handmade'], 67, 8),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 2), 'Silver Filigree Necklace', 'Intricate silver necklace with traditional Bengali patterns. Each detail is hand-crafted with precision.', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop', 'Jewelry', ARRAY['Silver', 'Necklace', 'Filigree', 'Traditional'], 134, 19),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 3), 'Brass Decorative Plate', 'Hand-engraved brass plate with floral motifs. Perfect for decoration or special occasions.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop', 'Metalwork', ARRAY['Brass', 'Decorative', 'Engraved', 'Floral'], 45, 6),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 4), 'Bamboo Basket Collection', 'Set of bamboo baskets in various sizes. Eco-friendly and perfect for storage.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 'Woodcraft', ARRAY['Bamboo', 'Baskets', 'Eco-friendly', 'Storage'], 78, 11),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 0), 'Cotton Dhoti with Border', 'Premium cotton dhoti with traditional border design. Comfortable and elegant.', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=600&fit=crop', 'Textiles', ARRAY['Cotton', 'Dhoti', 'Traditional', 'Menswear'], 56, 7),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 1), 'Ceramic Tea Set', 'Hand-painted ceramic tea set with traditional patterns. Perfect for tea ceremonies.', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop', 'Pottery', ARRAY['Ceramic', 'Tea Set', 'Painted', 'Traditional'], 92, 15),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 2), 'Gold-plated Earrings', 'Beautiful gold-plated earrings with traditional Bengali design elements.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop', 'Jewelry', ARRAY['Gold', 'Earrings', 'Traditional', 'Bengali'], 156, 23);

-- Add sample stories
INSERT INTO stories (user_id, title, content, image_url, category, tags, likes_count, comments_count) VALUES
((SELECT user_id FROM profiles LIMIT 1 OFFSET 0), 'The Art of Jamdani Weaving', 'Jamdani is a time-honored tradition passed down through generations. Each saree tells a story of patience, skill, and cultural heritage. The geometric patterns are not just designs but symbols of our rich history...', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 'Craftsmanship', ARRAY['Jamdani', 'Tradition', 'Heritage', 'Weaving'], 234, 45),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 1), 'From Clay to Art: My Journey', 'Working with clay is like meditation. Every piece I create carries the spirit of the earth and the wisdom of my ancestors. Today I want to share how I learned this ancient craft...', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 'Personal Story', ARRAY['Pottery', 'Journey', 'Clay', 'Traditional'], 189, 32),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 2), 'The Magic of Silver Work', 'Silver has always fascinated me. Its malleability allows me to create intricate designs that capture light and shadow beautifully. Each piece of jewelry I make is a canvas for storytelling...', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop', 'Craftsmanship', ARRAY['Silver', 'Jewelry', 'Craftsmanship', 'Art'], 167, 28),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 3), 'Preserving Metal Craft Traditions', 'In our digital age, its crucial to preserve traditional metalworking techniques. These skills, passed down through generations, are treasures that must not be lost...', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop', 'Tradition', ARRAY['Metalwork', 'Tradition', 'Preservation', 'Heritage'], 145, 21);

-- Add sample events
INSERT INTO events (user_id, title, description, location, event_date, category, image_url, max_participants, current_participants, is_online, contact_info) VALUES
((SELECT user_id FROM profiles LIMIT 1 OFFSET 0), 'Jamdani Weaving Workshop', 'Learn the ancient art of Jamdani weaving in this hands-on workshop. We will cover basic techniques, pattern creation, and the history behind this UNESCO-recognized craft.', 'Dhamrai Cultural Center, Dhaka', '2024-03-15 10:00:00+06', 'Workshop', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop', 20, 12, false, '{"phone": "+8801712345678", "email": "rashida@example.com"}'),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 1), 'Pottery Making for Beginners', 'Join us for an introduction to traditional pottery making. Learn to shape clay, understand glazing techniques, and create your own piece to take home.', 'Rahman Pottery Studio, Rangpur', '2024-03-20 14:00:00+06', 'Workshop', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', 15, 8, false, '{"phone": "+8801787654321", "email": "mohammad@example.com"}'),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 2), 'Silver Jewelry Design Masterclass', 'Advanced workshop on silver jewelry design and crafting. Perfect for those with basic metalworking knowledge who want to elevate their skills.', 'Sonargaon Craft Village, Narayanganj', '2024-03-25 09:00:00+06', 'Masterclass', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop', 12, 9, false, '{"phone": "+8801898765432", "email": "fatima@example.com"}'),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 3), 'Traditional Metalwork Exhibition', 'Exhibition showcasing the finest traditional metalwork from across Bangladesh. Meet the artisans and witness live demonstrations.', 'National Museum, Dhaka', '2024-04-01 10:00:00+06', 'Exhibition', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop', 200, 145, false, '{"phone": "+8801923456789", "email": "ahmed@example.com"}'),
((SELECT user_id FROM profiles LIMIT 1 OFFSET 4), 'Eco-Friendly Craft Fair', 'Sustainable crafting fair featuring bamboo, jute, and other natural materials. Learn about eco-friendly crafting practices.', 'Tangail Community Center', '2024-04-10 11:00:00+06', 'Fair', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop', 100, 67, false, '{"phone": "+8801834567890", "email": "nasreen@example.com"}');