import React from 'react';
import Style from './BottonSubmit.module.scss';
import PreloaderPoint from '../../Preloaders/PreloaderPoint/PreloaderPoint';

export default function BottonSubmit({
  valid,
  showPreloader,
  successRequest,
  textAnswerRequest,
  text,
}) {
  return (
    <>
      {' '}
      {valid ? (
        <button className={Style.buttonForm} type="submit">
          {text}
          {showPreloader && <PreloaderPoint />}
        </button>
      ) : (
        <button
          disabled
          className={`${Style.buttonForm} ${Style.buttonFormOff}`}
          type="submit"
        >
          {text}
          {showPreloader && <PreloaderPoint />}
        </button>
      )}
      <span className={`${Style.error} ${successRequest && Style.success} `}>
        {textAnswerRequest}
      </span>
    </>
  );
}
