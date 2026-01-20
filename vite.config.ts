import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Increase the warning limit slightly and split vendor code into smaller chunks
        chunkSizeWarningLimit: 800,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (!id) return;
              if (id.includes('node_modules')) {
                // Put React ecosystem into a small chunk
                if (/node_modules\/(react|react-dom|scheduler|use-sync-external-store)/.test(id)) {
                  return 'vendor-react';
                }
                // Put recharts separately
                if (id.includes('node_modules/recharts')) {
                  return 'vendor-recharts';
                }
                // Put supabase client separately
                if (id.includes('node_modules/@supabase') || id.includes('node_modules/supabase-js')) {
                  return 'vendor-supabase';
                }
                // Put google genai separately
                if (id.includes('node_modules/@google/genai') || id.includes('node_modules/genai')) {
                  return 'vendor-genai';
                }
                // Fallback: group by package folder name to avoid one huge vendor chunk
                const parts = id.split('node_modules/').pop()?.split('/');
                if (parts && parts.length) {
                  const pkg = parts[0].startsWith('@') && parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
                  return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
                }
                return 'vendor';
              }
            }
          }
        }
      }
    };
});
