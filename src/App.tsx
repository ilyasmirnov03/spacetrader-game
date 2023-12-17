import {Header} from './components/@ui/header/Header';
import {Outlet} from 'react-router-dom';
import './styles/global.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

    return (
        <main className="main-layout">
            <Header></Header>
            <div className="outlet-section">
                <Outlet></Outlet>
            </div>
            <ToastContainer
                position="bottom-center"
                hideProgressBar={true}
                theme="dark"
                newestOnTop={true}
            />
        </main>
    );
}

export default App;
