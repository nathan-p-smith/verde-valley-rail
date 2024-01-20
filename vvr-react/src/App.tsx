import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UserBlock from "./components/UserBlock";
import { useAuth } from "./context/AuthContext";
import Bookings from "./pages/Bookings";
import Checkout from "./pages/Checkout";
import ChooseSeats from "./pages/ChooseSeats";
import FindTrip from "./pages/FindTrip/FindTrip";
import Login from "./pages/Login";
import TripDetail from "./pages/TripDetail/TripDetail";
import api from "./services/Api";

function App() {
  const { setCustomer } = useAuth();

  useEffect(() => {
    var jwt = localStorage.getItem("vv-customer-jwt");

    if (!jwt) return;

    onLogin(jwt);
  }, []);

  const onLogin = (jwt: string) => {
    localStorage.setItem("vv-customer-jwt", jwt);

    api.getCustomer().then((resp) => {
      setCustomer(resp.data);
    });
  };

  return (
    <Router>
      <div className="layout">
        <div className="header">
          <div className="header__top-bar">
            <div className="container">
              <div className="header__logo">LOGO</div>
              <div className="header__login-block">
                <UserBlock></UserBlock>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Routes>
            <Route path="/find-trip" element={<FindTrip />} />
            <Route path="/trip-detail/:tripId" element={<TripDetail />} />
            <Route path="/choose-seats" element={<ChooseSeats />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
