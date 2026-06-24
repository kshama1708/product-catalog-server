import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <h1 className="header__title">
            Product <span>Browser</span>
          </h1>
          <p className="header__subtitle">Browse 200,000+ Products</p>
        </div>
        <span className="header__badge">200K+ Items</span>
      </div>
    </header>
  );
}

export default Header;