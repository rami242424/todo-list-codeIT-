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
            className="h-[56px] flex-1 rounded-full border-2 border-slate-900 bg-white px-6 placeholder:text-slate-400 focus:outline-none"
        />
    );
}