-- Add columns for extra lead details to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS site_type TEXT DEFAULT 'residential';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS roof_type TEXT DEFAULT 'RCC Flat';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS payment_mode TEXT DEFAULT 'cash';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS selected_components TEXT[] DEFAULT ARRAY['Tier-1 Panels', 'String Inverter']::TEXT[];
