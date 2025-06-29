import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    products: 'Products',
    about: 'About Us',
    'ceo-message': 'Message from CEO',
    'our-team': 'Our Team',
    branches: 'Branches',
    contact: 'Contact Us',
    'news-details':'News Detail'
  };

  // Check if last segment is a numeric ID
  const isDetailPage =
    pathnames.length >= 2 && /^[a-zA-Z0-9]+$/.test(pathnames[pathnames.length - 1]);

  // Build breadcrumb items
  const breadcrumbItems = [];

  breadcrumbItems.push(
    <Breadcrumb.Item key="home" linkAs={Link} linkProps={{ to: '/' }}>
      Home
    </Breadcrumb.Item>
  );

  if (isDetailPage) {
    // Only show "Item Detail" if it's a detail page
    const id = pathnames[pathnames.length - 1];
    breadcrumbItems.push(
      <Breadcrumb.Item key={id} active>
        Details
      </Breadcrumb.Item>
    );
  } else {
    // Otherwise, map and display all segments normally
    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      const displayValue =
        routeNameMap[value] ||
        decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1));

      breadcrumbItems.push(
        <Breadcrumb.Item
          key={to}
          linkAs={Link}
          linkProps={{ to }}
          active={isLast}
        >
          {displayValue}
        </Breadcrumb.Item>
      );
    });
  }

  return (
    <div className="custom-breadcrumb-container">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
