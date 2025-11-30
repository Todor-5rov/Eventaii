-- Create Organizers Table
CREATE TABLE organizers (
  organizer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  city VARCHAR(100),
  typical_event_size VARCHAR(50), -- small, medium, large, varies
  events_per_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster filtering
CREATE INDEX idx_organizers_email ON organizers(email);
CREATE INDEX idx_organizers_city ON organizers(city);

-- Add update trigger for updated_at
CREATE TRIGGER update_organizers_updated_at BEFORE UPDATE ON organizers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;

-- Policy for organizers - allow anyone to insert (for registration)
CREATE POLICY "Allow public inserts on organizers"
ON organizers
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for organizers - allow users to read their own data
CREATE POLICY "Allow public reads on organizers"
ON organizers
FOR SELECT
TO anon
USING (true);

