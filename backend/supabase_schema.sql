-- KeywordIQ Supabase Schema
-- Run this in your Supabase SQL Editor to set up the required tables.

-- Keyword Cache Table
CREATE TABLE IF NOT EXISTS keyword_cache (
    id BIGSERIAL PRIMARY KEY,
    normalized_keyword TEXT NOT NULL UNIQUE,
    keyword TEXT NOT NULL,
    interest_over_time JSONB NOT NULL DEFAULT '[]',
    autocomplete JSONB NOT NULL DEFAULT '[]',
    youtube_tags JSONB NOT NULL DEFAULT '[]',
    ai_meta_tags JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Composite index for cache lookups (normalized_keyword, created_at)
CREATE INDEX IF NOT EXISTS idx_keyword_cache_lookup
ON keyword_cache (normalized_keyword, created_at DESC);

-- Index on created_at for admin queries
CREATE INDEX IF NOT EXISTS idx_keyword_cache_created
ON keyword_cache (created_at DESC);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on created_at for contact admin views
CREATE INDEX IF NOT EXISTS idx_contacts_created
ON contacts (created_at DESC);

-- Enable Row Level Security (RLS) - set to permissive for public access (no-login app)
ALTER TABLE keyword_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read/write on keyword_cache (no auth required)
CREATE POLICY "Allow public access" ON keyword_cache
FOR ALL USING (true) WITH CHECK (true);

-- Allow public insert on contacts (no auth required)
CREATE POLICY "Allow public insert" ON contacts
FOR INSERT WITH CHECK (true);

-- Allow public select on contacts (for admin views)
CREATE POLICY "Allow public select" ON contacts
FOR SELECT USING (true);
