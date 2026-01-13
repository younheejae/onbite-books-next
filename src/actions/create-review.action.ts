"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// useActionState를 사용하면 첫번째 인수로는 state를 전달하므로 첫번째 매개변수로 받아오도록 해야한다
export async function createReviewAction (
    _: any, 
    formData: FormData
) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    if(!bookId || !content || !author) {
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력해 주세요",
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: "POST",
        body: JSON.stringify({
            bookId, content, author
        })
        })
        if(!response.ok) {
            throw new Error(response.statusText);
        }

        // next가 자동으로 이 경로에 해당하는 페이지를 재검증한다 => 다시 생성한다 

        // // 1. 특정 주소에 해당하는 페이지만 재검증
        // revalidatePath(`/book/${bookId}`);

        // // 2. 특정 경로의 모든 동적 페이지를 재검증
        // // /book/[id]의 형태를 가지는 모든 동적 페이지를 전부 재검증한다 
        // revalidatePath('/book/[id]', "page");

        // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
        // // 서치바 레이아웃을 갖는 모든 페이지를 재검증
        // revalidatePath('/(with-searchbar)', "layout");

        // // 4. 모든 데이터를 재검증
        // // 루트 레이아웃을 갖는 모든 페이지들을 재검증
        // revalidatePath('/', "layout");

        // 5. 태그 값을 기준으로 데이터 캐시를 재검증
        // 해당 태그 값을 갖는 모든 데이터 캐시가 재검증됨 -> 훨씬 경제적이고 효율적인 방식
        revalidateTag(`review-${bookId}`);

        return {
            status: true,
            error: ""
        }
        
    } catch(err) {
        console.log(err);
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다: ${err}`,
        }
    }
}