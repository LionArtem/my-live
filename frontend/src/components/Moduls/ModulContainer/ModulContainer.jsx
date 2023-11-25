import React from 'react';
import Style from './ModulContainer.module.scss';
import { useDispatch } from 'react-redux';
import { isStatusModule } from '../../../redax/slices/moduleConfirmationSlice';

export default function ModulContainer({ children }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={(evt) => {
        if (evt.target === evt.currentTarget) {
          dispatch(isStatusModule(false));
        }
      }}
      className={Style.overflow}
    >
      {children}
    </div>
  );
}
