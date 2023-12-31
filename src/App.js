import React, { useState, useEffect } from "react";
import axios from 'axios';

import PaperCard from "./PaperCard";
// import SearchIcon from "./search.svg";
import "./App.css";

import { Checkbox, FormControlLabel, 
  AppBar, Toolbar, Tab, Tabs, Typography, createTheme, ThemeProvider} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const API_URL = "http://export.arxiv.org/api/"
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', // Set the primary color to orange
    },
    secondary: {
      main: '#00BFFF', // Set the secondary color to a shade of blue
    },
  },
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [papers, setPapers] = useState([]);
  
  const [tabValue, setTabValue] = useState(0);

  const tabChange = (event, newTab) => {
    setTabValue(newTab);
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    searchArXiv("");
  }, []);

  const searchArXiv = async (search) => {
    
    try {
      const response = await axios.get(`${API_URL}query?search_query=all:${search}&max_results=10`);
      
      const extractedPapers = [];
      const xmlData = response.data;
      const parser = new DOMParser();
      console.log(response)
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      console.log(xmlDoc)
      const entries = xmlDoc.getElementsByTagName("entry");
      console.log(entries.length);
      for (let i = 0; i < entries.length; i++) {
        console.log(i);
        const title = entries[i].getElementsByTagName("title")[0].textContent;
        const authors = Array.from(entries[i].getElementsByTagName("author")).map(author => author.textContent);
        const publishedDate = entries[i].getElementsByTagName("published")[0].textContent;
        const arXivId = entries[i].getElementsByTagName("id")[0].textContent;
        const abstract = entries[i].getElementsByTagName("summary")[0].textContent;

        const paper = {
          title,
          authors,
          publishedDate,
          arXivId,
          abstract,
        };
        extractedPapers.push(paper);
        console.log(paper.title);
      }
      setPapers(extractedPapers);
    } catch (error) {
      console.error('Error fetching data from the arXiv API:', error);
    }
  };

  function CheckboxLabel() {
    const [checked, setChecked] = useState(true)
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e)=> setChecked(e.target.checked)}
            inputProps={{'aria-label': 'secondary'}}></Checkbox>}
        label="Testing Checkbox">
      </FormControlLabel>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" style={{ padding: '16px' }}>
              Copilot.Bio
            </Typography>
            <Tabs
              value={tabValue}
              onChange={tabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth">
              <Tab label="Database" />
              <Tab label="Copilot" />
              <Tab label="News" />
              <Tab label="Network" />
            </Tabs>
          </Toolbar>
        </AppBar>
          <div className="search">
              <Paper className="searchBar" component="form">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for arXiv papers"
                  inputProps={{ 'aria-label': {searchTerm}}}/>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => searchArXiv(searchTerm)}>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <div>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Catagory</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <CheckboxLabel></CheckboxLabel>
              </div>
          </div>
            {papers && papers?.length > 0 ? (
              <div className="container">
                {papers.map((paper, index) => (
                  <PaperCard key={index} paper={paper} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No papers were found</h2>
              </div>
            )} 
      </div>
    </ThemeProvider>
    
  );
};

export default App;
