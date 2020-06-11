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
        <Link href="https://www.mongodb.com/world?tck=devhubbannerdotlive">
            <LiveImage
                alt="MongoDB.live, free & fully virtual. June 9th - 10th. Register Now"
                src={
                    isMobile
                        ? '/public/images/dot-live-sm.png'
                        : '/public/images/dot-live-lg.png'
                }
            />
        </Link>
    );
};

export default MongodbLiveBanner;
