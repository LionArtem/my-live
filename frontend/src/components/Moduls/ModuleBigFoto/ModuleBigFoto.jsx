import React from 'react';
import Style from './ModuleBigFoto.module.scss';
import ModulContainer from '../ModulContainer/ModulContainer';

export default function ModuleBigFoto({ isShowBigAvatar, url }) {
  return (
    <ModulContainer clickOverly={isShowBigAvatar}>
      <img
        className={Style.bigAvatar}
        src={`http://localhost:3001/${url}`}
        alt="аватар"
      />
    </ModulContainer>
  );
}
