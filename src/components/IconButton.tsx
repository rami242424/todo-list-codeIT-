type IconBtnProps = {
    variant?: "default" | "primary";
    checked?: boolean;
    onClick?: () => void;
}

export default function IconButton({
    variant = "default",
    checked = false,
    onClick,
} : IconBtnProps){
    const style = checked
        ? "bg-violet-600 text-white"
        : "bg-white border border-slate-300 text-slate-500";
    return (
        <button
            onClick={onClick}
            className={`flex h-6 w-6 items-center justify-center rounded-full ${style}`}
            arial-label = {checked ? "완료 취소" : "완료 처리"}
        >
            {checked ? "✓": "" }
        </button>
    )
}