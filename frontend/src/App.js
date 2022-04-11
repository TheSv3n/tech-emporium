import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
