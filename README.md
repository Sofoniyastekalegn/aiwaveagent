<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1iDOb1CqoxMxTB3wK0s1-HmS7SodKaWLT

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the project root with your Supabase credentials (required for login):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Get these from [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → **Settings** → **API**.
   The anon key is the "anon" / "public" key (a long JWT starting with `eyJ`).

3. Optional: Add `GEMINI_API_KEY` for live AI calls.

4. Run the app:
   ```
   npm run dev
   ```

### Login shows "Failed to fetch"?

This usually means invalid or missing Supabase credentials:

- Ensure `.env` exists with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- The anon key must be the full JWT from Supabase (starts with `eyJ`, ~200+ chars)
- Restart the dev server after changing `.env`
