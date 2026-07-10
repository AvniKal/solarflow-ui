import { supabase } from "./supabaseClient";

// Check if valid credentials are set up (ignoring placeholders)
export const isSupabaseConfigured = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_URL !== "https://placeholder-project.supabase.co" &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== "placeholder-anon-key"
);

// Initial local seed data
const initialLeads = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    customer_name: "Arjun Bhattacharya",
    phone: "+91 98765 43210",
    location: "Siliguri, WB",
    capacity: 5,
    budget: 280000,
    status: "Quoted",
    site_type: "Residential",
    roof_type: "RCC Flat",
    payment_mode: "Cash",
    selected_components: ["Tier-1 Panels", "String Inverter", "Mounting Structure", "AC/DC Cables", "Net Meter", "Installation & Civil"],
    components_details: [
      { "name": "Tier-1 Panels", "qty": 16, "price": 22500 },
      { "name": "String Inverter", "qty": 1, "price": 38000 },
      { "name": "Net Meter", "qty": 1, "price": 5500 }
    ],
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "b2c3d4e5-f67a-8b9c-0d1e-2f3a4b5c6d7e",
    customer_name: "Priya Devi Sarkar",
    phone: "+91 98765 00002",
    location: "Jalpaiguri, WB",
    capacity: 3,
    budget: 190000,
    status: "New",
    site_type: "Residential",
    roof_type: "RCC Flat",
    payment_mode: "Cash",
    selected_components: ["Tier-1 Panels", "String Inverter"],
    components_details: [
      { "name": "Tier-1 Panels", "qty": 10, "price": 22500 },
      { "name": "String Inverter", "qty": 1, "price": 38000 }
    ],
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
  {
    id: "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    customer_name: "Suresh Mahato",
    phone: "+91 98765 00003",
    location: "Darjeeling, WB",
    capacity: 10,
    budget: 550000,
    status: "Negotiating",
    site_type: "Commercial",
    roof_type: "Metal Truss",
    payment_mode: "Financed",
    selected_components: ["Bifacial Panels", "Hybrid Inverter", "Battery Storage"],
    components_details: [
      { "name": "Bifacial Panels", "qty": 30, "price": 24000 },
      { "name": "Hybrid Inverter", "qty": 1, "price": 65000 },
      { "name": "Battery Storage", "qty": 1, "price": 120000 }
    ],
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "d4e5f67a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    customer_name: "Ranjit Kumar Ghosh",
    phone: "+91 98765 00004",
    location: "Cooch Behar, WB",
    capacity: 7,
    budget: 380000,
    status: "Won",
    site_type: "Residential",
    roof_type: "RCC Flat",
    payment_mode: "Cash",
    selected_components: ["Tier-1 Panels", "String Inverter"],
    components_details: [
      { "name": "Tier-1 Panels", "qty": 22, "price": 22500 },
      { "name": "String Inverter", "qty": 1, "price": 38000 }
    ],
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
  {
    id: "e5f67a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    customer_name: "Mamata Pradhan",
    phone: "+91 98765 00005",
    location: "Alipurduar, WB",
    capacity: 4,
    budget: 220000,
    status: "Lost",
    site_type: "Residential",
    roof_type: "RCC Flat",
    payment_mode: "Cash",
    selected_components: ["Tier-1 Panels", "String Inverter"],
    components_details: [
      { "name": "Tier-1 Panels", "qty": 12, "price": 22500 },
      { "name": "String Inverter", "qty": 1, "price": 38000 }
    ],
    created_at: new Date(Date.now() - 72 * 3600000).toISOString(),
  },
];

const initialQuotations = [
  {
    id: "q1",
    lead_id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    amount: 410250,
    date: "2026-06-12",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
];

// Helper to initialize local storage database
function getLocalDB() {
  if (!localStorage.getItem("sf_leads")) {
    localStorage.setItem("sf_leads", JSON.stringify(initialLeads));
  }
  if (!localStorage.getItem("sf_quotes")) {
    localStorage.setItem("sf_quotes", JSON.stringify(initialQuotations));
  }
  return {
    leads: JSON.parse(localStorage.getItem("sf_leads") || "[]"),
    quotes: JSON.parse(localStorage.getItem("sf_quotes") || "[]"),
  };
}

function saveLocalDB(data: { leads: any[]; quotes: any[] }) {
  localStorage.setItem("sf_leads", JSON.stringify(data.leads));
  localStorage.setItem("sf_quotes", JSON.stringify(data.quotes));
}

// Data Access API
export const db = {
  // Leads API
  async getLeads(search = "", page = 1, pageSize = 5) {
    if (isSupabaseConfigured) {
      let query = supabase.from("leads").select("*", { count: "exact" });
      if (search.trim()) {
        const pattern = `%${search.trim()}%`;
        query = query.or(`customer_name.ilike.${pattern},phone.ilike.${pattern},location.ilike.${pattern}`);
      }
      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      return { data: data || [], count: count || 0 };
    } else {
      // LocalStorage fallback
      const db = getLocalDB();
      let filtered = [...db.leads];

      if (search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.customer_name?.toLowerCase().includes(q) ||
            l.phone?.toLowerCase().includes(q) ||
            l.location?.toLowerCase().includes(q)
        );
      }

      // Order by created_at desc
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
      return { data: paginated, count: filtered.length };
    }
  },

  async getRecentLeads(limit = 5) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    } else {
      const db = getLocalDB();
      const sorted = [...db.leads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return sorted.slice(0, limit);
    }
  },

  async getLead(id: string) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    } else {
      const db = getLocalDB();
      const lead = db.leads.find((l) => l.id === id);
      if (!lead) throw new Error("Lead not found locally.");
      return lead;
    }
  },

  async saveLead(leadData: any, id?: string) {
    if (isSupabaseConfigured) {
      if (id) {
        const { error } = await supabase
          .from("leads")
          .update(leadData)
          .eq("id", id);
        if (error) throw error;
        return { id };
      } else {
        const { data, error } = await supabase
          .from("leads")
          .insert([leadData])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    } else {
      const db = getLocalDB();
      if (id) {
        // Update
        const idx = db.leads.findIndex((l) => l.id === id);
        if (idx === -1) throw new Error("Lead not found locally to update.");
        db.leads[idx] = {
          ...db.leads[idx],
          ...leadData,
        };
        saveLocalDB(db);
        return { id };
      } else {
        // Insert
        const newLead = {
          id: Math.random().toString(36).substring(2, 11),
          created_at: new Date().toISOString(),
          ...leadData,
        };
        db.leads.push(newLead);
        saveLocalDB(db);
        return newLead;
      }
    }
  },

  // Quotations API
  async getQuotationForLead(leadId: string) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("quotations")
        .select("*")
        .eq("lead_id", leadId)
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const db = getLocalDB();
      const quote = db.quotes.find((q) => q.lead_id === leadId);
      return quote || null;
    }
  },

  async getLatestQuotation() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("quotations")
        .select("*, leads(*)")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    } else {
      const db = getLocalDB();
      if (db.quotes.length === 0) return null;
      const sorted = [...db.quotes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const latest = sorted[0];
      const lead = db.leads.find((l) => l.id === latest.lead_id);
      return {
        ...latest,
        leads: lead || null,
      };
    }
  },

  async saveQuotation(quoteData: any) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("quotations")
        .upsert(quoteData, { onConflict: "lead_id" })
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const db = getLocalDB();
      const idx = db.quotes.findIndex((q) => q.lead_id === quoteData.lead_id);
      if (idx !== -1) {
        // Update
        db.quotes[idx] = {
          ...db.quotes[idx],
          ...quoteData,
        };
        saveLocalDB(db);
        return db.quotes[idx];
      } else {
        // Insert
        const newQuote = {
          id: Math.random().toString(36).substring(2, 11),
          created_at: new Date().toISOString(),
          ...quoteData,
        };
        db.quotes.push(newQuote);
        saveLocalDB(db);
        return newQuote;
      }
    }
  },

  async updateQuotationAmount(id: string, amount: number, dateStr: string) {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("quotations")
        .update({ amount, date: dateStr })
        .eq("id", id);
      if (error) throw error;
    } else {
      const db = getLocalDB();
      const idx = db.quotes.findIndex((q) => q.id === id || q.lead_id === id);
      if (idx === -1) throw new Error("Quotation not found locally.");
      db.quotes[idx] = {
        ...db.quotes[idx],
        amount,
        date: dateStr,
      };
      saveLocalDB(db);
    }
  },
};
