const Footer = () => {
  return (
    <footer className="py-6 mt-8 text-white shadow-lg bg-neutral-700 shadow-gray-400">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} Sonex. All Rights Reserved.
        </p>
        <ul className="flex justify-center space-x-6">
          <li>
            <a
              href="/privacy-policy"
              className="text-yellow-400 transition duration-300 hover:text-yellow-500"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms"
              className="text-yellow-400 transition duration-300 hover:text-yellow-500"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/support"
              className="text-yellow-400 transition duration-300 hover:text-yellow-500"
            >
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
