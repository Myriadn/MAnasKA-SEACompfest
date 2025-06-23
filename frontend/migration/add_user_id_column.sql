-- SEA Catering - Subscription Table Migration
-- Run this script in your Supabase SQL Editor to fix the subscription system

-- Add user_id column to subscriptions table (if it doesn't exist)
-- This links subscriptions to authenticated users via their UUID
ALTER TABLE "public"."subscriptions"
ADD COLUMN IF NOT EXISTS "user_id" UUID REFERENCES auth.users(id);

-- Create an index on user_id for better query performance
-- This improves the speed of queries that filter by user_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON "public"."subscriptions" ("user_id");
