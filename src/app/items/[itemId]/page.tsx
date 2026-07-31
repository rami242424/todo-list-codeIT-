import { getTodo } from "@/lib/api";
import TodoDetail from "./TodoDetail";

/**
 * 할 일 상세 페이지 (/items/{itemId})
 * 서버 컴포넌트에서 데이터를 미리 조회한 뒤,
 * 편집 기능을 담당하는 클라이언트 컴포넌트(TodoDetail)에 전달한다.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  // Next.js 15+ 에서 params는 Promise이므로 await이 필요하다
  const { itemId } = await params;
  const todo = await getTodo(Number(itemId));

  return <TodoDetail todo={todo} />;
}