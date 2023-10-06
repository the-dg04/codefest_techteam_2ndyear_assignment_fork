import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Popup from './components/Popup';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
function App(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Dashboard />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/popup" element={<Popup />}/>
                <Route path="/" element={<Navigate to="/login" />}/>
            </Routes>
        </BrowserRouter>

        </>
    );
}
export default App;