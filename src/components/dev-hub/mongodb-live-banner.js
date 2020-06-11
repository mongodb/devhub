import React from 'react';
import styled from '@emotion/styled';
import useMedia from '../../hooks/use-media';
import Image from '../Image';
import Link from './link';
import { screenSize } from './theme';

const LiveImage = styled(Image)`
    border-radius: 0;
    margin-bottom: 0;
    width: 100%;
`;

const MongodbLiveBanner = () => {
    const isMobile = useMedia(screenSize.upToMedium);
    return (
        <Link href="https://www.mongodb.com/resources/channel/mongodblive?tck=devhubbannerdotlive">
            <LiveImage
                alt="Click to watch keynotes and sessions from MongoDB.live, our virtual developer conference."
                src={
                    isMobile
                        ? '/public/images/post-live-sm.png'
                        : '/public/images/post-live-lg.png'
                }
            />
        </Link>
    );
};

export default MongodbLiveBanner;
