import { Link } from 'react-router-dom';
import { useLastUpdated } from '../hooks/useLastUpdated';
import Loader from './Loader';

function Footer() {
  const { isLoadingUpdated, lastUpdatedDate } = useLastUpdated();
  console.log(`HOME`, lastUpdatedDate);
  return (
    <>
      {isLoadingUpdated && <Loader />}
      <footer className="z-[100] flex items-center justify-center bg-stone-800 px-6 py-4">
        <p className="absolute bottom-2 left-2 text-center font-semibold text-stone-300 opacity-60">
          Last updated: {lastUpdatedDate.toDateString()}
        </p>
        <p className="text-center font-semibold text-stone-300">
          Powered by &nbsp;
          <a
            className="underline hover:cursor-pointer"
            href="https://sdk.vercel.ai"
            target="_blank"
          >
            IA SDK
          </a>{' '}
          🤖 using &nbsp;
          <a
            className="underline"
            href="https://boardgamegeek.com"
            target="_blank"
          >
            BGG
          </a>{' '}
          data 📊
          <br />
          ⚙️{' '}
          <Link className="underline" to="/howitworks">
            How it works
          </Link>
        </p>
      </footer>
    </>
  );
}

export default Footer;
