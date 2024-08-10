

import Navbar from "../Components/Navbar"
import DocumentList from "../Components/DocumentList"
import SetUser from "../Storage/useStore"
const HomePage = () => {
  return (
    <div>
      <SetUser></SetUser>
      <div>
      <Navbar></Navbar>
      </div>
       
        <DocumentList></DocumentList>
    </div>
  )
}

export default HomePage