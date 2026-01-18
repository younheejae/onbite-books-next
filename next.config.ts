import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Next 앱에서 발생하는 모든 데이터 페칭이 자동으로 콘솔에 출력됨
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // 이미지를 가져오려는 도메인을 적어준다 
  // Next가 해당 도메인으로부터 가져오는 이미지는 안전하다고 평가함 
  images: {
    domains: [
      "shopping-phinf.pstatic.net"
    ]
  }
};

export default nextConfig;
