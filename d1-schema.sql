-- =========================================================================
-- ARWIN RISE - Cloudflare D1 Serverless SQL Database Schema
-- Run via: npx wrangler d1 execute arwin-db --file=d1-schema.sql
-- =========================================================================

-- 1. Dynamic Site Content Table (Key-Value Document Store)
CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Structured Featured Projects & Residences Table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tag TEXT,
    location TEXT,
    price_starting TEXT,
    units TEXT,
    carpet_area TEXT,
    rera_number TEXT,
    image TEXT,
    description TEXT,
    amenities TEXT, -- JSON array
    floor_plans TEXT, -- JSON array
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inbound Client Leads & Enquiries Inbox Table
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    form_type TEXT NOT NULL,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
    notes TEXT,
    project TEXT,
    collection TEXT,
    tier TEXT,
    budget TEXT,
    preferred_date TEXT,
    preferred_time TEXT,
    message TEXT,
    payload TEXT, -- Full JSON payload
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Site Settings & Contact Configurations Table
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    brand_name TEXT DEFAULT 'ARWIN RISE',
    tagline TEXT DEFAULT 'Life Starts Here · Private Property Advisory',
    primary_phone TEXT DEFAULT '+91 84649 54321',
    whatsapp_phone TEXT DEFAULT '918464954321',
    lead_target_email TEXT DEFAULT 'kamalyellapragada@gmail.com',
    office_hyderabad TEXT DEFAULT 'Level 14, Galaxy Towers, Knowledge City, HITEC City, Hyderabad',
    office_dubai TEXT DEFAULT 'Suite 2104, Marina Plaza, Dubai Marina, Dubai, UAE',
    rera_hyderabad TEXT DEFAULT 'P02400008192',
    rera_dubai TEXT DEFAULT 'ORN 29481',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid querying
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
