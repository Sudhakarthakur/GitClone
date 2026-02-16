import React from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

//Auth Context
import { useAuth } from "./authContex";
import { useEffect } from "react";

const Routese = () => {
  //       const { currentUser } = useAuth();
  //   const navigate = useNavigate();
  //   const location = useLocation();

  //   useEffect(() => {
  //     // ⛔ wait until auth state is resolved
  //     if (currentUser === undefined) return;

  //     const publicRoutes = ["/auth", "/signup"];

  //     // 🔐 block private routes
  //     if (!currentUser && !publicRoutes.includes(location.pathname)) {
  //       navigate("/auth", { replace: true });
  //     }

  //      // 🚫 block auth page for logged-in users
  //     if (currentUser && location.pathname === "/auth") {
  //       navigate("/", { replace: true });
  //     }
  //   }, [currentUser, location.pathname, navigate]);

  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdfromStorage = localStorage.getItem("userId");

    if (userIdfromStorage && !currentUser) {
      setCurrentUser(userIdfromStorage);
    }

    if (
      !userIdfromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdfromStorage && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [navigate, currentUser, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return element;
};

export default Routese;
