"use client";

import { deleteTodo, Todo, updateTodo, uploadImage } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import CheckIcon from "@/components/CheckIcon";
import XIcon from "@/components/XIcon";

/**
 * 할 일 상세/수정 컴포넌트
 *
 * 서버에서 받은 초기 데이터를 각각의 state 초기값으로 사용하고,
 * 사용자가 편집한 내용은 "수정 완료" 버튼을 눌렀을 때 한 번에 서버로 전송한다.
 * (입력할 때마다 요청을 보내지 않아 불필요한 통신을 줄임)
 */
export default function TodoDetail({ todo }: { todo: Todo }) {
  const router = useRouter();
  const [name, setName] = useState(todo.name);
  const [memo, setMemo] = useState(todo.memo ?? "");
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? "");

  /**
   * 이미지 파일 선택 처리
   * 과제 요구사항에 따라 업로드 전 두 가지를 검증한다.
   */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 검증1: 파일명은 영문/숫자/일부 기호만 허용
    if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
      alert("파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }

    // 검증2: 5MB 이하만 허용
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 업로드 후 반환된 URL을 미리보기에 반영
    const result = await uploadImage(file);
    setImageUrl(result.url);
  };

  /** 수정 완료: 변경 사항을 저장하고 목록 페이지로 이동 */
  const handleUpdate = async () => {
    await updateTodo(todo.id, { name, memo, isCompleted, imageUrl });
    router.push("/");
  };

  /** 삭제: 항목을 제거하고 목록 페이지로 이동 */
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      {/* 이름 입력 + 완료 상태 토글 */}
      <div
        className={`mb-6 flex items-center justify-center rounded-3xl border-2 border-slate-900 px-4 py-3 ${
          isCompleted ? "bg-violet-100" : "bg-white"
        }`}
      >
        {/*
          체크 버튼과 이름을 하나로 묶어 가운데 정렬한다.
          input이 남은 공간을 모두 차지하면 아이콘과 텍스트가 벌어지므로
          내부 컨테이너로 감싸 둘이 붙어 있도록 처리했다.
        */}
        <div className="flex items-center gap-3">
          <button onClick={() => setIsCompleted(!isCompleted)}>
            <img
              src={isCompleted ? "/completed.png" : "/incomplete.svg"}
              alt={isCompleted ? "완료" : "미완료"}
              className="h-8 w-8"
            />
          </button>

          {/*
            입력값 길이에 맞춰 너비가 자동으로 조절되는 input.
            같은 그리드 셀에 겹쳐둔 span이 실제 렌더링된 텍스트 폭을 만들고
            input은 w-full로 그 폭을 따라간다.
            문자 개수로 폭을 계산하면 한글과 영문의 실제 너비 차이를
            반영할 수 없어, 브라우저가 직접 측정하도록 했다.
          */}
          <div className="inline-grid items-center">
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 whitespace-pre text-lg font-bold"
            >
              {name || " "}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-start-1 row-start-1 w-full bg-transparent text-lg font-bold underline focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 이미지 + 메모 (모바일 세로, 태블릿 이상 가로 배치) */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        {/* 이미지 영역 */}
        <div className="relative flex h-[311px] w-full items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 md:w-[384px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="첨부 이미지"
              className="h-full w-full rounded-3xl object-cover"
            />
          ) : (
            <img src="/img.png" alt="이미지 없음" className="h-16 w-16" />
          )}

          {/*
            사진 추가 버튼
            label로 file input을 감싸면 label 클릭이 input 클릭으로 전달되므로
            input은 숨기고 버튼 이미지만 노출한다.
          */}
          <label className="absolute bottom-4 right-4 h-14 w-14 cursor-pointer">
            <img src="/addPhotoBtn.png" alt="사진 추가" className="h-full w-full" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* 메모 영역 */}
        <div
          className="relative flex flex-1 flex-col rounded-3xl bg-amber-100 bg-cover bg-center p-4"
          style={{ backgroundImage: "url('/memo.png')" }}
        >
          <p className="mb-2 text-center font-bold text-amber-800">Memo</p>
          <div className="flex flex-1 items-center justify-center">
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요."
              className="w-full resize-none bg-transparent text-center focus:outline-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="flex justify-end gap-3">
        <Button
          buttonType="edit"
          size="large"
          state={isCompleted ? "active" : "default"} // 완료 상태일 때 활성 색상
          onClick={handleUpdate}
        >
          <CheckIcon />
          수정 완료
        </Button>
        <Button buttonType="delete" size="large" onClick={handleDelete}>
          <XIcon />
          삭제하기
        </Button>
      </div>
    </div>
  );
}