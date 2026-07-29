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
        if(file.size > 5 * 1025 * 1024){
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

    return(
        <div className="mx-auto max-w-3xl p-6">
             {/* 이름 + 완료 토글 */}
            <div className="mb-6 flex items-center gap-3 rounded-3xl border-2 border-slate-900 px-4 py-3">
                <button onClick={() => setIsCompleted(!isCompleted)}>
                    {isCompleted ? "✓" : "○"}
                </button>
                <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 text-center"/>
            </div>

            {/* 이미지 */}
            <div className="mb-6">
                {imageUrl && (
                    <img src={imageUrl} alt="첨부 이미지" className="mb-2 h-40 rounded-2xl object-cover" />
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>

            {/* 메모 */}
            <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요."
                className="mb-6 h-40 w-full rounded-3xl border-2 border-slate-900 p-4"
            />

            {/* 버튼 */}
            <div className="flex gap-3">
                <button
                    className="rounded-3xl border-2 border-slate-900 bg-lime-300 px-4 py-2"
                    onClick={handleUpdate}
                >
                    수정 완료
                </button>
                <button
                    className="rounded-3xl border-2 border-slate-900 bg-lime-300 px-4 py-2"
                    onClick={handleDelete}
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
}