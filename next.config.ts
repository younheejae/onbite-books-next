import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Next 앱에서 발생하는 모든 데이터 페칭이 자동으로 콘솔에 출력됨
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
