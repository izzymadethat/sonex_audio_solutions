import Button from "../../ui/Button";

const Header = () => {
  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-inherit">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </nav>
    </header>
  );
};
export default Header;
