-- Add vendor approval columns to events table
-- Run this if you already created the events table without approval columns

ALTER TABLE events 
ADD COLUMN IF NOT EXISTS venue_approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS catering_approved BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS tech_approved BOOLEAN DEFAULT false;

-- Create indexes for faster filtering by approval status
CREATE INDEX IF NOT EXISTS idx_events_venue_approved ON events(venue_approved);
CREATE INDEX IF NOT EXISTS idx_events_catering_approved ON events(catering_approved);
CREATE INDEX IF NOT EXISTS idx_events_tech_approved ON events(tech_approved);

-- Optionally, create a function to check if all required vendors are approved
CREATE OR REPLACE FUNCTION are_all_vendors_approved(event_row events)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if all needed vendors have approved
  RETURN (
    (NOT event_row.needs_venue OR event_row.venue_approved) AND
    (NOT event_row.needs_catering OR event_row.catering_approved) AND
    (NOT event_row.needs_tech OR event_row.tech_approved)
  );
END;
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT *, are_all_vendors_approved(events.*) as all_approved FROM events;

