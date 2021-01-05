import React from 'react';
import styled from '@emotion/styled';
import Button from '../../dev-hub/button';
import HeroBanner from '../../dev-hub/hero-banner';
import { H2, P } from '../../dev-hub/text';

const BannerContentLayout = styled('div')`
    display: flex;
    justify-content: space-between;
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
        <HeroBanner fullWidth breadcrumb={academiaBreadcrumbs}>
            <BannerContentLayout>
                <div>
                    <H2>Student Spotlights</H2>
                    <P>Projects created by students, for students</P>
                </div>
                <ShowOffButton primary to="/academia/students/submit">
                    Show off your project
                </ShowOffButton>
            </BannerContentLayout>
        </HeroBanner>
    );
};

export default GalleryHeroBanner;
