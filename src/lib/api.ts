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
  const res = await fetch(`${BASE_URL}/items?page=1&pageSize=100`);
  if(!res.ok) throw new Error("목록 조회에 실패했습니다.");
  return res.json();
}

/** 할 일 생성 */
export async function createTodo(name:string) : Promise<Todo>{
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify({ name }),
  });
  if(!res.ok) throw new Error("목록 생성에 실패했습니다.");
  return res.json();
}

/** 할 일 삭제 */
export async function deleteTodo(id:number) : Promise<void>{
  const res = await fetch(`${BASE_URL}/items/${id}`,{
    method: "DELETE"
  });
  if(!res.ok) throw new Error("목록을 지울 수 없습니다")
}

/** 할 일 수정 */
export async function updateTodo(
    id:number,
    data: {
      name?: string;
      memo?: string;
      imageUrl?: string;
      isCompleted?: boolean;
    }
  ) : Promise<Todo>{

  const res = await fetch(`${BASE_URL}/items/${id}`,{
    method: "PATCH",
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(data),
  });
  if(!res.ok) throw new Error("목록 수정에 실패했습니다.");
  return res.json();
}

/** 상세페이지 조회 */
export async function getTodo(id: number): Promise<Todo>{
  const res = await fetch(`${BASE_URL}/items/${id}`)
  if(!res.ok) throw new Error("상세페이지 조회에 실패했습니다.")
  return res.json();
}

/** 이미지 업로드 */ 
export async function uploadImage(file: File): Promise<{url: string}>{
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if(!res.ok) throw new Error("이미지 업로드에 실패했습니다.");

  return res.json();
}