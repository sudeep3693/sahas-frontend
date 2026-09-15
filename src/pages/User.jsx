import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { Outlet } from 'react-router-dom';
import NavBarwithBreadcrumb from '../Component/NavBarwithBreadCrumb';

function User({onProductsClick, onContactClick}) {
  
  return (
    <div className="site-shell">
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
