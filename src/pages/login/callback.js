import React from 'react';
import Layout from '~components/dev-hub/layout';

export default () => {
    // Handle token logic here as well, add to context
    if (typeof window !== 'undefined') {
        window.location = '/';
    }
    return <Layout></Layout>;
};
