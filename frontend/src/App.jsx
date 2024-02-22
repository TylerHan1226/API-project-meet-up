import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import HomePage from './components/HomePage/HomePage';
import Groups from './components/Groups/Groups';
import GroupDetails from './components/Groups/GroupDetails';
import Events from './components/Events/Events';
import EventDetails from './components/Events/EventDetails';
import CreateGroupForm from './components/Groups/CreateGroupForm';
import UpdateGroupForm from './components/Groups/UpdateGroupForm';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/groups',
        element: <Groups />
      },
      {
        path: '/groups/create',
        element: <CreateGroupForm />
      },
      {
        path: '/groups/:groupId/update',
        element: <UpdateGroupForm />
      },
      {
        path: `/groups/:groupId`,
        element: <GroupDetails />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/events/:eventId',
        element: <EventDetails />
      },
      {
        path: 'login',
        element: <LoginFormPage />
      },
      {
        path: 'signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
