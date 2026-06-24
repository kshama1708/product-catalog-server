import { useState, useEffect, useCallback } from 'react';
import Filter from '../components/Filter';
import ProductList from '../components/ProductList';
import Pagination from '../components/Paginaton';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchProducts } from '../services/api';
import '../styles/Home.css';


const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
  "Automotive",
  "Garden",
  "Office",
];
const PAGE_SIZE = 20;

function Home() {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
 const [nextCursor, setNextCursor] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadInitial = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
  category,
});

setProducts(data.products);
setNextCursor(data.nextCursor);
    } catch (err) {
      setError(err.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitial(selectedCategory);
  }, [selectedCategory, loadInitial]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLoadMore = async () => {
  if (!nextCursor) return;

  setLoadingMore(true);

  try {
    const data = await fetchProducts({
      category: selectedCategory,
      cursor: nextCursor,
    });

    setProducts((prev) => [...prev, ...data.products]);
    setNextCursor(data.nextCursor);
  } catch (err) {
    setError(err.message || "Failed to load more products.");
  } finally {
    setLoadingMore(false);
  }
};

  const handleRetry = () => {
    loadInitial(selectedCategory);
  };

  return (
    <div className="home">
     <Filter
  categories={categories}
  selectedCategory={selectedCategory}
  onCategoryChange={handleCategoryChange}
  filteredCount={products.length}
/>

      {loading && <Loader />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {!loading && !error && (
        <>
          <ProductList products={products} />
          <Pagination
  onLoadMore={handleLoadMore}
  loading={loadingMore}
  hasMore={!!nextCursor}
/>
        </>
      )}
    </div>
  );
}

export default Home;