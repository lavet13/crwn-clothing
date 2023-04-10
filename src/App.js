import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/home/home.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

const Navigation = () => {
  return (
    <Fragment>
      <h1>I am the navbar</h1>
      <Outlet />
    </Fragment>
  );
};

const App = () => {
  // Routes Component is allows this application to register
  // these Route level components that will then in turn render
  // a specific component when it matches this specific route that
  // you're looking for.

  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Shop />} />
        <Route path='home' element={<Home />} />
      </Route>

      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
