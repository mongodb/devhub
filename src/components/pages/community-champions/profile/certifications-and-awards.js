import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from '~components/dev-hub/link';
import { fontSize, screenSize, size } from '~components/dev-hub/theme';
import { H4 } from '~components/dev-hub/text';
import DBAAssociateBadge from '~images/community-champions/dba-associate-badge.svg';
import DeveloperAssociateBadge from '~images/community-champions/developer-associate-badge.svg';

const CERTIFICATE_BADGE_WIDTH = '129';
const CERTIFICATE_BADGE_HEIGHT = '132';
const BADGE_CONTAINER_WIDTH = '162px';

const hoverStyles = theme => css`
    &:hover,
    &:focus {
        background-color: ${theme.colorMap.greyDarkThree};
        color: inherit;
        cursor: pointer;
    }
`;

const AccoladeLink = styled(Link)`
    border-radius: ${size.xsmall};
    padding: ${size.default};
    ${({ href, theme }) => (href ? hoverStyles(theme) : '')};
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

// Awards and Certifications have differing APIs, we also want them to match here
const transformCertificationsToAwardsStructure = certifications => {
    const certificates = [];
    if (certifications) {
        const { dbaAssociateUrl, developerAssociateUrl } = certifications;
        const hasDba = !!dbaAssociateUrl;
        const hasDev = !!developerAssociateUrl;
        if (hasDba) {
            certificates.push({
                name: 'DBA Associate badge',
                image: {
                    url: DBAAssociateBadge,
                },
                url: dbaAssociateUrl,
            });
        }
        if (hasDev) {
            certificates.push({
                name: 'Developer Associate badge',
                image: { url: DeveloperAssociateBadge },
                url: developerAssociateUrl,
            });
        }
    }
    return certificates;
};

const CertificationsAndAwards = ({ awards, certifications }) => {
    const mappedCertifications =
        transformCertificationsToAwardsStructure(certifications);
    const title = useMemo(() => {
        const hasAwards = !!awards.length;
        const hasCertificates = !!mappedCertifications.length;
        if (hasAwards) {
            if (hasCertificates) {
                return 'MongoDB Certifications & Awards';
            }
            return 'MongoDB Awards';
        }
        return 'MongoDB Certifications';
    }, [awards.length, mappedCertifications.length]);
    const allAccolades = mappedCertifications.concat(awards);
    return (
        <div data-test="accolades">
            <Title>{title}</Title>
            <Grid>
                {allAccolades.map(({ image, name, url }) => (
                    <AccoladeLink
                        data-test="accolade"
                        key={name}
                        href={url}
                        target="_blank"
                    >
                        <img
                            alt={name}
                            src={image.url}
                            width={CERTIFICATE_BADGE_WIDTH}
                            height={CERTIFICATE_BADGE_HEIGHT}
                        />
                    </AccoladeLink>
                ))}
            </Grid>
        </div>
    );
};

export default CertificationsAndAwards;
