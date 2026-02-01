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

### Login shows "Failed to fetch" or "Invalid API key"?

This means missing or wrong Supabase credentials:

- Ensure `.env` exists with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- The anon key must be the full JWT from Supabase (starts with `eyJ`, ~200+ chars)
- Restart the dev server after changing `.env`

---

## Deploy on Vercel

1. Push your code to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).

2. **Add Environment Variables** (required for login to work):
   - Go to your Vercel project → **Settings** → **Environment Variables**
   - Add `VITE_SUPABASE_URL` = your Supabase project URL (e.g. `https://xxxxx.supabase.co`)
   - Add `VITE_SUPABASE_ANON_KEY` = your Supabase **anon** key from [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → **Settings** → **API** → copy the "anon public" key

3. **Redeploy** after adding env vars (Deployments → ⋮ → Redeploy).

**Important:** Use the **anon** key, not the service_role key. The anon key starts with `eyJ` and is ~200 characters.
