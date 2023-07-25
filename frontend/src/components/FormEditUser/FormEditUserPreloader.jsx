import React from 'react';
import ContentLoader from 'react-content-loader';

const FormEditUserPreloader = (props) => (
  <ContentLoader
    speed={2}
    width="327"
    height="373"
    viewBox="0 0 327 373"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100" height="18" />
    <rect x="0" y="20" rx="0" ry="0" width="320" height="26" />
    <rect x="0" y="75" rx="0" ry="0" width="80" height="18" />
    <rect x="0" y="95" rx="0" ry="0" width="320" height="26" />
    <rect x="45" y="147" rx="0" ry="0" width="60" height="18" />
    <rect x="120" y="143" rx="0" ry="0" width="43" height="26" />
    <rect x="180" y="150" rx="0" ry="0" width="14" height="14" />
    <rect x="200" y="148" rx="10" ry="10" width="16" height="16" />
    <rect x="225" y="150" rx="0" ry="0" width="14" height="14" />
    <rect x="250" y="148" rx="10" ry="10" width="16" height="16" />
    <rect x="0" y="190" rx="0" ry="0" width="50" height="18" />
    <rect x="0" y="210" rx="0" ry="0" width="320" height="26" />
    <rect x="0" y="263" rx="0" ry="0" width="50" height="18" />
    <rect x="0" y="283" rx="0" ry="0" width="320" height="26" />
    <rect x="30" y="333" rx="0" ry="0" width="260" height="26" />
  </ContentLoader>
);

export default FormEditUserPreloader;
