import React from 'react';
import { RuntimeError } from '../../classes/runtime-error';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        // We can use state here to show a fallback UI if something goes wrong
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        new RuntimeError(error, info);
        // TODO: Log to a service
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
