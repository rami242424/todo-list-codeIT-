"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PlusIcon from "@/components/PlusIcon";
import { useState, useEffect } from "react";
import { createTodo, getTodos, type Todo, updateTodo } from "@/lib/api";
import Link from "next/link";

/**
 * 할 일 목록 페이지 (/)
 * 진행 중(TO DO)과 완료(DONE) 목록을 구분해 보여주고,
 * 할 일 추가 및 완료 상태 토글 기능을 제공한다.
 */
export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  /** 할 일 추가 (공백만 입력된 경우 무시) */
  const handleAdd = async () => {
    if (!text.trim()) return;
    const newTodo = await createTodo(text.trim());
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  /**
   * 완료 상태 토글
   * 서버 응답으로 받은 최신 데이터로 해당 항목만 교체한다.
   */
  const handleToggle = async (todo: Todo) => {
    const updated = await updateTodo(todo.id, {
      isCompleted: !todo.isCompleted,
    });
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  };

  /** 엔터 키로도 할 일을 추가할 수 있도록 처리 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  // 첫 렌더링 시 전체 목록을 불러온다
  useEffect(() => {
    getTodos().then((data) => setTodos(data));
  }, []);

  // 완료 여부로 목록을 두 갈래로 나눈다
  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      {/* 할 일 입력 영역 */}
      <div className="mb-6 flex gap-4">
        <Input
          value={text}
          onChange={setText}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력해 주세요."
        />

        {/*
          추가 버튼은 화면 폭에 따라 형태가 달라진다.
          데스크탑은 "+ 추가하기", 그 미만은 "+" 아이콘만 노출한다.
        */}
        <div className="hidden md:block">
          <Button
            buttonType="add"
            size="large"
            state={text ? "active" : "default"} // 입력값이 있을 때 활성 색상
            onClick={handleAdd}
          >
            <PlusIcon />
            추가하기
          </Button>
        </div>

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

      {/* 목록 영역: 모바일은 1열, 태블릿 이상은 2열 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 진행 중인 할 일 */}
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
                  {/* 체크 버튼: 완료 상태로 전환 */}
                  <button onClick={() => handleToggle(todo)}>
                    <img src="/incomplete.svg" alt="미완료" className="h-8 w-8" />
                  </button>
                  {/* 항목 이름 클릭 시 상세 페이지로 이동 */}
                  <Link href={`/items/${todo.id}`} className="flex-1">
                    {todo.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 완료된 할 일 */}
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
                  {/* 체크 버튼: 다시 진행 중 상태로 전환 */}
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