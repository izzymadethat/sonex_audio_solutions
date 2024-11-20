import Button from "../../ui/Button";

const Header = () => {
  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-primary">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        <Button className="bg-neutral-700 hover:bg-neutral-800">Login</Button>
        <Button
          className={"bg-primary hover:bg-primary/90 text-primary-foreground"}
        >
          Sign Up
        </Button>
      </nav>
    </header>
  );
};
export default Header;
