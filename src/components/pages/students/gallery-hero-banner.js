import React from 'react';
import styled from '@emotion/styled';
import Button from '~components/dev-hub/button';
import HeroBanner from '~components/dev-hub/hero-banner';
import { H2, P } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';

const HeadingCopy = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const BannerContentLayout = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const MobileMarginBottom = styled('div')`
    margin-bottom: ${size.medium};
`;

const ShowOffButton = styled(Button)`
    height: fit-content;
`;

const GalleryHeroBanner = () => {
    const academiaBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'MongoDB for Academia', target: '/academia' },
    ];
    return (
        <HeroBanner
            showImageOnMobile={false}
            fullWidth
            breadcrumb={academiaBreadcrumbs}
        >
            <BannerContentLayout>
                <MobileMarginBottom>
                    <H2>Student Spotlights</H2>
                    <HeadingCopy collapse>
                        Projects created by students, for students
                    </HeadingCopy>
                </MobileMarginBottom>
                <ShowOffButton primary to="/academia/students/submit">
                    Show off your project
                </ShowOffButton>
            </BannerContentLayout>
        </HeroBanner>
    );
};

export default GalleryHeroBanner;
