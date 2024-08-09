
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn >
        <div className="flex justify-between mt-5 mx-10">
        <Navbar></Navbar>
        <UserButton />
        </div>
    
      </SignedIn>
    </header>
  );
};

export default App;
