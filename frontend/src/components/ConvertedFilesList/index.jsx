import PropTypes from 'prop-types';
import './ConvertedFilesList.css';

const ConvertedFilesList = ({ files, onDownload, onDelete }) => {
  if (!files || files.length === 0) return null;

  return (
    <div className="filesContainer">
      <h3 className="filesTitle">Converted Files</h3>
      <div className="filesGrid">
        {files.map((file, index) => (
          <div key={index} className="fileCard">
            <span className="fileName" title={file.name}>
              {file.name}
            </span>
            <div className="buttonsContainer">
              <button 
                onClick={() => onDownload(file)}
                className="downloadButton"
              >
                Download
              </button>
              <button 
                onClick={() => onDelete(file)}
                className="deleteButton"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ConvertedFilesList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ConvertedFilesList;
