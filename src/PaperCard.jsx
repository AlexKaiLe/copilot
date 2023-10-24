import React from 'react';
import { Button } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const PaperCard = ({ paper }) => {
    const { title, authors, publishedDate, arXivId, abstract} = paper;
    return (
        <div className="movie">
            
            <div>
                <h3>{title}</h3>
                <p>{publishedDate}</p>
                <p>{authors}</p>
                <a href={arXivId}><Button 
                    startIcon = {<FileOpenIcon></FileOpenIcon>}
                    variant="contained">arXiv link</Button></a>
                {/* <p>{abstract}</p> */}
            </div>
        </div>
    );
}

export default PaperCard;