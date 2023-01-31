import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'login',
      element:<Login/>
    },
    {
      path:'register',
      element:<Register/>
    }
  ])
  return (
    <RouterProvider router={router} className="App">
      <Toaster/>
    </RouterProvider>
  );
}

export default App;
