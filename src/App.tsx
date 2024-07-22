import './App.css';
import Header from './Components/Header/Header.tsx';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Containers/HomePage/HomePage.tsx';
import AddContactPage from './Containers/AddContactPage/AddContactPage.tsx';
import EditContactPage from './Containers/EditContactPage/EditContactPage.tsx';

const App = () => (
  <>
    <Header/>
    <Routes>
      <Route path={'/'} element={<HomePage/>}/>
      <Route path={'/new-contact'} element={<AddContactPage/>}/>
      <Route path={'/edit-contact/:id'} element={<EditContactPage/>}/>
    </Routes>
  </>
);

export default App;
