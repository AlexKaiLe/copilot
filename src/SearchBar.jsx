import React, {useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

import { Checkbox, FormControlLabel} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SearchBar = ({ARXIV_URL, setPapers}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    searchArXiv("");
  }, []);

  const searchArXiv = async (search) => {
    try {
      const response = await axios.get(`${ARXIV_URL}query?search_query=all:${search}&max_results=50`);
      
      const extractedPapers = [];
      const xmlData = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const entries = xmlDoc.getElementsByTagName("entry");
      for (let i = 0; i < entries.length; i++) {
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

  function CheckboxLabel({label}) {
    const [checked, setChecked] = useState(true)
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e)=> setChecked(e.target.checked)}
            inputProps={{'aria-label': 'secondary'}}></Checkbox>}
        label={label}>
      </FormControlLabel>
    )
  }

  return (
      <div className="app">
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
              </div>
          </div>
          <div>
          <CheckboxLabel label={"Papers"}/>
          <CheckboxLabel label={"Datasets"}/>
          <CheckboxLabel label={"Algorithms"}/>
          </div>
            
      </div>
  );
};

export default SearchBar;
