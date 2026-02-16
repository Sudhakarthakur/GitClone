import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <h1>hello</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
        distinctio illum maiores est aliquam molestias adipisci id. Nostrum est
        recusandae ex minus dolore totam dolorem dolorum! Quia adipisci nemo
        dolorem!
      </p>
      <Signup></Signup>
      <Dashboard />
    </>
  );
}

export default App;
