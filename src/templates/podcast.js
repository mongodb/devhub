import React from 'react';
import AudioPlayer from '~components/dev-hub/podcast-player/audio-player';
import Layout from '~components/dev-hub/layout';

const Podcast = ({ pageContext: { data: podcast, ...other } }) => {
    console.log(other);
    console.log(podcast);
    return (
        <Layout includeCanonical={false}>
            Test Page
            { podcast && <AudioPlayer podcast={podcast} /> }
        </Layout>
    );
};

export default Podcast;
