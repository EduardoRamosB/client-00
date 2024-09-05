import React from "react";
import './App.css';
import '@mantine/core/styles.css';
import {MantineProvider} from "@mantine/core";

const App: React.FC = () => {

  return (
    <MantineProvider defaultColorScheme="dark">

    </MantineProvider>
  )
}

export default App