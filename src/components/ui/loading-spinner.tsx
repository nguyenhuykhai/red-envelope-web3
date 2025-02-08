const LoadingSpinner = () => {
  return (
    <div
      className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
