import React from 'react';
import styled from '@emotion/styled';
import useMedia from '../../hooks/use-media';
import Image from '../Image';
import Link from './link';
import { screenSize, size } from './theme';

const LiveImage = styled(Image)`
    border-radius: 0;
    margin-bottom: 0;
    width: 100%;
    @media ${screenSize.mediumAndUp} {
        min-height: ${size.large};
        object-fit: cover;
    }
`;

const MongodbLiveBanner = () => {
    const isMobile = useMedia(screenSize.upToMedium);
    return (
        <Link href="https://www.mongodb.com/live?tck=dotlivefallbannerdev">
            <LiveImage
                alt="Learn, develop, and innovate from anywhere. Join us for our MongoDB .Live series."
                src={
                    isMobile
                        ? '/public/images/dot-live-banner-mobile.png'
                        : '/public/images/dot-live-banner-desktop.png'
                }
            />
        </Link>
    );
};

export default MongodbLiveBanner;
