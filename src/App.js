import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';

import {
  userAuthStateChanged,
  getDataFromUserDocument,
} from './utils/firebase/firebase.utils';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

userAuthStateChanged(async user => {
  if (user) {
    const userData = await getDataFromUserDocument(user);

    if (!userData) return;

    console.log(userData);
    console.log(user.uid);
  }
});

const App = () => {
  // Routes Component is allows this application to register
  // these Route level components that will then in turn render
  // a specific component when it matches this specific route that
  // you're looking for.

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
