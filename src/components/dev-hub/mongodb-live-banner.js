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
        <Link
            href="https://www.mongodb.com/live/call-for-proposals?tck=dotlivecfpdev"
            target="_blank"
        >
            <LiveImage
                alt="Share your story at MongoDB.live 2021. Submit your talk."
                src={
                    isMobile
                        ? '/public/images/dot-live-cfp-banner-mobile.png'
                        : '/public/images/dot-live-cfp-banner-desktop.png'
                }
            />
        </Link>
    );
};

export default MongodbLiveBanner;
