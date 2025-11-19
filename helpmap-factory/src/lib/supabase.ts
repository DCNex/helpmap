// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 使用環境變數 (process.env)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 防呆檢查：如果沒設定環境變數，就在 Console 報錯
if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️ Supabase 環境變數未設定！請檢查 .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);