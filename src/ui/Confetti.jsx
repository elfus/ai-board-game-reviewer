import PropTypes from 'prop-types';
import * as ReactConfetti from 'react-confetti';
import { useLocation } from 'react-router-dom';

function Confetti() {
    const { width, height } = window.screen;
    const { pathname } = useLocation();
    const partyMode = pathname === '/';
    return (
        <ReactConfetti
            opacity={0.5}
            numberOfPieces={250}
            confettiSource={{x: width/2, y: height-100}}
            initialVelocityY={20}
            recycle={partyMode}
            initialVelocityX={10}
        />
    );
}


Confetti.propTypes = {
    recycle: PropTypes.bool,
  };
  
  export default Confetti;
  