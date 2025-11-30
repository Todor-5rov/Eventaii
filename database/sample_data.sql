-- Sample data for testing the vendor registration system
-- Run this AFTER running 001_create_vendor_tables.sql

-- Sample Venues
INSERT INTO venues (venue_name, venue_capacity, venue_city, venue_address, price_per_event, contact_email, contact_phone)
VALUES
  ('Grand Ballroom Plaza', 300, 'New York', '123 Park Avenue, New York, NY 10001', 3500.00, 'contact@grandballroom.com', '+1 (212) 555-0100'),
  ('Riverside Event Center', 150, 'Los Angeles', '456 Ocean Drive, Los Angeles, CA 90001', 2200.00, 'info@riversideevent.com', '+1 (323) 555-0200'),
  ('Downtown Conference Hall', 500, 'Chicago', '789 Michigan Ave, Chicago, IL 60601', 5000.00, 'bookings@downtownconf.com', '+1 (312) 555-0300'),
  ('Garden View Pavilion', 100, 'San Francisco', '321 Golden Gate Blvd, San Francisco, CA 94102', 1800.00, 'events@gardenview.com', '+1 (415) 555-0400');

-- Sample Catering Services
INSERT INTO catering (company_name, service_capacity, service_city, price_per_person, cuisine_type, contact_email, contact_phone)
VALUES
  ('Gourmet Delights Catering', 500, 'New York', 45.00, 'American', 'orders@gourmetdelights.com', '+1 (212) 555-1001'),
  ('Mediterranean Feast Co.', 300, 'Los Angeles', 38.00, 'Mediterranean', 'catering@medfeast.com', '+1 (323) 555-1002'),
  ('Fusion Kitchen Events', 400, 'Chicago', 52.00, 'Mixed', 'contact@fusionkitchen.com', '+1 (312) 555-1003'),
  ('Taste of Italy Catering', 250, 'San Francisco', 42.00, 'Italian', 'info@tasteitaly.com', '+1 (415) 555-1004');

-- Sample Tech Vendors
INSERT INTO tech_vendors (company_name, equipment_type, service_city, base_price, contact_email, contact_phone)
VALUES
  ('Pro Audio Visual Services', 'Full AV', 'New York', 2500.00, 'bookings@proav.com', '+1 (212) 555-2001'),
  ('Elite Sound & Lighting', 'Audio', 'Los Angeles', 1500.00, 'contact@elitesound.com', '+1 (323) 555-2002'),
  ('TechPro Event Solutions', 'Video', 'Chicago', 1800.00, 'info@techpro.com', '+1 (312) 555-2003'),
  ('Stage Master Equipment', 'Lighting', 'San Francisco', 1200.00, 'rentals@stagemaster.com', '+1 (415) 555-2004');

-- Verify the data
SELECT 'Venues' AS table_name, COUNT(*) AS row_count FROM venues
UNION ALL
SELECT 'Catering', COUNT(*) FROM catering
UNION ALL
SELECT 'Tech Vendors', COUNT(*) FROM tech_vendors;

