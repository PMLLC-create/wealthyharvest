import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "./States";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Wealthy Harvest UI error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState />;
    }
    return this.props.children;
  }
}
