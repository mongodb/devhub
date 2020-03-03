import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { colorMap, screenSize, size } from './theme';
import Link from './link';
import FacebookIcon from './icons/facebook-icon';
import TwitterIcon from './icons/twitter-icon';

const ArticleShareArea = styled('div')`
    border-top: 1px solid ${colorMap.greyDarkTwo};
    display: flex;
    justify-content: space-between;
    margin-bottom: ${size.large};
    margin-top: ${size.xlarge};
    padding-top: ${size.medium};
    @media ${screenSize.upToMedium} {
        margin-top: ${size.large};
    }
`;

const ArticleShareFooter = ({ tags, url }) => {
    return (
        <ArticleShareArea>
            <BlogTagList tags={tags} />
            <div>
                <Link href={`https://twitter.com/intent/tweet?url=${url}`}>
                    <TwitterIcon />
                </Link>
                <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                >
                    <FacebookIcon />
                </Link>
            </div>
        </ArticleShareArea>
    );
};

export default ArticleShareFooter;
