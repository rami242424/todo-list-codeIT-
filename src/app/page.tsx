"use client";
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useState } from "react"

type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
}


export default function Home(){
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = () => {
    if(!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      name: text.trim(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setText("");
  }
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
      )
    );
  }
  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      handleAdd();
    }
  }
  return(
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex gap-2">
        <Input 
          value = {text}
          onChange = {setText}
          
          
          placeholder ="할 일을 입력해 주세요."
        />
        <Button 
          buttonType = "add"
          size = "large"
          state = {text ? "active" : "default"}
          onClick = {handleAdd}
        >
          추가하기
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <h2>TO DO</h2>
          <ul className="flex flex-col gap-2">
            {todoItems.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3 rounded-3xl border-2 border-slate-900 px-4 py-3">
                <button
                  onClick={() => handleToggle(todo.id)}
                >
                  {/* 추후 수정해야함 */}
                  {todo.isCompleted ? "✓" : "○"}
                </button>
                <span>{todo.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>DONE</h2>
          <ul className="flex flex-col gap-2">
            {doneItems.map((todo) => (
              <li key={todo.id} className="flex items-center gap-3 rounded-3xl border-2 border-slate-900 px-4 py-3">
                <button
                  onClick={() => handleToggle(todo.id)}
                >
                  {/* 추후 수정해야함 */}
                  {todo.isCompleted ? "✓" : "○"}
                </button>
                <span>{todo.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}