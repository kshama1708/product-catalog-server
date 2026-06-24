import ProductCard from './ProductCard';
import '../styles/ProductList.css';

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <section className="product-list">
        <div className="product-list__grid">
          <div className="product-list__empty">
            <div className="product-list__empty-icon">🔍</div>
            <p className="product-list__empty-title">No products found</p>
            <p className="product-list__empty-text">Try selecting a different category.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-list">
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;