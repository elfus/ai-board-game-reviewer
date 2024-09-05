import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './Header';
import Footer from './Footer';
import Confetti from './Confetti';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Confetti />
      <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-slate-800">
        <video
          src="./BG.mov"
          autoPlay={true}
          muted={true}
          loop={true}
          className="absolute left-0 top-0 z-0 h-screen w-screen opacity-75 blur-lg"
        >
          <source src="./BG.mov" type="video/mp4" />
        </video>
        <Header className="z-10" />
        {/* TODO: Fix the usage of class overflow-scroll */}
        <div className="z-10 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default AppLayout;
