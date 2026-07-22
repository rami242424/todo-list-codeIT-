type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function Input({ value, onChange, placeholder }: InputProps){
    return(
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
    );
}