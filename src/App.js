import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';

const App = () => {
  // Routes Component is allows this application to register
  // these Route level components that will then in turn render
  // a specific component when it matches this specific route that
  // you're looking for.

  return (
    <Routes>
      <Route path='/home' element={<Home />} />
    </Routes>
  );
};

export default App;
