CREATE TABLE subscriptions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  plan text NOT NULL,
  meal_types text[] NOT NULL,
  days text[] NOT NULL,
  allergies text,
  total_price float8 NOT NULL
);