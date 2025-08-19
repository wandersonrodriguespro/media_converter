import PropTypes from 'prop-types';
import './ErrorDisplay.css';

const ErrorDisplay = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="errorContainer">
      <p className="errorMessage">{message}</p>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string
};

export default ErrorDisplay;
