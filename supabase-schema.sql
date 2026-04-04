-- grain & tone — Supabase Schema
-- Run this in your Supabase project: SQL Editor → New query → paste → Run

-- 1. Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name                  TEXT NOT NULL DEFAULT '',
  film_simulation       TEXT NOT NULL DEFAULT '',
  dynamic_range         TEXT NOT NULL DEFAULT 'Auto',
  grain_effect          TEXT NOT NULL DEFAULT 'Off',
  color_chrome_effect   TEXT NOT NULL DEFAULT 'Off',
  color_chrome_effect_blue TEXT NOT NULL DEFAULT 'Off',
  white_balance         TEXT NOT NULL DEFAULT 'Auto (AWB)',
  white_balance_k       INTEGER,
  wb_red_shift          INTEGER NOT NULL DEFAULT 0,
  wb_blue_shift         INTEGER NOT NULL DEFAULT 0,
  highlight             INTEGER NOT NULL DEFAULT 0,
  shadow                INTEGER NOT NULL DEFAULT 0,
  color                 INTEGER NOT NULL DEFAULT 0,
  sharpness             INTEGER NOT NULL DEFAULT 0,
  noise_reduction       INTEGER NOT NULL DEFAULT 0,
  clarity               INTEGER NOT NULL DEFAULT 0,
  iso                   TEXT NOT NULL DEFAULT '',
  exposure_compensation TEXT NOT NULL DEFAULT '',
  camera_body           TEXT NOT NULL DEFAULT '',
  is_favorite           BOOLEAN NOT NULL DEFAULT FALSE,
  notes                 TEXT NOT NULL DEFAULT '',
  created_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at            TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Row Level Security — users can only see and edit their own recipes
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own recipes"
  ON recipes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Auto-update updated_at on every update
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. Index for fast user queries
CREATE INDEX IF NOT EXISTS recipes_user_id_created_at
  ON recipes (user_id, created_at DESC);

-- 5. Enable Realtime (for live updates in the app)
ALTER PUBLICATION supabase_realtime ADD TABLE recipes;
