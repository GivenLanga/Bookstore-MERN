import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Optionally log error to an external service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            background: "#1a1a1a",
            color: "#fff",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap", color: "#ccc" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            style={{
              marginTop: "2rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              background: "#333",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
