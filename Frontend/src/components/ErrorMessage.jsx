import '../styles/ErrorMessage.css';

function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-message">
      <div className="error-message__icon" aria-hidden="true">⚠️</div>
      <h2 className="error-message__title">Failed to load products</h2>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
