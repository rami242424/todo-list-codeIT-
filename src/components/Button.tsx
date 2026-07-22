type ButtonProps = {
    buttonType: "add" | "edit" | "delete";
    size: "large" | "small";
    state?: "default" | "active";
    children: React.ReactNode;
    onClick?: () => void;
}
const colorVariants = {
    add: {
        default: "bg-slate-200 text-slate-900",
        active: "bg-violet-600 text-white",
    },
    edit: {
        default: "bg-slate-200 text-slate-900",
        active: "bg-lime-300 text-slate-900",
    },
};

const base = "h-[52px] rounded-3xl border-2 border-slate-900 flex items-center justify-center gap-1 text-base font-bold leading-none whitespace-nowrap";

export default function Button({ buttonType, size, state = "default", children, onClick
    }:ButtonProps){

    const colorStyle = buttonType === "delete" 
        ? "bg-rose-500 text-white" 
        : colorVariants[buttonType][state];
    const sizeStyle = size === "large" ? "w-[164px]" : "w-[55px]";
    
    return(
        <button 
            className={`${colorStyle} ${sizeStyle} ${base}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}