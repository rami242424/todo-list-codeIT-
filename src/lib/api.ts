// API 기본 설정
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

// 서버에서 내려오는 할 일 데이터 타입
export type Todo = {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
};

/** 할 일 목록 조회 */
export async function getTodos() : Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/items`);
  if(!res.ok) throw new Error("목록 조회에 실패했습니다.");
  return res.json();
}
/** 할 일 생성 */
export async function createTodo(name: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("할 일 생성에 실패했습니다.");
  return res.json();
}

/** 할 일 수정 (이름, 메모, 이미지, 완료 상태) */
export async function updateTodo(
  id: number,
  data: { name?: string; memo?: string; imageUrl?: string; isCompleted?: boolean }
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("할 일 수정에 실패했습니다.");
  return res.json();
}