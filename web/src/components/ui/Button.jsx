import { cn } from "../../lib/utils";
const initButtonStyles = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm bg-foreground py-2 px-3 text-secondary font-medium hover:bg-foreground-hover transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;

const Button = ({ className, pending, ...props }) => {
  return (
    <button
      className={cn(initButtonStyles, className)}
      disabled={pending}
      {...props}
    >
      {props.children}
    </button>
  );
};
export default Button;
