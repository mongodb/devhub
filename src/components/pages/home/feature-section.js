import styled from '@emotion/styled';
import { screenSize, size } from '../../dev-hub/theme';

const FeatureSection = styled('section')`
    ${({ altBackground, theme }) =>
        altBackground && `background-color: ${theme.colorMap.devBlack};`};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.medium};
        padding: 0;
        padding-bottom: ${size.medium};
    }
    @media ${screenSize.largeAndUp} {
        margin: 0 ${size.large} ${size.medium};
        padding-top: ${size.medium};
    }
`;

export default FeatureSection;
