import '../styles/LandingPage.css'
import { SignInButton } from "@clerk/clerk-react";



const LandingPage = () => {
  return (
    <div className="landing-container min-h-screen flex   ">
      <div >
        <h1 className="text-7xl  mb-4 text-yellow-500">Docweb</h1>
        <p className="text-lg mb-8 text-yellow-300">Welcome to Docweb - Your go-to solution for document management.</p>
        <SignInButton>
        <a
          href="#get-started"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
        >
          Get Started
        </a>
        </SignInButton>
        
      </div>
    </div>
  );
};

export default LandingPage;
