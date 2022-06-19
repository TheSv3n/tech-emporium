import "./css/App.css";
import "./css/Loader.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import BasketScreen from "./screens/BasketScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/admin/" element={<AdminScreen />} />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/profile/" element={<ProfileScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/placeorder/" element={<PlaceOrderScreen />} />
            <Route path="/delivery/" element={<DeliveryScreen />} />
            <Route path="/login/" element={<LoginScreen />} />
            <Route path="/register/" element={<RegisterScreen />} />
            <Route path="/basket/" element={<BasketScreen />} />
            <Route path="/basket/:id" element={<BasketScreen />} />
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
