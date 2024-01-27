import { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserBlock from "./components/UserBlock";
import { useAuth } from "./context/AuthContext";
import Bookings from "./pages/Bookings";
import Checkout from "./pages/Checkout";
import FindTrip from "./pages/FindTrip";
import Login from "./pages/Login";
import TripDetail from "./pages/TripDetail";
import api from "./services/Api";
import Warmup from "./components/Warmup";

function App() {
  const warmupInterval = 3000;

  const { setCustomer } = useAuth();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    setTimeout(checkDb, warmupInterval);

    var jwt = localStorage.getItem("vv-customer-jwt");

    if (!jwt) return;

    onLogin(jwt);
  }, []);

  async function checkDb() {
    try {
      var resp = await api.dbReady();

      if (resp.data) {
        setDbReady(true);
      } else {
        setTimeout(checkDb, warmupInterval);
      }
    } catch {
      setTimeout(checkDb, warmupInterval);
    }
  }

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
              <div className="header__logo">
                <Link style={{ display: "flex" }} to="/find-trip">
                  <img src="/images/vvr-logo.svg" />
                </Link>
              </div>
              <div className="header__login-block">
                <UserBlock></UserBlock>
              </div>
            </div>
          </div>
        </div>
        {dbReady ? (
          <Routes>
            <Route path="/" element={<FindTrip />} />
            <Route path="/find-trip" element={<FindTrip />} />
            <Route path="/trip-detail/:tripId" element={<TripDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        ) : (
          <Warmup></Warmup>
        )}
      </div>
    </Router>
  );
}

export default App;
