type InputProps = {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export default function Input ({value, onChange, placeholder, onKeyDown} : InputProps){
    return(
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            // 피그마보고수정해야함 지금 임의값임
            className="h-[52px] flex-1 rounded-3xl border-2 border-slate-900 px-4"
        />
    );
}