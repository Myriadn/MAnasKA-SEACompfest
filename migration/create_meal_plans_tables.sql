-- Create meal_plans table
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_meal INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create meal_plan_details table for the meal plan details (one-to-many relationship)
CREATE TABLE meal_plan_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS) for meal_plans
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

-- Everyone can read meal plans
CREATE POLICY "Meal plans are viewable by everyone" 
  ON meal_plans FOR SELECT 
  USING (true);

-- Only admins can insert, update, delete meal plans
CREATE POLICY "Admins can create meal plans" 
  ON meal_plans FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update meal plans" 
  ON meal_plans FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete meal plans" 
  ON meal_plans FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Set up RLS for meal_plan_details
ALTER TABLE meal_plan_details ENABLE ROW LEVEL SECURITY;

-- Everyone can read meal plan details
CREATE POLICY "Meal plan details are viewable by everyone" 
  ON meal_plan_details FOR SELECT 
  USING (true);

-- Only admins can insert, update, delete meal plan details
CREATE POLICY "Admins can create meal plan details" 
  ON meal_plan_details FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update meal plan details" 
  ON meal_plan_details FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete meal plan details" 
  ON meal_plan_details FOR DELETE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Create triggers to update the updated_at column
CREATE TRIGGER update_meal_plans_updated_at
BEFORE UPDATE ON meal_plans
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_meal_plan_details_updated_at
BEFORE UPDATE ON meal_plan_details
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert initial meal plan data
INSERT INTO meal_plans (name, description, price_per_meal, image_url) VALUES
('Diet Plan', 'Low calorie meals designed for weight loss', 30000, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
('Protein Plan', 'High protein meals for muscle building', 40000, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'),
('Royal Plan', 'Premium gourmet meals with premium ingredients', 60000, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');

-- Get the IDs of the inserted meal plans
WITH meal_plan_ids AS (
  SELECT id FROM meal_plans WHERE name = 'Diet Plan' LIMIT 1
)
INSERT INTO meal_plan_details (meal_plan_id, detail)
SELECT id, detail FROM meal_plan_ids,
UNNEST(ARRAY[
  '1200-1500 calories per day',
  'Balanced macronutrients',
  'Vegetarian options available',
  'Weekly nutritionist consultation'
]) AS detail;

WITH meal_plan_ids AS (
  SELECT id FROM meal_plans WHERE name = 'Protein Plan' LIMIT 1
)
INSERT INTO meal_plan_details (meal_plan_id, detail)
SELECT id, detail FROM meal_plan_ids,
UNNEST(ARRAY[
  '30g+ protein per meal',
  'Lean meat and plant-based proteins',
  'Customizable protein sources',
  'Post-workout recovery options'
]) AS detail;

WITH meal_plan_ids AS (
  SELECT id FROM meal_plans WHERE name = 'Royal Plan' LIMIT 1
)
INSERT INTO meal_plan_details (meal_plan_id, detail)
SELECT id, detail FROM meal_plan_ids,
UNNEST(ARRAY[
  'Chef-designed meals',
  'Premium ingredients',
  'Gourmet presentation',
  'Specialized dietary options'
]) AS detail;

-- Insert initial testimonial data
INSERT INTO testimonials (name, review, rating) VALUES
('Sarah T.', 'SEA Catering has transformed my eating habits! The meals are delicious and I''ve never felt better.', 5),
('Michael R.', 'The convenience of having healthy meals delivered to my door has been a game-changer for my busy schedule.', 4),
('Lisa M.', 'I love the customization options. Being vegetarian, it''s great to have meals tailored to my preferences.', 5);
