import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import styled from '@emotion/styled';
import ARTICLE_PLACEHOLDER from '../../images/1x/MDB-and-Node.js.png';
import { H4 } from './text';
import { screenSize, size } from './theme';
import AssociationsCard from './associations-card';
import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import { makeLinkInternalIfApplicable } from '~utils/make-link-internal-if-applicable';

const RelatedContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding: 30px ${size.medium};
    @media ${screenSize.mediumAndUp} {
        padding: 70px calc(${size.xxlarge} - ${size.medium});
    }
`;

const RelatedCards = styled('div')`
    display: grid;
    grid-auto-rows: 112px;
    grid-template-columns: repeat(auto-fill, 384px);
    column-gap: 16px;
    row-gap: 16px;
`;

const getCardParamsFromRelatedType = (
    { target: associatedLink, image },
    slugTitleMapping
) => {
    const isExternal = /^http(s)?:\/\//.test(associatedLink);
    if (isExternal) {
        // Can't add much since we just have links here
        return {
            image: ARTICLE_PLACEHOLDER,
            href: associatedLink,
            title: associatedLink,
        };
    }
    const title = dlv(
        slugTitleMapping,
        [associatedLink.slice(1, -1), 0, 'value'],
        ''
    );
    return { image: withPrefix(image), title, to: associatedLink };
};

const getNewCardParamsFromRelatedType = (relatedArticle, slugTitleMapping) => {
    const name = relatedArticle.name
        ? relatedArticle.name
        : relatedArticle.type;
    switch (name) {
        case 'doc':
            const slug =
                relatedArticle.target && relatedArticle.target.slice(1);
            // 'doc' is for internal articles, so links should be prefixed
            const to = addTrailingSlashIfMissing(
                withPrefix(relatedArticle.target)
            );
            const image = relatedArticle.image
                ? withPrefix(relatedArticle.image)
                : ARTICLE_PLACEHOLDER;
            const title = dlv(slugTitleMapping, [slug, 0, 'value'], '');
            if (title === '') {
                console.error(
                    `No title found for this internal article ${slug}`,
                    slugTitleMapping
                );
            }
            return { image, to, title };
        case 'literal':
            return {
                image: relatedArticle.image
                    ? withPrefix(relatedArticle.image)
                    : ARTICLE_PLACEHOLDER,
                target: null,
                title: dlv(relatedArticle, ['children', 0, 'value'], ''),
            };
        case 'reference':
            return {
                image: relatedArticle.image
                    ? withPrefix(relatedArticle.image)
                    : ARTICLE_PLACEHOLDER,
                href: makeLinkInternalIfApplicable(relatedArticle.refuri, true),
                title: dlv(relatedArticle, ['children', 0, 'value'], ''),
                type: relatedArticle.refuri.includes('you')
                    ? 'youtube'
                    : 'article',
            };
        default:
            console.error(`Related article type not implemented: ${name}`);
            return { title: null, image: null, target: null };
    }
};

const ArticleAssociations = ({
    associations,
    related,
    seriesArticles,
    slugTitleMapping,
}) => {
    console.log(related);
    if (!associations || !associations.length) return null;
    let seriesArticlesToRemove = [];
    Object.keys(seriesArticles).forEach(series => {
        console.log(seriesArticles[series]);
        seriesArticlesToRemove = seriesArticlesToRemove.concat(
            seriesArticles[series]
        );
    });
    seriesArticlesToRemove = seriesArticlesToRemove.map(a => `/${a}/`);
    const filteredAssociations = associations.filter(
        a => !seriesArticlesToRemove.includes(a.target)
    );
    console.log(seriesArticlesToRemove, filteredAssociations);
    if (filteredAssociations.length === 0) return null;
    return (
        <RelatedContainer>
            <H4>Recommended for you</H4>
            <RelatedCards>
                {filteredAssociations.map((link, i) => {
                    const {
                        image,
                        href,
                        to,
                        title,
                        type = 'article',
                    } = getCardParamsFromRelatedType(link, slugTitleMapping);
                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <>
                            <AssociationsCard
                                // Title may be undefined, so tacking on index keeps unique
                                key={`${title}-${i}`}
                                image={image}
                                href={href}
                                title={title}
                                to={to}
                                type={type}
                                timeToRead={link.timeToRead}
                            />
                        </>
                    );
                })}
                {related.map((link, i) => {
                    const {
                        image,
                        href,
                        to,
                        title,
                        type = 'article',
                    } = getNewCardParamsFromRelatedType(link, slugTitleMapping);
                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <>
                            <AssociationsCard
                                // Title may be undefined, so tacking on index keeps unique
                                key={`${title}-${i}`}
                                image={image}
                                href={href}
                                title={title}
                                to={to}
                                type={type}
                                timeToRead={link.timeToRead}
                            />
                        </>
                    );
                })}
            </RelatedCards>
        </RelatedContainer>
    );
};

export default ArticleAssociations;
