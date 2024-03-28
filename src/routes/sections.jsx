import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes,useNavigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const MoviesPage = lazy(() => import('src/pages/movies'));
export const MovieDetailPage = lazy(() => import('src/pages/movie-detail'));
export const FavoriteMoviesPage = lazy(() => import('src/pages/favorite-movies'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  if (!isLoggedIn) {
    navigate('/login');
  }

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <IndexPage />, index: true },
        { path: 'movies', element: <MoviesPage /> },
        { path: 'favorite-movies', element: <FavoriteMoviesPage /> },
        { path: 'movie/:id', element: <MovieDetailPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
