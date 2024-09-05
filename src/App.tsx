import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";

const App: React.FC = () => {

  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users/sign_up" element={<SignUp />} />
          <Route path="users/sign_in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App