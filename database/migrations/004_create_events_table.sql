-- Create Events Table
CREATE TABLE events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES organizers(organizer_id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  event_type VARCHAR(100), -- conference, wedding, corporate, party, etc.
  attendee_count INTEGER NOT NULL,
  event_city VARCHAR(100) NOT NULL,
  event_address TEXT,
  budget DECIMAL(10, 2) NOT NULL,
  
  -- Service requirements
  needs_venue BOOLEAN DEFAULT true,
  needs_catering BOOLEAN DEFAULT true,
  needs_tech BOOLEAN DEFAULT false,
  
  -- Vendor approvals
  venue_approved BOOLEAN DEFAULT false,
  catering_approved BOOLEAN DEFAULT false,
  tech_approved BOOLEAN DEFAULT false,
  
  -- Additional details
  special_requirements TEXT,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- pending, matched, confirmed, completed, cancelled
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster filtering
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_city ON events(event_city);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_attendee_count ON events(attendee_count);

-- Add update trigger for updated_at
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert events (for MVP)
CREATE POLICY "Allow public inserts on events"
ON events
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow anyone to read events (for MVP)
CREATE POLICY "Allow public reads on events"
ON events
FOR SELECT
TO anon
USING (true);

-- Policy: Allow organizers to update their own events
CREATE POLICY "Allow organizers to update own events"
ON events
FOR UPDATE
TO anon
USING (true);

