import { useNavigate } from 'react-router';
import './App.css';
import { Header } from './components/@ui/header/Header';
import { LocalStorageEnum } from './enum/local-storage.enum';
import { useEffect } from 'react';
import { Dashboard } from './components/dashboard/root/Dashboard';

function App() {

  const navigate = useNavigate();
  const loginToken = localStorage.getItem(LocalStorageEnum.LOGIN_KEY);

  useEffect(() => {
    if (!loginToken) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Dashboard></Dashboard>
    </>
  )
}

export default App;
