import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

async function Footer() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
      { cache: "force-cache" }
    );

    // 서버는 연결됐지만 데이터가 없는 경우 (404, 500 등)
    if (!response.ok) {
      return <footer>제작 @winterlood</footer>;
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return (
      <footer>
        <div>제작 @winterlood</div>
        <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
      </footer>
    );
  } catch (error) {
    // 서버가 꺼져있거나 네트워크 오류가 발생한 경우 여기로 옵니다.
    console.error(error);
    return <footer>제작 @winterlood</footer>;
  }
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
