import React from 'react';
import Style from "./TextErrorForms.module.scss";


export default function TextErrorForms({ textError }) {
  return <span className={Style.error}>{textError}</span>;
}
