import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
