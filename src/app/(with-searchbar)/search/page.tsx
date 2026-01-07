import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// export const dynamic = "force-static";
// "force-static"
// 동적함수 사용여부, 데이터 페칭 방식 상관없이 강제적으로 Static 적용
// 이때 쿼리 스트링과 같은 동적 함수는 모두 undefined를 반환하도록 설정됨
// 데이터 페칭도 만약 no-store로 설정되어 있더라도 강제로 데이터가 캐싱되도록 변경
// -> 이때 아무런 검색 결과가 나타나지 않음: 동적함수 결과가 비어있어서 현재 검색어를 가져올 수 없음 (부작용 발생)

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {cache: "force-cache"}
  );
  if(!response.ok) {
    return <div>오류가 발생했습니다 ...</div>
  }
  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
