-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Everyone can read testimonials
CREATE POLICY "Testimonials are viewable by everyone" 
  ON testimonials FOR SELECT 
  USING (true);

-- Authenticated users can insert their own testimonials
CREATE POLICY "Users can create their own testimonials" 
  ON testimonials FOR INSERT 
  TO authenticated 
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Users can update their own testimonials
CREATE POLICY "Users can update their own testimonials" 
  ON testimonials FOR UPDATE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Users can delete their own testimonials
CREATE POLICY "Users can delete their own testimonials" 
  ON testimonials FOR DELETE 
  TO authenticated 
  USING (user_id = auth.uid());

-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON testimonials
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
