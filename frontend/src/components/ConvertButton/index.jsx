import PropTypes from 'prop-types';
import './ConvertButton.css';

const ConvertButton = ({ onClick, isLoading, text = 'Convert' }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={isLoading} 
      className={`convertButton ${isLoading ? 'disabled' : ''}`}
    >
      {isLoading ? 'Converting...' : text}
    </button>
  );
};

ConvertButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string
};

export default ConvertButton;
