type ButtonProps = {
    type: "add" | "edit" | "delete";
    size: "large" | "small";
    state?: "default" | "active";
    children: React.ReactNode;
    onClick: () => void;
}

export default function Button({children}:ButtonProps){
    return(
        <button>
            {children}
        </button>
    );
}