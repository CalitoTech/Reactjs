import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiltersProvider } from './context/filter.jsx'

createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>,
)
