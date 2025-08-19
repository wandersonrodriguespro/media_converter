import PropTypes from 'prop-types';
import './FileUploader.css';

const FileUploader = ({ onFilesSelect }) => {
  return (
    <div className="fileUploader">
      <input 
        type="file" 
        multiple
        onChange={(e) => onFilesSelect(Array.from(e.target.files))}
        accept="image/png, image/jpeg, image/gif"
        className="fileInput"
        id="file-upload"
      />
      <label 
        htmlFor="file-upload"
        className="uploadButton"
      >
        Select Files
      </label>
    </div>
  );
};

FileUploader.propTypes = {
  onFilesSelect: PropTypes.func.isRequired
};

export default FileUploader;
