import React from 'react';
import Layout from '../components/dev-hub/layout';
import useAllMedia from '../hooks/use-all-media';
import MediaItem from '../components/dev-hub/media-item';
import { P } from '../components/dev-hub/text';

export default () => {
    const { media, error, isLoading } = useAllMedia();
    return (
        <Layout>
            {isLoading && <P>Loading...</P>}
            {media &&
                Object.values(media).map(item => (
                    <MediaItem key={item.title} {...item} />
                ))}
            {error && <P>Check back later for upcoming media contents</P>}
        </Layout>
    );
};
