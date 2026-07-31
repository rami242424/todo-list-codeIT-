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