-- SQL Migration to add subscription status columns
-- Run this in your Supabase SQL Editor

-- Add status column with default value 'active'
ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "status" TEXT DEFAULT 'active';

-- Add pause date columns
ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "pause_start" TIMESTAMP WITH TIME ZONE;

ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "pause_end" TIMESTAMP WITH TIME ZONE;

-- Add cancellation columns
ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "cancelled_at" TIMESTAMP WITH TIME ZONE;

ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "cancellation_reason" TEXT;

-- Add reactivation tracking
ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "reactivated_at" TIMESTAMP WITH TIME ZONE;

-- Add updated_at column with trigger to update it automatically
ALTER TABLE "public"."subscriptions" 
ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Create or replace function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function before each update
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON "public"."subscriptions";
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON "public"."subscriptions"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON "public"."subscriptions" (status);
