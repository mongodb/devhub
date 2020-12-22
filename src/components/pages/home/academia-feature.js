import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import HoverCard from '../../dev-hub/hover-card';
import Grid from '../../dev-hub/grid';
import MediaBlock from '../../dev-hub/media-block';
import { H2, P } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import Button from '../../dev-hub/button';
import academiaImage from '../../../images/1x/Academia.svg';
import GradientUnderline from '../../dev-hub/gradient-underline';
import { useTheme } from 'emotion-theming';
import FeatureSection from './feature-section';
import { transformProjectStrapiData } from '../../../utils/transform-project-strapi-data';

const DescriptiveText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: ${size.medium};
`;

const SectionContent = styled('div')`
    padding: 0 ${size.default};
    @media ${screenSize.largeAndUp} {
        margin-top: 15%;
        padding: 8%;
    }
`;

const homeFeaturedProjects = graphql`
    query HomeFeaturedProjects {
        allStrapiProjects(limit: 3) {
            nodes {
                students {
                    bio {
                        image {
                            url
                        }
                    }
                }
                info {
                    name
                    slug
                    image {
                        url
                    }
                }
            }
        }
    }
`;

const AcademiaFeature = () => {
    const data = useStaticQuery(homeFeaturedProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = projects.map(transformProjectStrapiData);
    const theme = useTheme();
    return (
        <FeatureSection altBackground>
            <MediaBlock
                mediaComponent={
                    <Grid
                        numCols={2}
                        layout={{
                            rowSpan: [1],
                            colSpan: [2, 1, 1],
                        }}
                        rowHeight="250px"
                    >
                        {mappedProjects.map(project => (
                            <HoverCard image={project.image_url}>
                                {project.name}
                            </HoverCard>
                        ))}
                    </Grid>
                }
                reverse
            >
                <SectionContent>
                    <H2>
                        <GradientUnderline
                            gradient={theme.gradientMap.magentaSalmonSherbet}
                        >
                            MongoDB for Academia
                        </GradientUnderline>
                    </H2>
                    <DescriptiveText>
                        MongoDB for Academia gives educators hands-on learning
                        experiences to inspire, teach and learn with MongoDB.
                    </DescriptiveText>
                    <div>
                        <Button to="/academia/educators/" secondary>
                            Learn more
                        </Button>
                    </div>
                </SectionContent>
            </MediaBlock>
        </FeatureSection>
    );
};

export default AcademiaFeature;
