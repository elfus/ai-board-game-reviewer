import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ className }) {
  return (
    <Link
      className={`${className} flex items-center justify-end border-b border-stone-200 bg-slate-900 px-6 py-3 font-mono text-2xl uppercase text-white`}
      to="/home"
    >
      🎲 GameBoard List
    </Link>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
