import { useState, useEffect } from "react";
import "./App.css";
import SampleTable from "./components/SampleTable";
import * as Mui from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FindTrip from "./pages/FindTrip/FindTrip";
import TripDetail from "./pages/TripDetail/TripDetail";
import ChooseSeats from "./pages/ChooseSeats";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import { useAuth } from "./context/AuthContext";
import api from "./services/Api";
import LoginButton from "./components/LoginButton";
import UserBlock from "./components/UserBlock";
import Bookings from "./pages/Bookings";

function App() {
  const { isLoggedIn, login, setCustomer, customer } = useAuth();

  useEffect(() => {
    var jwt = localStorage.getItem("vv-customer-jwt");

    if (!jwt) return;

    onLogin(jwt);
  }, []);

  const onLogin = (jwt: string) => {
    localStorage.setItem("vv-customer-jwt", jwt);

    login();

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
