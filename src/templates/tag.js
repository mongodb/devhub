import React from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import AuthorHeroBackground from '../images/1x/author-hero-background.png';
import TagBackground from '../images/1x/tag-background.png';
import ComponentFactory from '../components/ComponentFactory';
import AuthorImage from '../components/dev-hub/author-image';
import CardList from '../components/dev-hub/card-list';
import HeroBanner from '../components/dev-hub/hero-banner';
import Layout from '../components/dev-hub/layout';
import { H2, H3, P, P3 } from '../components/dev-hub/text';
import { screenSize, size } from '../components/dev-hub/theme';
import { parseQueryString } from '~utils/query-string';
import PageHelmet from '~components/dev-hub/page-helmet';

const Title = H2.withComponent('h1');

const toTitleCase = css`
    text-transform: capitalize;
`;

const SubHead = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    letter-spacing: 1px;
    line-height: 1;
    text-transform: uppercase;
`;

const AuthorName = styled('div')`
    ${P3} {
        color: ${({ theme }) => theme.colorMap.greyLightThree};
    }
`;

const AuthorByline = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: start;
`;

const AuthorHero = styled('div')`
    display: flex;
    flex-direction: row;
`;

const ArticleContent = styled('article')`
    padding: 80px ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        padding: ${size.large} ${size.medium};
    }
`;

const SyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.medium};
`;

const Tag = props => {
    const {
        pageContext: {
            bio,
            pages,
            image,
            isASTBio,
            isInternalImage = true,
            location,
            name,
            slug,
            title,
            type,
        },
        location: { search },
    } = props;
    const metadata = useSiteMetadata();
    const isAuthor = type === 'author';
    const capitalizedBreadcrumb = name.charAt(0).toUpperCase() + name.slice(1);
    const { page } = parseQueryString(search);

    const metaTitle = `${name} - ${page ? `Page ${page} - ` : ''}${metadata.title}`;

    return (
        <Layout>
            <PageHelmet
                canonicalUrl={`${metadata.siteUrl}/${slug}`}
                metaTitle={metaTitle}
            />
            <Helmet>
                {!isAuthor && <meta name="robots" content="noindex" />}
            </Helmet>
            <HeroBanner
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Learn', to: '/learn' },
                    { label: capitalizedBreadcrumb, to: slug },
                ]}
                collapse
                background={isAuthor ? AuthorHeroBackground : TagBackground}
                shouldContainBackground={isAuthor}
                showImageOnMobile={false}
            >
                {!isAuthor && (
                    <>
                        <SubHead bold>Tagged In</SubHead>
                        <Title css={toTitleCase}>
                            {page ? `${name} - Page ${page}` : name}
                        </Title>
                    </>
                )}
                {isAuthor && (
                    <div>
                        <AuthorHero>
                            <AuthorByline>
                                <SyledAuthorImage
                                    isInternalImage={isInternalImage}
                                    image={image}
                                />
                                <AuthorName>
                                    <Title>
                                        {page ? `${name} - Page ${page}` : name}
                                    </Title>
                                    {title && location && (
                                        <P>
                                            {title} - {location}
                                        </P>
                                    )}
                                </AuthorName>
                            </AuthorByline>
                        </AuthorHero>
                        {bio &&
                            (isASTBio ? (
                                <ComponentFactory nodeData={bio} />
                            ) : (
                                bio
                            ))}
                    </div>
                )}
            </HeroBanner>

            <ArticleContent>
                {isAuthor && <H3>Articles by {name}</H3>}
                <CardList articles={pages} />
            </ArticleContent>
        </Layout>
    );
};

Tag.propTypes = {
    pageContext: PropTypes.shape({
        author_image: PropTypes.string,
        bio: PropTypes.string,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string,
        type: PropTypes.string.isRequired,
    }),
};

export default Tag;
