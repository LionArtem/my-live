import React from 'react';
import ContentLoader from 'react-content-loader';

const MyPagePreloader = (props) => (
  <ContentLoader
    speed={2}
    width="170"
    height="380"
    viewBox="0 0 170 380"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="0" rx="0" ry="0" width="170" height="110" />
    <rect x="5" y="125" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="175" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="225" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="275" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="325" rx="0" ry="0" width="170" height="30" />
  </ContentLoader>
);

export default MyPagePreloader;
