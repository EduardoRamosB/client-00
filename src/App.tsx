import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {

  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App