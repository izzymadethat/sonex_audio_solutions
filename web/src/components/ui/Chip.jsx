import { cn } from "../../lib/utils";

const initChipStyle = `flex max-w-5xl mx-auto transition-transform duration-300 cursor-default lg:text-center hover:scale-105`;

const Chip = ({ className, text, ...props }) => {
  return (
    <div className={cn(initChipStyle, className)} {...props}>
      <h2 className="px-3 mb-4 text-base font-semibold leading-7 uppercase rounded-lg text-foreground bg-primary lg:mb-8">
        {text}
      </h2>
    </div>
  );
};

export default Chip;
