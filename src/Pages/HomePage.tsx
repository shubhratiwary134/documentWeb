import React, { Suspense } from "react";
import Navbar from "../Components/Navbar";
import SetUser from "../Storage/useStore";
import CircularProgress from '@mui/material/CircularProgress';

const DocumentList = React.lazy(() => import("../Components/DocumentList"));

const HomePage = () => {
  return (
    <div>
      <SetUser />
      <div>
        <Navbar />
      </div>
      <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>}>
        <DocumentList />
      </Suspense>
    </div>
  );
};

export default HomePage;
