import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'

export function Filters() {
    const { filters, setFilters } = useFilters()
    const [minPriceFilterId] = useId()
    const [categoryFilterId] = useId()

    const handleMinPriceChange = (e) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio Mínimo:</label>
                <input 
                    id={minPriceFilterId}
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.minPrice}
                    onChange={handleMinPriceChange}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria:</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="accessories">Accesorios</option>
                </select>
            </div>
        </section>
    )
}