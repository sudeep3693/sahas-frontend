import { useRef } from 'react';
import Header from '../Component/Header';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import { Outlet } from 'react-router-dom';
import NavBarwithBreadcrumb from '../Component/NavBarwithBreadCrumb';

function User({onProductsClick, onContactClick}) {
  
  return (
    <div>
      <Header />
      <NavBarwithBreadcrumb onProductsClick={onProductsClick} onContactClick={onContactClick} />
       <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default User;
