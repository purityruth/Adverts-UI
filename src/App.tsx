import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import AdvertiserHome from './components/advertiser/AdvertiserHome';
import AdvertReport from './components/advertiser/AdvertReport';
import Layout from './components/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: '/',
          element: <AdvertiserHome />,
        },
        {
          path: 'report',
          element: <AdvertReport />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


