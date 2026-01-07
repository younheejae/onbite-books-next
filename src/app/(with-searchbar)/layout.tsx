import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      {/* 클라이언트 측에서만 실행되도록 Suspense라는 내장 컴포넌트로 감싸준다  */}
      {/* 사전 렌더링 과정에서 배제된다  */}
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}