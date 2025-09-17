import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ListPost } from './pages/ListPost'
import NotFound from './pages/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: "/list-post",
    element: <ListPost/>
  },
  {
    path:"*",
    element: <NotFound/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={router} />
  </StrictMode>,
)
