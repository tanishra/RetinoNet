import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "../src/components/SignUp/Signup";
import { Signin } from "../src/components/SignIn/Signin";
import { Dashboard } from "../src/components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
