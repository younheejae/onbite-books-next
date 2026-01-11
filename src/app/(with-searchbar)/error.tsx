"use client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

  // 에러 컴포넌트를 클라이언트 컴포넌트로 설정 
// 에러 파일과 같은 경로에 있거나 하위에 경로에 있는 모든 파일에서 에러 발생 시
// 에러 컴포넌트가 페이지 컴포넌트 대신 렌더링된다 (대체 UI 설정)
// 클라이언트 컴포넌트로 설정해야 하는 이유: 서버 측에서 발생하든, 클라이언트에서 발생하든 모두 대응해주기 위함임 


// error props를 통해 현재 발생하는 에러의 정보를 자동으로 가져올 수 있다 
// reset: 에러가 발생한 페이지를 복구하기 위해 다시 컴포넌트들을 렌더링시켜보는 함수
// 이때 서버를 가동한 후 reset 함수를 아무리 실행해도 데이터를 제대로 받아오지 못하는데 그 이유는
// 서버측에서 실행되는 서버 컴포넌트를 다시 실행하지 않기 때문 
// 데이터 페칭을 다시 수행하지 않는다
// 클라이언트 컴포넌트 내부에서 발생한 오류만 수정 가능
// 해결책: 브라우저 강제 새로 고침하기
export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {

    const router = useRouter();

    useEffect(() => {
        console.log(error.message);
    }, [error])
    return (
        <div>
            <h3>오류가 발생했습니다</h3>
            <button onClick={() => reset()}>다시 시도1</button>
            {/* 강제 새로고침 */}
            <button onClick={() => window.location.reload()}>다시 시도2</button>  
            {/* 서버 컴포넌트만 새롭게 렌더링해달라고 요청
            새롭게 런더링된 서버 컴포넌트의 데이터를 새롭게 렌더링하도록 요청 */}
            <button onClick={() => {
                // refresh가 비동기 함수임
                // startTransition: refresh가 끝난 후 reset이 실행되도록 함
                startTransition(() => {
                    router.refresh()  // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 (Next에 다시 요청)
                    reset()  // 에러 상태를 초기화하고 컴포넌트들을 다시 렌더링     
                });
            }}>다시 시도3</button>  
        </div>
    )
}