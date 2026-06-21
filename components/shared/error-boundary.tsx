"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-crimson-glow border border-crimson-border">
            <AlertTriangle className="w-5 h-5 text-crimson" />
          </div>
          <div className="space-y-1">
            <p className="text-text-primary text-sm font-medium">
              Something went wrong
            </p>
            <p className="text-text-tertiary text-xs mono">
              {this.state.message}
            </p>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-emerald-border px-3 py-1.5 rounded-lg"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
