import { getTodo } from "@/lib/api";
import Link from "next/link";

export default async function Page({ params } : {params: Promise<{itemId: string}>}){
    const {itemId} = await params;
    const todo = await getTodo(Number(itemId));

    return(
        <div>
            <Link href={`/items/${todo.id}`} className="flex-1">
                {todo.name}
            </Link>
            <p>완료 여부: {todo.isCompleted ? "완료" : "진행 중"}</p>
            <p>메모: {todo.memo ?? "없음"}</p>
        </div>
    )
}