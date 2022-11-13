import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import OwnershipCertificate from "./components/OwnershipCertificate";
import SingleCertificate from "./components/SingleCertificate";
// import CreationPage from "./components/CreationPage";
import CurrentNft from "./components/CurrentNft";
import PreviousNft from "./components/PreviousNft";
import CreationCertificate from "./components/CreationCertificate";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          {/* <Route path="navbar" element={<Navbar/>}></Route> */}
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/currentnft" element={<CurrentNft />}></Route>
          <Route
            path="/ownershipcertificate"
            element={<OwnershipCertificate />}
          ></Route>
          <Route path="/previousnft" element={<PreviousNft />}></Route>
          <Route
            path="/singlecertificate"
            element={<SingleCertificate />}
          ></Route>
          <Route
            path="/createcertificate"
            element={<CreationCertificate />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
