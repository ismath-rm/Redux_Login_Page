import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRegister from './pages/user/UserRegister';
import './App.css';
import UserWrapper from './components/user/UserWrapper/UserWrapper';
import AdminWrapper from './components/admin/AdminWrapper/AdminWrapper';
import { Provider } from 'react-redux';
import userStore from "./Redux/userStore"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-ui-kit/css/mdb.min.css';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={userStore}>
      <Routes>
        <Route path='/*' element={<UserWrapper/>}></Route>
        <Route path='admincontrol/*' element={<AdminWrapper/>}></Route>
      
      </Routes>
      </Provider>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
