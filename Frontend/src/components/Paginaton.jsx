import "../styles/Pagination.css";

function Pagination({ onLoadMore, loading, hasMore }) {
  return (
    <div className="pagination">
      {hasMore ? (
        <button
          className="pagination__load-more"
          onClick={onLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      ) : (
        <span className="pagination__all-loaded">
          No more products
        </span>
      )}
    </div>
  );
}

export default Pagination;