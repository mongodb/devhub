import React from 'react';
import styled from '@emotion/styled';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import { H4 } from '~components/dev-hub/text';
import Link from '~components/dev-hub/link';
import DBAAssociateBadge from '~images/community-champions/dba-associate-badge.svg';
import DeveloperAssociateBadge from '~images/community-champions/developer-associate-badge.svg';
import { css } from '@emotion/react';

const CERTIFICATE_BADGE_WIDTH = '129';
const CERTIFICATE_BADGE_HEIGHT = '132';
const BADGE_CONTAINER_WIDTH = '162px';

const Title = styled(H4)`
    margin-bottom: ${size.mediumLarge};
    @media ${screenSize.upToSmallDesktop} {
        margin-bottom: ${size.default};
    }
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.medium};
        line-height: 30px;
    }
`;

const Grid = styled('div')`
    column-gap: ${size.xsmall};
    display: grid;
    grid-template-columns: repeat(auto-fill, ${BADGE_CONTAINER_WIDTH});
    row-gap: ${size.tiny};
    @media ${screenSize.upToSmallDesktop} {
        column-gap: ${size.default};
        margin-bottom: ${size.xlarge};
    }
`;

const hoverStyles = theme => css`
    &:hover,
    &:focus {
        background-color: ${theme.colorMap.greyDarkThree};
        color: inherit;
        cursor: pointer;
    }
`;

const CertificationLink = styled(Link)`
    border-radius: ${size.xsmall};
    padding: ${size.default};
    ${({ theme }) => hoverStyles(theme)}
`;

const AwardLink = styled(Link)`
    align-self: center;
    border-radius: ${size.xsmall};
    justify-self: center;
    ${({ href, theme }) => (href ? hoverStyles(theme) : '')}
`;

const CertificationsAndAwards = ({ awards, certifications }) => {
    const certificates = certifications
        ? [
              {
                  alt: 'DBA Associate badge',
                  src: DBAAssociateBadge,
                  url: certifications.dbaAssociateUrl,
              },
              {
                  alt: 'Developer Associate badge',
                  src: DeveloperAssociateBadge,
                  url: certifications.developerAssociateUrl,
              },
          ]
        : [];
    const title =
        certifications && awards.length
            ? 'MongoDB Certifications & Awards'
            : awards.length
            ? 'MongoDB Awards'
            : 'MongoDB Certifications';
    return (
        <div>
            <Title>{title}</Title>
            <Grid>
                {certificates.map(
                    ({ alt, src, url }) =>
                        url && (
                            <CertificationLink
                                key={alt}
                                href={url}
                                target="_blank"
                            >
                                <img
                                    alt={alt}
                                    src={src}
                                    width={CERTIFICATE_BADGE_WIDTH}
                                    height={CERTIFICATE_BADGE_HEIGHT}
                                />
                            </CertificationLink>
                        )
                )}
                {awards.map(({ image, name, url }) => (
                    <AwardLink key={name} href={url} target="_blank">
                        <img alt={name} src={image.url} />
                    </AwardLink>
                ))}
            </Grid>
        </div>
    );
};

export default CertificationsAndAwards;
