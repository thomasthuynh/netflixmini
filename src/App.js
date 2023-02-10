import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
