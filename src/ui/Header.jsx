
import PropTypes from 'prop-types';

function Header({className}) {
  return (
    <header className={`${className} flex items-center justify-end border-b border-stone-200 bg-slate-900 text-white px-6 py-3 uppercase font-mono text-2xl`}>
      🎲 Boardgame List
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
