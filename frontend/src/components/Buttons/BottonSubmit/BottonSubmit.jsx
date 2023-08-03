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
    <div>
      {' '}
      {valid ? (
        <button className={Style.button_form} type="submit">
          {text}
          {showPreloader && <PreloaderPoint />}
        </button>
      ) : (
        <button
          disabled
          className={`${Style.button_form} ${Style.button_form_off}`}
          type="submit"
        >
          {text}
          {showPreloader && <PreloaderPoint />}
        </button>
      )}
      <span className={`${Style.error} ${successRequest && Style.success} `}>
        {textAnswerRequest}
      </span>
    </div>
  );
}
