type ButtonProps = {
    variant: "primary" | "danger" | "success" | "default";
    children: React.ReactNode;
    onClick?: () => void;
};

const variantStyles = {
    primary: "bg-violet-600 text-white",
    danger: "bg-rose-500 text-white",
    success: "bg-lime-300 text-slate-900",
    default: "bg-white text-slate-900 border border-slate-300",
};

export default function Button({ variant, children, onClick } : ButtonProps){
    return(
        <button 
            onClick={onClick}
            className={`${variantStyles[variant]} whitespace-nowrap rounded-full px-4 py-2`}
        >
            {children}
        </button>
    );
}