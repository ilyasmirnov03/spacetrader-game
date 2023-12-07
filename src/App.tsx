import { useNavigate } from 'react-router';
import { Header } from './components/@ui/header/Header';
import { LocalStorageEnum } from './enum/local-storage.enum';
import {useCallback, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import environment from './constants/environment.const';
import './styles/global.css';

function App() {

  const navigate = useNavigate();
  const loginToken = localStorage.getItem(LocalStorageEnum.LOGIN_KEY);

  const redirectFromPathname = useCallback(
      (path: string) => {
        if (path === '/') {
          navigate('/dashboard');
        } else {
          navigate(path);
        }
      }, [navigate]
  )

  useEffect(() => {
    if (!loginToken) {
      navigate('/login');
    } else {
      environment.loginToken = loginToken;
      redirectFromPathname(window.location.pathname);
    }
  }, [loginToken, navigate, redirectFromPathname]);

  return (
    <main className="main-layout">
      <Header></Header>
      <section className="outlet-section">
        <Outlet></Outlet>
      </section>
    </main>
  )
}

export default App;
