-- Enable Row Level Security (RLS) on all vendor tables
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE catering ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_vendors ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for vendor registration)
-- WARNING: These are permissive policies for MVP. Add proper authentication later!

-- Policy for venues - allow anyone to insert
CREATE POLICY "Allow public inserts on venues"
ON venues
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for venues - allow anyone to read
CREATE POLICY "Allow public reads on venues"
ON venues
FOR SELECT
TO anon
USING (true);

-- Policy for catering - allow anyone to insert
CREATE POLICY "Allow public inserts on catering"
ON catering
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for catering - allow anyone to read
CREATE POLICY "Allow public reads on catering"
ON catering
FOR SELECT
TO anon
USING (true);

-- Policy for tech_vendors - allow anyone to insert
CREATE POLICY "Allow public inserts on tech_vendors"
ON tech_vendors
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for tech_vendors - allow anyone to read
CREATE POLICY "Allow public reads on tech_vendors"
ON tech_vendors
FOR SELECT
TO anon
USING (true);

