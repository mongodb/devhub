import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from './button';
import Card from './card';
import MediaBlock from './media-block';
import { H2, P } from './text';
import meetupsImage from '../../images/1x/Meetups.png';
import { size, screenSize} from './theme';

const ImageDescription = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.large};
    }
`;

const FeatureSection = styled('section')`
    ${({ altBackground, theme }) =>
        altBackground && `background-color: ${theme.colorMap.devBlack};`};
    padding-bottom: 80px;
    padding-top: 80px;
`;

const SectionContent = styled('div')`
    padding: 5%;
`;

const FeatureBlock = ({
    cta = null,
    description,
    image = meetupsImage,
    imgTitle,
    imgDescription,
    onClick = null,
    reverse = false,
    title,
    ...props
}) => (
    <FeatureSection altBackground {...props}>
        <MediaBlock
            reverse={reverse}
            mediaComponent={
                <Card
                    image={image}
                    title={imgTitle}
                    description={imgDescription}
                ></Card>
            }
        >
            <SectionContent>
                {title && <H2>{title}</H2>}
                {description && (
                    <ImageDescription>{description}</ImageDescription>
                )}
                {cta && (
                    <Button
                        to={cta.to}
                        href={cta.href}
                        secondary
                        onClick={onClick}
                    >
                        {cta.text}
                    </Button>
                )}
            </SectionContent>
        </MediaBlock>
    </FeatureSection>
);

FeatureBlock.propTypes = {
    cta: PropTypes.shape({
        to: PropTypes.string,
        href: PropTypes.string,
        text: PropTypes.string.isRequired,
    }),
    description: PropTypes.string,
    image: PropTypes.string,
    imgTitle: PropTypes.string,
    imgDescription: PropTypes.string,
    onClick: PropTypes.func,
    reverse: PropTypes.bool,
    title: PropTypes.string,
};

export default FeatureBlock;
