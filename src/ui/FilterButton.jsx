import PropTypes from 'prop-types';
import Button from './Button';

function FilterButton({ onClick, active, disabled, children }) {
  return (
    <Button type="filter" disabled={disabled} active={active} onClick={onClick}>
      {children}
    </Button>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string,
};

export default FilterButton;
