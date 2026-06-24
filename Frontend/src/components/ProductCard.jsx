import '../styles/ProductCard.css';

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatPrice(price) {
  if (price === undefined || price === null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

function ProductCard({ product }) {
  const { name, category, price, createdAt, updatedAt } = product;

  return (
    <article className="product-card">
      <div className="product-card__header">
        <h2 className="product-card__name">{name}</h2>
        <span className="product-card__price">{formatPrice(price)}</span>
      </div>

      <span className="product-card__category">{category}</span>

      <hr className="product-card__divider" />

      <div className="product-card__meta">
        <div className="product-card__meta-row">
          <span className="product-card__meta-label">Created</span>
          <span className="product-card__meta-value">{formatDate(createdAt)}</span>
        </div>
        <div className="product-card__meta-row">
          <span className="product-card__meta-label">Updated</span>
          <span className="product-card__meta-value">{formatDate(updatedAt)}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;