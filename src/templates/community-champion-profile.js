import React from 'react';
import styled from '@emotion/styled';
import Breadcrumb from '~components/dev-hub/breadcrumb';
import Layout from '~components/dev-hub/layout';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';

const BREADCRUMB_BOTTOM_MARGIN = '40px';

const CHAMPION_PROFILE_BREADCRUMBS_PREFIX = [
    { label: 'Home', target: '/' },
    {
        label: 'MongoDB Community Champions',
        target: '/community-champions',
    },
];

const ContentContainer = styled('div')`
    padding: ${size.default} ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        padding: ${size.mediumLarge} ${size.default};
    }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
    line-height: 1;
    margin-bottom: ${BREADCRUMB_BOTTOM_MARGIN};
    > a {
        font-size: ${fontSize.xsmall};
    }
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const CommunityChampionProfile = props => {
    const {
        pageContext: { champion, slug },
    } = props;
    const { firstName, middleName, lastName } = champion;
    const fullName = [firstName, middleName, lastName].join(' ');
    const championProfileBreadcrumbs = CHAMPION_PROFILE_BREADCRUMBS_PREFIX.push(
        {
            label: `${fullName}`,
            target: slug,
        }
    );
    return (
        <Layout>
            <ContentContainer>
                <StyledBreadcrumb>
                    {championProfileBreadcrumbs}
                </StyledBreadcrumb>
            </ContentContainer>
        </Layout>
    );
};

export default CommunityChampionProfile;
