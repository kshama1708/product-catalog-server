import "../styles/Filter.css";

function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
  filteredCount,
}) {
  return (
    <div className="filter">
      <div className="filter__inner">
        <label className="filter__label" htmlFor="category-select">
          Category
        </label>

        <div className="filter__select-wrapper">
          <select
            id="category-select"
            className="filter__select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <span className="filter__count">
          Showing <strong>{filteredCount}</strong> products
        </span>
      </div>
    </div>
  );
}

export default Filter;