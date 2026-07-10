-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  capacity NUMERIC NOT NULL,
  budget NUMERIC,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Temporary Dev Policies (to be tightened once Authentication is added)
CREATE POLICY "Allow anon select on leads" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on leads" ON leads FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on leads" ON leads FOR DELETE USING (true);

CREATE POLICY "Allow anon select on quotations" ON quotations FOR SELECT USING (true);
CREATE POLICY "Allow anon insert on quotations" ON quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update on quotations" ON quotations FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete on quotations" ON quotations FOR DELETE USING (true);

-- Seed Initial Mock Leads
INSERT INTO leads (id, customer_name, phone, location, capacity, budget, status, created_at) VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Arjun Bhattacharya', '+91 98765 43210', 'Siliguri, WB', 5, 280000, 'Quoted', now() - interval '2 hours'),
  ('b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e', 'Priya Devi Sarkar', '+91 98765 00002', 'Jalpaiguri, WB', 3, 190000, 'New', now() - interval '4 hours'),
  ('c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Suresh Mahato', '+91 98765 00003', 'Darjeeling, WB', 10, 550000, 'Negotiating', now() - interval '1 day'),
  ('d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Ranjit Kumar Ghosh', '+91 98765 00004', 'Cooch Behar, WB', 7, 380000, 'Won', now() - interval '2 days'),
  ('e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'Mamata Pradhan', '+91 98765 00005', 'Alipurduar, WB', 4, 220000, 'Lost', now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;

-- Seed Initial Mock Quotations linked to leads
INSERT INTO quotations (lead_id, amount, date) VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 410250, '2026-06-12')
ON CONFLICT DO NOTHING;
