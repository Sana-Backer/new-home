import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateListing from "./pages/CreateListing";

export default function App() {
  return (
   <div className="text-[#404040] bg-primary">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
         <Route path="/create" element={<CreateListing />} />
      </Routes>
   </div>
  )
}