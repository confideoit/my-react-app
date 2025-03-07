import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register1 from "./Pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Register1 />} exact/>
        <Route path="/login" element={<Login />} exact/>
      </Routes>
    </Router>
  );
}

export default App;
