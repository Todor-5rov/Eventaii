-- Create Venues Table
CREATE TABLE venues (
  venue_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_name VARCHAR(255) NOT NULL,
  venue_capacity INTEGER NOT NULL,
  venue_city VARCHAR(100) NOT NULL,
  venue_address TEXT NOT NULL,
  price_per_event DECIMAL(10, 2) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Catering Table
CREATE TABLE catering (
  catering_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  service_capacity INTEGER NOT NULL,
  service_city VARCHAR(100) NOT NULL,
  price_per_person DECIMAL(10, 2) NOT NULL,
  cuisine_type VARCHAR(100),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Tech/Equipment Table
CREATE TABLE tech_vendors (
  tech_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  equipment_type VARCHAR(100) NOT NULL, -- audio, video, lighting, etc.
  service_city VARCHAR(100) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster filtering
CREATE INDEX idx_venues_city ON venues(venue_city);
CREATE INDEX idx_venues_capacity ON venues(venue_capacity);
CREATE INDEX idx_catering_city ON catering(service_city);
CREATE INDEX idx_catering_capacity ON catering(service_capacity);
CREATE INDEX idx_tech_city ON tech_vendors(service_city);

-- Add update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_catering_updated_at BEFORE UPDATE ON catering
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tech_vendors_updated_at BEFORE UPDATE ON tech_vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

