import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import NotFound from './components/NotFound';
import AdvertiserHome from './components/advertiser/AdvertiserHome';

function App() {

  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />
    },
    {
      path: "/",
      element: <AdvertiserHome />
    }
  ]);


  return <RouterProvider router={router} />

}

export default App
