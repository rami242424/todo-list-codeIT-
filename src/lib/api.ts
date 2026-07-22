const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? "default-tenant";
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

export type Todo = {
  id: number;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
};

// 목록 조회
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error("목록 조회 실패");
  return res.json();
}

// 상세 조회
export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error("상세 조회 실패");
  return res.json();
}

// 생성
export async function createTodo(name: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("생성 실패");
  return res.json();
}

// 수정
export async function updateTodo(
  id: number,
  data: Partial<Pick<Todo, "name" | "memo" | "imageUrl" | "isCompleted">>
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("수정 실패");
  return res.json();
}

// 삭제
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("삭제 실패");
}

// 이미지 업로드
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("이미지 업로드 실패");
  const data = await res.json();
  return data.url;
}