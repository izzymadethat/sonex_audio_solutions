import { cn } from "@/lib/utils";

const initStyles = "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const Input = ({ type = "text", className, ...props }) => {
    return (
        <input type={type} className={cn(initStyles, className)} {...props} />
    );
};
export default Input;