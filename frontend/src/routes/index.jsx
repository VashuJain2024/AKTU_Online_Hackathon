import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/HomePage';
import HowItWorksPage from '../pages/HowItWorksPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/how-it-works',
        element: <HowItWorksPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]); 