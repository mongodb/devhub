import { useEffect, useState } from 'react';

/**
 * Inspired by SSR pattern here
 * https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
 *
 * Only render children on the Client to help reduce SSR styling issues
 */
const ClientOnly = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);
    // Effect only kicks in when mounted on the client
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return children;
};

export default ClientOnly;
