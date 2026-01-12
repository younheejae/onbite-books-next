import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ bookId }: {bookId: string}) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        {/* hidden: 안보이는 input 태그 생성, readOnly를 함께 붙여준다 */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
            <input required name="author" placeholder="작성자" />
            <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  )
}