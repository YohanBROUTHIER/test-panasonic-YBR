import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import { ScrollTop } from '../../components';
import { useRef } from 'react';

export default function App() {
  const headRef = useRef();

  return (
    <>
      <Header ref={headRef}/>
      <Outlet />
      <Footer />
      <ScrollTop anchorRef={headRef}/>
    </>
  );
}

