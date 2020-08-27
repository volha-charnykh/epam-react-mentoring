import React from 'react';
import './app-error-boundary.scss';

export default class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="ErrorPage">Something went wrong.</div>;
        }

        return this.props.children;
    }
}