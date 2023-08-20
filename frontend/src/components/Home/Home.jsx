import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, resetForm } from '../../redax/slices/authSlice';

import Header from '../Header/Header';
import Authorization from '../Authorization/Authorization';
import AuthorizedUser from '../AuthorizedUser/AuthorizedUser';
import MenuApp from './MenuApp/MenuApp';

export default function Home() {
  const dispatch = useDispatch();
  const { token, fopmReg, fopmSign } = useSelector(selectAuth);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        dispatch(resetForm());
      }
    }
    if (fopmReg || fopmSign) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [fopmReg, fopmSign]);

  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>{token ? <AuthorizedUser /> : <Authorization />}</section>
        <section>
          <MenuApp />
        </section>
      </main>
      <footer>
        <p>ArtemGreen</p>
      </footer>
    </div>
  );
}
