import {Header} from './components/@ui/header/Header';
import {Outlet} from 'react-router-dom';
import './styles/global.css';

function App() {

    return (
        <main className="main-layout">
            <Header></Header>
            <section className="outlet-section">
                <Outlet></Outlet>
            </section>
        </main>
    );
}

export default App;
