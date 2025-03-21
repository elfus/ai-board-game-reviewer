import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button({ children, disabled, to, type, onClick, active }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4 ',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    navigate:
      'inline-block text-sm rounded-full border-2 border-stone-300 bg-transparent hover:text-stone-800 focus:text-stone-800 font-semibold uppercase tracking-wider text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-bgstone-200 focus:ring-offset-2 disabled:cursor-not-allowed  px-3 py-1 md:px-3 md:py-1 ',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 bg-transparent hover:text-stone-800 focus:text-stone-800 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-bgstone-200 focus:ring-offset-2 disabled:cursor-not-allowed  px-4 py-2.5 md:px-6 md:py-3.5 ',
    filter: `inline-block text-sm rounded-full border-2  border-stone-300 bg-transparent hover:text-stone-700 focus:text-stone-800 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300  focus:bg-stone-300 focus:outline-none focus:ring focus:ring-bgstone-200 focus:ring-offset-2  px-3 py-1 md:px-3 md:py-1 ${active ? 'bg-stone-300 text-stone-700' : ''}`,
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
