// src/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SUPABASE_JWT_SECRET?: string; // Optional if using JWKS
  }
}
