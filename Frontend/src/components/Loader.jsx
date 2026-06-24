import '../styles/Loader.css';

function Loader({ message = 'Loading products…' }) {
  return (
    <div className="loader">
      <div className="loader__spinner" aria-hidden="true">
        <div className="loader__spinner-ring"></div>
      </div>
      <p className="loader__text">{message}</p>
    </div>
  );
}

export default Loader;