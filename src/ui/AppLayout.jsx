import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-slate-800">
      <video src="./BG.mov" autoPlay={true} muted={true} loop={true} className="absolute z-0 w-screen top-0 left-0 opacity-30">
        <source src="./BG.mov" type="video/mp4" />
      </video>
      <Header className="z-10"/>
      {/* TODO: Fix the usage of class overflow-scroll */}
      <div className="overflow-hidden z-10">
        <main className="mx-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
