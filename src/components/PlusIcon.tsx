"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PlusIcon from "@/components/PlusIcon";
import { useState, useEffect } from "react";
import { createTodo, getTodos, type Todo, updateTodo } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newTodo = await createTodo(text.trim());
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const handleToggle = async (todo: Todo) => {
    const updated = await updateTodo(todo.id, {
      isCompleted: !todo.isCompleted,
    });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-6 flex gap-4">
        <Input
          value={text}
          onChange={setText}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력해 주세요."
        />

        {/* 데스크탑: + 추가하기 */}
        <div className="hidden md:block">
          <Button
            buttonType="add"
            size="large"
            state={text ? "active" : "default"}
            onClick={handleAdd}
          >
            <PlusIcon />
            추가하기
          </Button>
        </div>

        {/* 모바일: + */}
        <div className="md:hidden">
          <Button
            buttonType="add"
            size="small"
            state={text ? "active" : "default"}
            onClick={handleAdd}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <img src="/todo.png" alt="TO DO" className="mb-3 h-[36px]" />
          {todoItems.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-slate-400">
              <img src="/empty-todo.png" alt="할 일 없음" className="mb-4 h-60 w-60" />
              <p className="text-center">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {todoItems.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 rounded-3xl border-2 border-slate-900 px-4 py-3"
                >
                  <button onClick={() => handleToggle(todo)}>
                    <img src="/incomplete.svg" alt="미완료" className="h-8 w-8" />
                  </button>
                  <Link href={`/items/${todo.id}`} className="flex-1">
                    {todo.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <img src="/done.svg" alt="DONE" className="mb-3 h-[36px]" />
          {doneItems.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-slate-400">
              <img src="/empty-done.png" alt="완료된 일 없음" className="mb-4 h-60 w-60" />
              <p className="text-center">
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {doneItems.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 rounded-3xl border-2 border-slate-900 bg-violet-100 px-4 py-3"
                >
                  <button onClick={() => handleToggle(todo)}>
                    <img src="/completed.png" alt="완료" className="h-8 w-8" />
                  </button>
                  <Link href={`/items/${todo.id}`} className="flex-1 line-through">
                    {todo.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}