import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/layouts/NavBar";
import SuccessModal from "./components/SuccessModal";

function App() {
  return (
    <div>
      <NavBar />
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 py-6 mb-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <SuccessModal />
    </div>
  );
}

export default App;
