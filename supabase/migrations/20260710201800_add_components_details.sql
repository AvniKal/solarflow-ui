-- Add components_details JSONB column to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS components_details JSONB DEFAULT '[]'::JSONB;
