import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../Authentication/PrivateRoute';
import Admin from '../pages/Admin';
import Body from '../AdminComponents/Body';
import ContactDetails from '../AdminComponents/pages/ContactDetails';
import InstitutionalDetail from '../AdminComponents/pages/InstitutionalDetail';
import HandleImages from '../AdminComponents/pages/HandleImages';
import UploadNews from '../AdminComponents/UploadNews';
import config from '../Constants/config';
import TeamDetail from '../AdminComponents/TeamDetail';
import DocumentManager from '../AdminComponents/DocumentManager';
import MessageManager from '../AdminComponents/MessageManager';

const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for doesn't exist.</p>
  </div>
);

const AdminRoutes = (isAuthenticated) => [
  <Route
    key="protected-admin"
    element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
  >
    <Route path="/admin/*" element={<Admin />}>

      <Route index element={<Body />} />
      <Route path="contactDetails" element={<ContactDetails />} />
      <Route path="teamDetails" element={<TeamDetail />} />
      <Route path="uploadNews" element={<UploadNews />} />
      <Route path="uploadDocument" element={<DocumentManager />} />
      <Route path="uploadMessage" element={<MessageManager />} />

      <Route
        path="notice"
        element={
          <HandleImages
            getLink={`${config.baseUrl}/notice`}
            postLink={`${config.baseUrl}/notice`}
            selectionHeader="Upload Notices"
            displayHeader="Display Notices"
            usedIn="notice"
          />
        }
      />

      <Route
        path="carouselImage"
        element={
          <HandleImages
            getLink={`${config.baseUrl}/images/carousel`}
            postLink={`${config.baseUrl}/images/carousel`}
            selectionHeader="Upload Carousel Images"
            displayHeader="Display Carousel Images"
            usedIn="carousel"
          />
        }
      />

      <Route
        path="galleryImage"
        element={
          <HandleImages
            getLink={`${config.baseUrl}/gallery`}
            postLink={`${config.baseUrl}/gallery`}
            selectionHeader="Upload Gallery Images"
            displayHeader="Display Gallery Images"
            usedIn="gallery"
          />
        }
      />

      <Route path="institutionalDetails" element={<InstitutionalDetail />} />
      <Route path="*" element={<NotFound />} />

    </Route>
  </Route>
];

export default AdminRoutes;
