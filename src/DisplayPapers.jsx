import PaperCard from "./PaperCard";

const DisplayPapers = ({papers}) => {
    return (
        <div>
            {papers && papers?.length > 0 ? (
                <div className="container">
                {papers.map((paper, index) => (<PaperCard key={index} paper={paper}/>))}
                </div>
            ) : (
                <div className="empty">
                <h2>No papers were found</h2>
                </div>
            )} 
        </div>
    )
}

export default DisplayPapers;
