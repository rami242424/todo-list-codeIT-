/**
 * 서버 API 통신 모듈
 * 모든 요청은 tenantId 기반의 개인 엔드포인트로 전송된다.
 * tenantId는 환경변수로 관리하여 코드에 노출되지 않도록 한다.
 */

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`;

/** 서버에서 내려오는 할 일 데이터 타입 */
export type Todo = {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
};

/**
 * 할 일 목록 조회
 * pageSize를 100으로 설정해 한 번에 전체 목록을 가져온다.
 */
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/items?page=1&pageSize=100`);
  if (!res.ok) throw new Error("목록 조회에 실패했습니다.");
  return res.json();
}

/** 할 일 생성 (name만 전달하면 나머지 필드는 서버 기본값으로 생성됨) */
export async function createTodo(name: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("목록 생성에 실패했습니다.");
  return res.json();
}

/** 할 일 삭제 */
export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("목록을 지울 수 없습니다.");
}

/**
 * 할 일 수정
 * PATCH를 사용해 전달한 필드만 부분 수정한다.
 * (완료 토글처럼 일부 값만 바꾸는 경우가 많아 PUT 대신 PATCH를 선택)
 */
export async function updateTodo(
  id: number,
  data: {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted?: boolean;
  }
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("목록 수정에 실패했습니다.");
  return res.json();
}

/** 할 일 상세 조회 */
export async function getTodo(id: number): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error("상세페이지 조회에 실패했습니다.");
  return res.json();
}

/**
 * 이미지 업로드
 * FormData로 전송하므로 Content-Type 헤더를 직접 지정하지 않는다.
 * (브라우저가 multipart/form-data 경계값을 자동으로 설정해야 하기 때문)
 */
export async function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("이미지 업로드에 실패했습니다.");

  return res.json();
}