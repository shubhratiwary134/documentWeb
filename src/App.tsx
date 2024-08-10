
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyDocuments from "./Pages/MyDocuments";


import HomePage from "./Pages/HomePage";
import UploadDocuments from "./Pages/UploadDocuments";
const App = () => {
 
  return (
    <Router>
       <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      
      <SignedIn >
        
        
        
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-documents" element={<MyDocuments />} />
            <Route path="/upload-document" element={<UploadDocuments />} />
          </Routes>
     
       
    
      </SignedIn>
    </header>
    </Router>
   
  );
};

export default App;
