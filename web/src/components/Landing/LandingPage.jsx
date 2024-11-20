import Button from "../ui/Button";
import Chip from "../ui/Chip";
import Features from "./components/Features/Features";
import Footer from "./components/Footer";
import Header, { RegisterPopup } from "./components/Header";
import MarketedUsers from "./components/MarketedUsers";

const LandingPage = () => {
  return (
    <main className="bg-[#010101] text-neutral-200 min-h-screen">
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
          <RegisterPopup text="Get Started!" />

        </section>
      </div>

      {/* Features */}
      <div>
        <Chip text="Features" className="flex items-center justify-center" />
        <Features />
      </div>

      {/* Ways to use sonex */}
      <section className="h-screen my-24">
        <Chip
          text="How can I use Sonex?"
          className="flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-center px-48 my-8 space-y-3">
          <p className="italic">Use Sonex as:</p>
          <MarketedUsers />
        </div>
      </section>

      <Footer />
    </main>
  );
};
export default LandingPage;
