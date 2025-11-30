-- Sample events for testing
-- Run this AFTER running 004_create_events_table.sql
-- Make sure you have organizers in the database first

-- Get an organizer ID to use (replace with actual ID from your database)
-- You can get this by running: SELECT organizer_id, full_name, email FROM organizers LIMIT 1;

-- Sample events using the first organizer
WITH first_organizer AS (
  SELECT organizer_id FROM organizers LIMIT 1
)
INSERT INTO events (
  organizer_id, 
  event_name, 
  event_type, 
  attendee_count, 
  event_city, 
  event_address,
  budget, 
  needs_venue, 
  needs_catering, 
  needs_tech,
  venue_approved,
  catering_approved,
  tech_approved,
  special_requirements,
  status
)
SELECT 
  organizer_id,
  'Annual Tech Conference 2024',
  'conference',
  300,
  'New York',
  'Manhattan Convention Center Area',
  15000.00,
  true,
  true,
  true,
  false,
  false,
  false,
  'Need large projector screens, dietary restrictions for vegan attendees',
  'pending'
FROM first_organizer
UNION ALL
SELECT 
  organizer_id,
  'Summer Company Picnic',
  'corporate',
  150,
  'Los Angeles',
  'Santa Monica Beach area',
  8000.00,
  true,
  true,
  false,
  true,
  false,
  false,
  'Outdoor venue preferred, need shade structures',
  'pending'
FROM first_organizer
UNION ALL
SELECT 
  organizer_id,
  'Product Launch Event',
  'corporate',
  100,
  'Chicago',
  'Downtown Chicago',
  12000.00,
  true,
  true,
  true,
  true,
  true,
  true,
  'Premium catering required, need stage and lighting',
  'confirmed'
FROM first_organizer;

-- Verify the data
SELECT 
  event_name,
  attendee_count,
  event_city,
  budget,
  status
FROM events
ORDER BY created_at DESC;

