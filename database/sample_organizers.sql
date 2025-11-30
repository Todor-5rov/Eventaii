-- Sample organizers for testing
-- Run this AFTER running 003_create_organizers_table.sql

INSERT INTO organizers (full_name, company_name, email, phone, city, typical_event_size, events_per_year)
VALUES
  ('Sarah Johnson', 'TechCorp Inc', 'sarah@techcorp.com', '+1 (555) 100-0001', 'New York', 'medium', 12),
  ('Michael Chen', 'Wedding Bliss', 'michael@weddingbliss.com', '+1 (555) 100-0002', 'Los Angeles', 'small', 25),
  ('Emily Rodriguez', 'Corporate Events Pro', 'emily@corporateevents.com', '+1 (555) 100-0003', 'Chicago', 'large', 8),
  ('David Kim', NULL, 'david@personal.com', '+1 (555) 100-0004', 'San Francisco', 'varies', 3),
  ('Jessica Martinez', 'Startup Hub', 'jessica@startuphub.com', '+1 (555) 100-0005', 'Austin', 'medium', 15);

-- Verify the data
SELECT 
  full_name,
  company_name,
  email,
  city,
  typical_event_size,
  events_per_year
FROM organizers
ORDER BY created_at DESC;

