
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const App = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default App;
