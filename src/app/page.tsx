import Button from "./components/Button"; 

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100">
      <Button variant="primary">추가하기</Button>
      <Button variant="danger">삭제하기</Button>
      <Button variant="success">수정 완료</Button>
      <Button variant="default">기본</Button>
    </div>
  );
}