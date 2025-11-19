// src/app/page.tsx
"use client";

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js'; // 引入 User 型別

const Map = dynamic(() => import('../components/Map'), { 
  ssr: false,
  loading: () => <div className="flex h-screen w-full items-center justify-center bg-gray-100 text-gray-500">地圖載入中...</div>
});

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
}

const categoryColors: Record<string, string> = {
  '餐廳': '#FF9800', 'cafe': '#795548', '咖啡廳': '#795548',
  '寵物旅館': '#9C27B0', '寵物友善飯店': '#9C27B0', '寵物醫院': '#F44336',
  '寵物美容': '#E91E63', '狗狗公園': '#4CAF50', '室外空間': '#4CAF50',
  '文創園區': '#607D8B', 'default': '#888888'
};

// 定義下拉選單選項
const CATEGORY_OPTIONS = ['餐廳', '咖啡廳', '狗狗公園', '室外空間', '寵物旅館', '寵物醫院', '寵物美容', '其他'];

export default function Home() {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Auth 狀態
  const [user, setUser] = useState<User | null>(null);
  
  // Modal 狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '餐廳', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. 初始化：抓取資料 & 監聽 Auth
  useEffect(() => {
    fetchPlaces();

    // 取得目前使用者
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // 監聽登入/登出變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchPlaces() {
    try {
      const { data, error } = await supabase.from('pet_places').select('*');
      if (error) throw error;
      const validPlaces = data?.filter(p => p.lat && p.lng) || [];
      setAllPlaces(validPlaces);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // 2. 登入邏輯 (Magic Link)
  async function handleLogin() {
    const email = prompt("請輸入您的 Email 以獲取登入連結:");
    if (!email) return;
    
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert("登入錯誤: " + error.message);
    else alert("✅ 登入連結已寄出！請去信箱收信，點擊連結後回到此頁面。");
  }

  // 3. 登出邏輯
  async function handleLogout() {
    await supabase.auth.signOut();
    alert("已登出");
  }

  // 4. 投稿邏輯
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return alert("請先登入！");
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('pet_places').insert([
        {
          name: formData.name,
          category: formData.category,
          address: formData.address,
          lat: null, // 留空給 n8n 處理
          lng: null, // 留空給 n8n 處理
          user_id: user.id,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      alert("✅ 提交成功！系統正在自動定位中，請稍後重新整理地圖。");
      setIsModalOpen(false);
      setFormData({ name: '', category: '餐廳', address: '' }); // 重置表單
      fetchPlaces(); // 重新抓取 (雖然要等 n8n 跑完才有座標，但先更新列表)
      
    } catch (error: any) {
      alert("提交失敗: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // 計算分類與過濾 (維持原樣)
  const categories = useMemo(() => {
    const cats = new Set(allPlaces.map(p => p.category));
    return Array.from(cats).filter(Boolean);
  }, [allPlaces]);

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'all') return allPlaces;
    return allPlaces.filter(p => p.category === selectedCategory);
  }, [allPlaces, selectedCategory]);

  return (
    <main className="relative h-screen w-full">
      {/* 側邊欄 */}
      <div className="absolute left-0 top-0 z-[1000] h-full w-80 flex flex-col bg-white shadow-xl">
        <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">🐾 寵物友善地圖</h1>
              <p className="text-xs opacity-90">已載入 {allPlaces.length} 個地點</p>
            </div>
            {/* Auth 按鈕區 */}
            <div className="flex flex-col gap-1">
              {!user ? (
                <button onClick={handleLogin} className="text-xs bg-white text-green-600 px-2 py-1 rounded font-bold hover:bg-gray-100">
                  登入
                </button>
              ) : (
                <button onClick={handleLogout} className="text-xs bg-red-500 text-white px-2 py-1 rounded font-bold hover:bg-red-600">
                  登出
                </button>
              )}
            </div>
          </div>
          
          {/* 新增按鈕 (登入後顯示) */}
          {user && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-3 w-full bg-yellow-400 text-yellow-900 text-sm font-bold py-1.5 rounded shadow-sm hover:bg-yellow-300 transition-colors"
            >
              ➕ 新增地點
            </button>
          )}
        </div>

        {/* 分類按鈕 */}
        <div className="p-2 border-b bg-gray-50 overflow-x-auto whitespace-nowrap flex gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedCategory === 'all' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
          >
            全部
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedCategory === cat ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
              style={selectedCategory === cat ? { backgroundColor: categoryColors[cat] || '#888' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 列表區 */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredPlaces.map(place => {
             const color = categoryColors[place.category] || '#888';
             return (
              <div key={place.id} className="rounded-lg border bg-white p-3 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md" style={{ borderLeft: `4px solid ${color}` }}>
                <h3 className="font-bold text-gray-800">{place.name}</h3>
                <span className="text-xs text-white px-2 py-0.5 rounded-full inline-block mt-1" style={{ backgroundColor: color }}>{place.category}</span>
                <p className="text-xs text-gray-500 mt-1 truncate">{place.address}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 地圖 */}
      <Map places={filteredPlaces} />

      {/* 投稿彈窗 (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">📍 新增地點</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">名稱</label>
                <input 
                  required
                  type="text" 
                  className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="例如：路易莎咖啡"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">分類</label>
                <select 
                  className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">地址</label>
                <input 
                  required
                  type="text" 
                  className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="例如：台北市..."
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '提交中...' : '送出 (自動定位)'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}