"use client";

import { deleteTodo, Todo, updateTodo, uploadImage } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoDetail({todo} : {todo: Todo}){
    const router = useRouter();
    const [name, setName] = useState(todo.name);
    const [memo, setMemo] = useState(todo.memo ?? "");
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
    const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? "");

    // 파일선택 핸들러
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        //검증1 : 파일명 영어만
        if(!/^[a-zA-Z0-9._-]+$/.test(file.name)){
            alert("파일 이름은 영어로만 이루어져야 합니다.");
            return;
        }

        //검증2: 5mb 이하 파일만
        if(file.size > 5 * 1024 * 1024){
            alert("파일 크기는 5MB 이하여야 합니다.");
            return;
        }

        //업로드
        const result = await uploadImage(file);
        setImageUrl(result.url);
    }

    // 수정 완료: 서버에 저장하고 목록으로
    const handleUpdate = async () => {
        await updateTodo(todo.id, {name, memo, isCompleted, imageUrl});
        router.push("/");
    }
     // 삭제: 서버에서 지우고 목록으로
    const handleDelete = async () => {
        await deleteTodo(todo.id);
        router.push("/");
    }

    return (
        <div className="mx-auto w-full max-w-4xl p-6">
            {/* 이름 + 완료 토글 */}
            <div className={`mb-6 flex items-center justify-center gap-3 rounded-3xl border-2 border-slate-900 px-4 py-3 ${isCompleted ? "bg-violet-100" : "bg-white"}`}>
            <button onClick={() => setIsCompleted(!isCompleted)}>
                <img
                src={isCompleted ? "/completed.png" : "/incomplete.svg"}
                alt={isCompleted ? "완료" : "미완료"}
                className="h-8 w-8"
                />
            </button>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-center text-lg font-bold underline focus:outline-none"
            />
            </div>

            {/* 이미지 + 메모 (가로 배치) */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
            {/* 이미지 영역 */}
            <div className="relative flex h-[311px] w-full items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 md:w-[384px]">
                {imageUrl ? (
                <img src={imageUrl} alt="첨부 이미지" className="h-full w-full rounded-3xl object-cover" />
                ) : (
                <img src="/img.png" alt="이미지 없음" className="h-16 w-16" />
                )}
                {/* + 버튼 */}
                <label className="absolute bottom-4 right-4 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900 bg-slate-200 text-2xl">
                +
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
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

            {/* 버튼 */}
            <div className="flex justify-end gap-3">
            <button
                onClick={handleUpdate}
                className={`rounded-3xl border-2 border-slate-900 px-6 py-2 font-bold ${isCompleted ? "bg-lime-300" : "bg-slate-200"}`}
            >
                ✓ 수정 완료
            </button>
            <button
                onClick={handleDelete}
                className="rounded-3xl border-2 border-slate-900 bg-rose-500 px-6 py-2 font-bold text-white"
            >
                ✕ 삭제하기
            </button>
            </div>
        </div>
        );
}