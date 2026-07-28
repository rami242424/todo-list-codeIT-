"use client";
import { Todo } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoDetail({todo} : {todo: Todo}){
    const router = useRouter();
    const [name, setName] = useState(todo.name);
    const [memo, setMemo] = useState(todo.memo ?? "");
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    // 수정 완료: 서버에 저장하고 목록으로
  
    

    return(
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <p>완료: {isCompleted ? "O" : "X"}</p>
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)}/>
        </div>
    );
}