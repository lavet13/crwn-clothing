import { Fragment, useContext } from 'react';

// This Outlet we can see as a outlet where the code that we wanna render should come out from
// Outlet allows us to leverage this pattern matching in this nesting structure in order to dynamically
// change portions of our code based on the routes and the nested routes
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          <Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
