-- Fix RLS policies for organizers table
-- Run this if you already created the organizers table without RLS policies

-- Enable Row Level Security (if not already enabled)
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts on organizers" ON organizers;
DROP POLICY IF EXISTS "Allow public reads on organizers" ON organizers;

-- Policy for organizers - allow anyone to insert (for registration)
CREATE POLICY "Allow public inserts on organizers"
ON organizers
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for organizers - allow users to read data (for sign-in lookup)
CREATE POLICY "Allow public reads on organizers"
ON organizers
FOR SELECT
TO anon
USING (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'organizers';

