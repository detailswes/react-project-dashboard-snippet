import React, { type ReactElement, type ReactNode } from "react";

interface State {
    hasError: boolean;
    error: Error | null;
}

interface Props {
    children: ReactNode;
    fallback?: ReactElement;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback != null) {
                return this.props.fallback;
            }
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        gap: "1rem",
                        fontFamily: "sans-serif",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <h2>Something went wrong</h2>
                    <p>
                        Please refresh the page or{" "}
                        <a href="/auth">go back to sign in</a>.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
