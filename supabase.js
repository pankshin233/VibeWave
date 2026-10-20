
const SUPABASE_URL = "https://hlgcmzyfazqctpttcsbi.supabase.co/rest/v1/";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZ2NtenlmYXpxY3RwdHRjc2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzOTk4MzQsImV4cCI6MjEwNzk3NTgzNH0.YfWir19eJ5NBUiGpHNbUEEDOeprzdWq7SNoi1H-aSzs";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
