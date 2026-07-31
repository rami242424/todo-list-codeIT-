/**
 * 공용 입력창 컴포넌트
 * onChange가 이벤트 객체 대신 문자열을 직접 넘겨주도록 하여
 * 사용하는 쪽에서 e.target.value를 매번 꺼내지 않도록 했다.
 */

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function Input({
  value,
  onChange,
  placeholder,
  onKeyDown,
}: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className="h-[52px] flex-1 rounded-3xl border-2 border-slate-900 bg-slate-100 px-6 placeholder:text-slate-400 focus:outline-none shadow-[4px_4px_0_0_#0F172A]"
    />
  );
}