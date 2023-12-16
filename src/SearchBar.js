import React from 'react';
const API_URL = "http://export.arxiv.org/api/"

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        searchArXiv("");
      }, []);
      
    const searchArXiv = async (search) => {
        try {
          const response = await axios.get(`${API_URL}query?search_query=all:${search}&max_results=10`);
          
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

    return (
    <div>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
    </div>
    );
}

export default SearchBar;