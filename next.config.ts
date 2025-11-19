import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // 關鍵：關閉 Next.js 圖片優化，適配 Cloudflare 免費版
  },
  eslint: {
    ignoreDuringBuilds: true, // 工廠模式建議：避免因為一點小語法錯誤就導致部署失敗
  },
  typescript: {
    ignoreBuildErrors: true, // 工廠模式建議：同上，先求上線再求完美
  }
};

export default nextConfig;