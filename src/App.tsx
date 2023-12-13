import {Header} from './components/@ui/header/Header';
import {Outlet} from 'react-router-dom';
import './styles/global.css';

function App() {

    return (
        <main className="main-layout">
            <Header></Header>
            <div className="outlet-section">
                <Outlet></Outlet>
            </div>
        </main>
    );
}

export default App;
