import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { login } from "@/store/slices/userSlice";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import { useState } from "react";

const LoginPopup = ({ onDemoLogin, onLogin }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-neutral-700 hover:bg-neutral-800">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-foreground text-[#c1c1c1]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Login to use Sonex</DialogTitle>
          <DialogDescription>

          </DialogDescription>
          <div className="my-4 space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="credential">Username or Email</label>
              <Input />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="credential">Password</label>
              <Input />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" className={"bg-primary hover:bg-primary/90 text-primary-foreground"} onClick={onDemoLogin}>Login as a Demo User</Button>
          <Button type="submit" onClick={onLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
};

const Header = () => {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = async () => {
    const userCred = {
      credential: "demo@sonexaudio.app",
      password: "password",
    };
    const result = await dispatch(login(userCred));
    if (login.rejected.match(result)) {
      console.log(result);
    }
  };

  const handleLogin = async () => {
    const userCred = {
      credential,
      password,
    };
    const result = await dispatch(login(userCred));
    if (login.rejected.match(result)) {
      console.log(result);
    }
  };

  return (
    <header className="flex justify-between p-4">
      <div className="w-full">
        <p className="text-2xl font-bold text-primary">Sonex</p>
      </div>
      <nav className="flex items-center gap-4">
        <LoginPopup onDemoLogin={handleDemoLogin} />
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
