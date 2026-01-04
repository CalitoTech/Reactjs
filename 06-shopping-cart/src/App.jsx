import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart.jsx'
import { useFilters } from './hooks/useFilters.js'
import { IS_DEVELOPMENT } from './config'
import { CartProvider } from './context/cart.jsx'

function App() {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
