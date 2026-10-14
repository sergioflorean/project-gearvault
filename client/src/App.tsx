import { Box } from "@mui/material";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import About from "./pages/About/About";
import GearDetail from "./pages/GearDetail/GearDetail";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ToneHunter from "./pages/ToneHunter/ToneHunter";
import MyCollection from "./pages/MyCollection/MyCollection";
import Wantlist from "./pages/Wantlist/Wantlist";



const App = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/gear/:id" element={<GearDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tone-hunter" element={<ToneHunter />} />
        <Route path="/my-collection" element={<MyCollection />} />
        <Route path="/wantlist" element={<Wantlist />} />
      </Routes>

      <Footer />
    </Box>
  );
};

export default App;