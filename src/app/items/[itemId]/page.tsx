import { getTodo } from "@/lib/api";
import TodoDetail from "./TodoDetail"

export default async function Page({ params } : {params: Promise<{itemId: string}>}){
    const {itemId} = await params;
    const todo = await getTodo(Number(itemId));

    return <TodoDetail todo={todo}/>    
}