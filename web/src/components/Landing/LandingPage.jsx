import Button from "../ui/Button";
import Header from "./components/Header";

const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className="h-screen">
        <section className="flex flex-col items-center justify-center h-screen space-y-8">
          <h1 className="max-w-5xl font-bold text-center text-7xl">
            Audio{" "}
            <span className="text-transparent underline bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
              collaboration and communication
            </span>{" "}
            for you and your clients.
          </h1>

          <p className="max-w-2xl text-lg text-center">
            Sonex is a seamless audio collaboration platform where you can
            store, share, and manage audio projects with clients, while handling
            payments and revisions all in one place.
          </p>

          <Button className="text-lg">Get Started!</Button>
        </section>
      </div>
    </div>
  );
};
export default LandingPage;
