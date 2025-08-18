-- Insert demo data for the application

-- First, create a demo user profile (this would normally be created by the auth trigger)
INSERT INTO profiles (user_id, username, full_name, bio, location, is_artisan, artisan_approved, specialties) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'rashida_begum', 'Rashida Begum', 'Master artisan specializing in traditional Kantha embroidery with 25 years of experience.', 'Rajshahi', true, true, ARRAY['Kantha Embroidery', 'Traditional Textiles']),
  ('00000000-0000-0000-0000-000000000002', 'mohammad_rahman', 'Mohammad Rahman', 'Third-generation Jamdani weaver preserving ancient textile traditions.', 'Dhaka', true, true, ARRAY['Jamdani Weaving', 'Traditional Textiles']),
  ('00000000-0000-0000-0000-000000000003', 'salma_khatun', 'Salma Khatun', 'Contemporary potter blending traditional techniques with modern design.', 'Bogura', true, true, ARRAY['Pottery', 'Ceramic Art']);

-- Insert demo gallery items
INSERT INTO gallery_items (user_id, title, description, image_url, category, tags, likes_count, comments_count) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Traditional Kantha Embroidery', 'A beautiful piece showcasing traditional Bengali needlework with intricate floral patterns.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', 'Textiles', ARRAY['Traditional', 'Handmade', 'Cotton'], 234, 45),
  ('00000000-0000-0000-0000-000000000002', 'Handwoven Jamdani Saree', 'Intricate geometric patterns woven in pure cotton with traditional motifs.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop', 'Textiles', ARRAY['Jamdani', 'Saree', 'Geometric'], 189, 32),
  ('00000000-0000-0000-0000-000000000003', 'Terracotta Pottery Set', 'Hand-molded clay pots with traditional motifs and natural glazing.', 'https://images.unsplash.com/photo-1578761499019-d38f11fd0c76?w=400&h=300&fit=crop', 'Pottery', ARRAY['Terracotta', 'Clay', 'Natural'], 203, 38);

-- Insert demo stories
INSERT INTO stories (user_id, title, content, image_url, tags, likes_count, comments_count) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'From Village to Global Recognition: My Kantha Journey', 'Growing up in a small village in Rajshahi, I never imagined my grandmother''s Kantha techniques would one day be showcased in international exhibitions. This is the story of preserving tradition while embracing modernity...', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop', ARRAY['Kantha', 'Women Empowerment', 'Heritage'], 342, 67),
  ('00000000-0000-0000-0000-000000000002', 'The Ancient Art of Jamdani: Weaving Stories into Fabric', 'For over 300 years, my family has been weaving Jamdani sarees. Each pattern tells a story, each thread carries the weight of generations. Learn about this UNESCO recognized art form...', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=250&fit=crop', ARRAY['Jamdani', 'Family Tradition', 'Weaving'], 456, 89),
  ('00000000-0000-0000-0000-000000000003', 'Modernizing Clay: How I Blend Traditional Pottery with Contemporary Design', 'While respecting traditional pottery techniques, I''ve found ways to create pieces that speak to modern sensibilities without losing their cultural essence. Here''s my approach to innovation...', 'https://images.unsplash.com/photo-1578761499019-d38f11fd0c76?w=400&h=250&fit=crop', ARRAY['Pottery', 'Modern Design', 'Innovation'], 234, 43);

-- Insert demo events
INSERT INTO events (user_id, title, description, image_url, event_date, location, category, max_participants, current_participants, is_online, contact_info) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Kantha Embroidery Workshop', 'Learn the traditional art of Kantha embroidery from master artisan Rashida Begum in this hands-on workshop.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop', '2024-03-22 10:00:00+06', 'Community Center, Rajshahi', 'Workshop', 25, 15, false, '{"email": "workshop@handcrafted.com", "phone": "+880123456789"}'),
  ('00000000-0000-0000-0000-000000000002', 'Jamdani Weaving Masterclass', 'An intensive masterclass on traditional Jamdani weaving techniques with 30 years experienced weaver.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=200&fit=crop', '2024-05-25 09:00:00+06', 'Rupganj, Narayanganj', 'Workshop', 15, 8, false, '{"email": "jamdani@handcrafted.com", "phone": "+880987654321"}'),
  ('00000000-0000-0000-0000-000000000003', 'Traditional Craft Fair 2024', 'The largest traditional craft exhibition in Bangladesh featuring over 150 master artisans showcasing their finest works.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop', '2024-03-15 09:00:00+06', 'Dhaka Exhibition Center', 'Exhibition', 150, 120, false, '{"email": "craftfair@handcrafted.com", "website": "www.craftfair2024.com"}');