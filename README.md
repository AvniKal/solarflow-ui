# ☀️ SolarFlow UI

SolarFlow UI is a modern, responsive Solar CRM Dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. It features live database storage powered by **Supabase** with a seamless local storage fallback mechanism.

The design is based on the original [Figma SolarFlow UI System](https://www.figma.com/design/JhsRBUOP4MJwn7YV8uWIHx/Design-SolarFlow-UI-System).

---

## 🚀 Key Features

*   📊 **KPI Performance Cards:** Real-time visibility into Total Leads, Quotes Sent, Installations, and Pending Follow-ups with trend indicators.
*   📈 **Interactive Charts:** Analytical visualizations (Monthly Leads Overview and Lead Status Breakdown) powered by `recharts`.
*   📋 **Recent Leads Grid:** High-fidelity tracking table with pagination, locations, capacities, budgets, status badges, and relative timestamps.
*   🔍 **Lead Details Popup:** Seamless in-dashboard view and quick edit dialog for managing lead info.
*   ⚡ **Smart Storage Fallback:** Works fully out-of-the-box using browser `localStorage` if Supabase environment keys are missing.

---

## 🛠️ Tech Stack

*   **Frontend Framework:** React 18 & TypeScript
*   **Build Tool & Dev Server:** Vite
*   **Styling:** Tailwind CSS & Lucide Icons
*   **Charts Library:** Recharts
*   **Backend Database:** Supabase JS client

---

## 🔧 Installation & Local Setup

### 1. Clone & Install Dependencies
First, install all package dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template environment file:
```bash
cp .env.example .env
```
Open `.env` and fill in your Supabase connection parameters:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
> [!NOTE]  
> If these variables are left empty or at their defaults, SolarFlow UI will gracefully fall back to **localStorage**, seeding pre-populated leads data for demo purposes.

### 3. Database Migrations
If you're using Supabase, apply the SQL schema files located in `/supabase/migrations/` to your database instance in this order:
1.  [`20260710171700_init.sql`](file:///Users/avnikalawatia/Downloads/solarflow-ui-master/supabase/migrations/20260710171700_init.sql) — Initializes core tables (`leads`, `quotations`).
2.  [`20260710200900_add_lead_details.sql`](file:///Users/avnikalawatia/Downloads/solarflow-ui-master/supabase/migrations/20260710200900_add_lead_details.sql) — Adds lead-specific info.
3.  [`20260710201800_add_components_details.sql`](file:///Users/avnikalawatia/Downloads/solarflow-ui-master/supabase/migrations/20260710201800_add_components_details.sql) — Adds details for pricing components.

---

## 💻 Running Locally

To launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build & Deployment

To compile production-ready assets:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory, which is ready to be hosted on Vercel, Netlify, Cloudflare Pages, or static storage.