import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListPeliculas from './pages/peliculas/ListPeliculas.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPeliculas from './pages/peliculas/FormPeliculas.jsx'
import ListActores from './pages/actores/ListActores.jsx'
import FormActores from './pages/actores/FormActores.jsx'
import ListActuaciones from './pages/actuaciones/ListActuaciones.jsx'
import FormActuaciones from './pages/actuaciones/FormActuaciones.jsx'
import MainPage from './pages/home/mainPage.jsx'
import PeliculaDetail from './pages/home/peliculas/peliculaDetail.jsx'
import PeliculaList from './pages/home/peliculas/PeliculaList.jsx'
import RepartoList from './pages/home/reparto/RepartoList.jsx'
import RepartoDetail from './pages/home/reparto/RepartoDetail.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/peliculas',
    element: <ListPeliculas />,
  },
  {
    path: '/peliculas/formulario',
    element: <FormPeliculas />,
  },
  {
    path: '/peliculas/formulario/:id',
    element: <FormPeliculas />,
  },
  {
    path: '/reparto',
    element: <ListActores />,
  },
  {
    path: '/reparto/formulario',
    element: <FormActores />,
  },
  {
    path: '/reparto/formulario/:id',
    element: <FormActores />,
  },
  {
    path: '/actuaciones',
    element: <ListActuaciones />,
  },
  {
    path: '/actuaciones/formulario',
    element: <FormActuaciones />,
  },
  {
    path: '/actuaciones/formulario/:repartoId/:peliculaId',
    element: <FormActuaciones />,
  },
  {
    path: '/spoiledTangerines',
    element: <MainPage />,
  },
  {
    path: '/spoiledTangerines/pelicula/:id',
    element: <PeliculaDetail/>
  },
  {
    path: '/spoiledTangerines/peliculas',
    element: <PeliculaList/>
  },
  {
    path: '/spoiledTangerines/repartos',
    element: <RepartoList/>
  },
  {
    path: '/spoiledTangerines/reparto/:id',
    element: <RepartoDetail/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
