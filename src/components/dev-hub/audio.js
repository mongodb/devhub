import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import Button from './button';
import { colorMap, layer } from './theme';

const ReactPlayerContainer = styled('div')`
    background-color: ${colorMap.greyDarkTwo};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: ${layer.superFront};
    display: flex;
    flex-direction: column;
`;

const StyledPlayButton = styled(Button)`
    height: 50px;
    width: 50px;
`;

const StyledReactPlayer = styled(ReactPlayer)`
    background-color: ${colorMap.greyDarkTwo};
`;
const TEST_PODCAST = {
    description: undefined,
    mediaType: 'podcast',
    publishDate: 'Wed, 06 May 2020 16:00:00 +0000',
    thumbnailUrl:
        'https://ssl-static.libsyn.com/p/assets/3/2/d/b/32dbb642e0f5c977/MDB_Podcast_Cover_Art_V2.png',
    title: 'Ep. 6 Five Ways to Reduce Costs with MongoDB Atlas',
    url:
        'https://traffic.libsyn.com/secure/mongodb/Updated-5-Ways-Mike_-_4_13_20-b.mp3?dest-id=18542',
};

// Pass in entire podcast
// Trigger?
const Audio = ({ podcast = TEST_PODCAST, ...props }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const toggleIsPlaying = useCallback(() => setIsPlaying(!isPlaying), [
        isPlaying,
    ]);
    const [progress, setProgress] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    console.log(progress);
    // Progress gives playedSeconds, and played (fraction of total)
    useEffect(() => {}, [progress.played, progress.playedSeconds]);
    return (
        <ReactPlayerContainer {...props}>
            <div style={{ display: 'flex' }}>
                <img
                    height="64"
                    width="64"
                    src={podcast.thumbnailUrl}
                    alt={podcast.title}
                />
                {podcast.title}
                <StyledPlayButton play onClick={toggleIsPlaying} />
                {progress && progress.playedSeconds}
                <StyledReactPlayer
                    width="100%"
                    height="80px"
                    url={podcast.url}
                    onProgress={setProgress}
                    playing={isPlaying}
                />
                <Button
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                    }}
                >
                    open
                </Button>
                <Button
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                    }}
                >
                    close
                </Button>
            </div>
            {isExpanded && (
                <div>
                    {podcast.description}
                    WOO
                </div>
            )}
        </ReactPlayerContainer>
    );
};

export default Audio;
