-- Fix scroll_sensitivity column to allow larger values
ALTER TABLE hero_carousel_settings 
ALTER COLUMN scroll_sensitivity TYPE numeric(5,2);