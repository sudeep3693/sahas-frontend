import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import User from '../pages/User';
import Body from '../pages/Body';
import DetailsPage from '../UserComponents/ProductDetailPage';
import ServiceDetailsPage from '../UserComponents/ServiceDetailPage';
import MessageDetailPage from '../UserComponents/MessageDetailPage';
import AboutDetail from '../UserComponents/AboutDetail';
import ScrollToTop from './ScrollToTop';
import Downloads from '../Component/Downloads';
import AllNews from '../Component/AllNews';
import OurGallery from '../Component/OurGallery';
import SecondaryNavbar from '../Component/SecondaryNavBar';
import TeamDetailContainer from '../Component/TeamDetailContainer';
import NewsDetailPage from '../Component/NewsDetailPage';
import OtpComponent from '../Component/OtpComponent';

function UserRoutes() {
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () =>{
    contactRef.current?.scrollIntoView({behavior:'smooth'});
  }

  return (
    <>
      <ScrollToTop />
      <SecondaryNavbar onProductsClick={scrollToProducts} onContactClick={scrollToContact}/>
      <Routes>
        
        <Route path="/" element={<User onProductsClick={scrollToProducts} onContactClick={scrollToContact} />}>
          <Route index element={<Body productsRef={productsRef} contactRef = {contactRef} />} />
          <Route path="details/:id" element={<DetailsPage />} />
          <Route path="news-details/:id" element={<NewsDetailPage />} />
          <Route path="serviceDetails/:id" element={<ServiceDetailsPage />} />
          <Route path="messageDetails/:id" element={<MessageDetailPage />} />
          <Route path="aboutDetail" element={<AboutDetail />} />
          <Route path = "all-news" element={<AllNews/>}/>
          <Route path = "downloads" element = {<Downloads type="downloads"/>}/>
          <Route path = "reports" element = {<Downloads type="reports"/>}/>
          <Route path = "gallery" element={<OurGallery/>}/>
          <Route path = "team" element={<TeamDetailContainer/>}/> 
          <Route path = "forgetPassword" element={<OtpComponent/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default UserRoutes;
