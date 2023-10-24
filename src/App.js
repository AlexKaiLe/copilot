import React, {useState} from "react";
import {createTheme, ThemeProvider} from '@mui/material';

import SearchBar from "./SearchBar";
import NavBar from "./NavBar"
import DisplayPapers from "./DisplayPapers";
import "./App.css";


const ARXIV_URL = "http://export.arxiv.org/api/"

const theme = createTheme({
  palette: {
    primary: {main: '#FFA500',},
    secondary: {main: '#00BFFF',},
  },
});

const App = () => {
  const [papers, setPapers] = useState([]);

  return(
    <ThemeProvider theme={theme}>
      <NavBar/>
      <SearchBar ARXIV_URL={ARXIV_URL} setPapers={setPapers}/>
      <DisplayPapers papers={papers}/>
    </ThemeProvider>
  )
}
export default App;