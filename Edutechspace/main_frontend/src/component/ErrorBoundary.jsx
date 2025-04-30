import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-neutral-700 mb-4">An error occurred in the application.</p>
          <details className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
            <summary className="text-neutral-900 font-semibold">Error Details</summary>
            <pre className="text-red-600 mt-2">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-900"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;