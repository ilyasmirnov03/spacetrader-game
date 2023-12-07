import { useNavigate } from 'react-router';
import './App.css';
import { Header } from './components/@ui/header/Header';
import { LocalStorageEnum } from './enum/local-storage.enum';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import environment from './constants/environment.const';

function App() {

  const navigate = useNavigate();
  const loginToken = localStorage.getItem(LocalStorageEnum.LOGIN_KEY);

  function redirectFromPathname(path: string): void {
    if (path === '/') {
      navigate('/dashboard');
    } else {
      navigate(path);
    }
  }

  useEffect(() => {
    if (!loginToken) {
      navigate('/login');
    } else {
      environment.loginToken = loginToken;
      redirectFromPathname(window.location.pathname);
    }
  }, [loginToken, navigate]);

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
