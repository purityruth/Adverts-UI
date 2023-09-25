import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import NotFound from './components/NotFound';
import AdvertiserHome from './components/advertiser/AdvertiserHome';
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
          <AdvertiserHome />
        </Layout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

