import React from 'react';
import ContentLoader from 'react-content-loader';

const MyPagePreloader = (props) => (
  <ContentLoader
    speed={2}
    width="170"
    height="385"
    viewBox="0 0 170 385"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="5" rx="0" ry="0" width="170" height="110" />
    <rect x="5" y="130" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="180" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="230" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="280" rx="0" ry="0" width="170" height="30" />
    <rect x="5" y="330" rx="0" ry="0" width="170" height="30" />
  </ContentLoader>
);

export default MyPagePreloader;
