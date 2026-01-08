import './App.css'
import { lazy, Suspense } from 'react'
import { Router } from './Router.jsx'
import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'
import { Route } from './Route.jsx'

const lazyHomepage = lazy(() => import('./pages/Home.jsx'))
const lazyAbout = lazy(() => import('./pages/About.jsx'))

const routes = [
  {
    path: '/search/:query',
    Component: SearchPage
  },
  {
    path: '/:lang/about',
    Component: lazyAbout
  }
]

function App() {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={lazyHomepage}></Route>
          <Route path='/about' Component={lazyAbout}></Route>
        </Router>
      </Suspense>
    </main>
  )
}

export default App
