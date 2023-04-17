import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

import { userAuthStateChanged } from './utils/firebase/firebase.utils';

import { UserContext } from './contexts/user.context';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const App = () => {
  const { setCurrentUser } = useContext(UserContext);
  // Routes Component is allows this application to register
  // these Route level components that will then in turn render
  // a specific component when it matches this specific route that
  // you're looking for.

  userAuthStateChanged(user => {
    if (user) {
      setCurrentUser(user);
    }
  });

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
