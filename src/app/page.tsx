"use client";

import { useState, useEffect } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import { getTodos, createTodo, updateTodo, type Todo } from "./lib/api";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const doingTodos = todos.filter((t) => !t.isCompleted);
  const doneTodos = todos.filter((t) => t.isCompleted);

  async function handleAdd() {
    if (!text.trim()) return;
    try {
      const newTodo = await createTodo(text.trim());
      setTodos((prev) => [...prev, newTodo]);
      setText("");
    } catch (e) {
      console.error(e);
    }
  }

  async function handleToggle(todo: Todo) {
    try {
      const updated = await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <a href="/" className="text-xl font-bold text-violet-600">do it;</a>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-8 flex gap-2">
          <Input value={text} onChange={setText} placeholder="할 일을 입력해주세요" />
          <Button variant="primary" onClick={handleAdd}>추가하기</Button>
        </div>

        {loading ? (
          <p className="text-center text-slate-400">불러오는 중...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-500">TO DO</h2>
              <ul className="flex flex-col gap-2">
                {doingTodos.map((todo) => (
                  <li key={todo.id} className="flex items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-3">
                    <IconButton checked={false} onClick={() => handleToggle(todo)} />
                    <a href={`/items/${todo.id}`} className="flex-1 text-slate-900 hover:underline">{todo.name}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold text-slate-500">DONE</h2>
              <ul className="flex flex-col gap-2">
                {doneTodos.map((todo) => (
                  <li key={todo.id} className="flex items-center gap-3 rounded-full border border-violet-200 bg-violet-50 px-4 py-3">
                    <IconButton checked={true} onClick={() => handleToggle(todo)} />
                    <a href={`/items/${todo.id}`} className="flex-1 text-slate-500 line-through hover:no-underline">{todo.name}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}