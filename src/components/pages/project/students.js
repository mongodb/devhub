import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Button from '~components/dev-hub/button';
import ArrowheadIcon from '~components/dev-hub/icons/arrowhead-icon';
import GithubIcon from '~components/dev-hub/icons/github';
import LinkedinIcon from '~components/dev-hub/icons/linkedin';
import YoutubeIcon from '~components/dev-hub/icons/youtube';
import AuthorImage from '~components/dev-hub/author-image';
import { P3, H5 } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';
import Link from '~components/Link';

const AUTHOR_IMAGE_SIZE = 32;
const AUTHOR_IMAGE_GRADIENT_WIDTH = 4;
const CONDENSED_STUDENT_HEIGHT = '46px';
const TOTAL_AUTHOR_IMAGE_SIZE = `${
    AUTHOR_IMAGE_SIZE + AUTHOR_IMAGE_GRADIENT_WIDTH
}px`;
const ICON_SIZE = size.stripUnit(size.default);

const StudentName = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;
const StudentToggle = styled(Button)`
    align-items: center;
    column-gap: ${size.default};
    display: grid;
    font-family: inherit;
    grid-template-columns: ${TOTAL_AUTHOR_IMAGE_SIZE} 1fr ${size.default};
    grid-template-rows: ${CONDENSED_STUDENT_HEIGHT};
    padding: 0;
    text-align: left;
    text-decoration: none;
    width: 100%;
    &:hover {
        ${StudentName} {
            color: ${({ theme }) => theme.colorMap.greyLightOne};
        }
    }
`;
const StudentLi = styled('li')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 10px;
    margin-bottom: 10px;
    @media ${screenSize.upToMedium} {
        :last-of-type {
            border-bottom: none;
        }
    }
`;
const StudentsList = styled('ul')`
    list-style: none;
    margin: 0;
    padding-left: 0;
`;

const StudentBio = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    padding-top: 16px;
`;
const LinkContainer = styled('div')`
    align-items: center;
    display: grid;
    column-gap: ${size.xsmall};
    grid-template-columns: ${size.default} 1fr;
    padding-bottom: 10px;
`;
const LinkText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const InvisibleLink = styled(Link)`
    margin-bottom: 10px;
    text-decoration: none;
    &:active,
    &:focus,
    &:hover {
        ${LinkText} {
            color: ${({ theme }) => theme.colorMap.lightGreen};
        }
    }
`;

const SocialMediaEntry = ({ Icon, url }) => {
    const theme = useTheme();
    return url ? (
        <InvisibleLink target="_blank" to={url}>
            <LinkContainer>
                <Icon color={theme.colorMap.darkGreen} width={ICON_SIZE} />
                <LinkText collapse>{url}</LinkText>
            </LinkContainer>
        </InvisibleLink>
    ) : null;
};

const SocialMediaEntries = ({ student }) => (
    <>
        <SocialMediaEntry Icon={GithubIcon} url={student.github_url} />
        <SocialMediaEntry Icon={LinkedinIcon} url={student.linkedin_url} />
        <SocialMediaEntry Icon={YoutubeIcon} url={student.youtube_url} />
    </>
);

const Student = ({ student }) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const arrowDirection = useMemo(() => (isOpen ? 'up' : 'right'), [isOpen]);
    return (
        <StudentLi>
            <StudentToggle
                onClick={toggleIsOpen}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <AuthorImage
                    gradientOffset={AUTHOR_IMAGE_GRADIENT_WIDTH}
                    hideOnMobile={false}
                    height={AUTHOR_IMAGE_SIZE}
                    width={AUTHOR_IMAGE_SIZE}
                    image={student.image.url}
                    key={student.name}
                />
                <StudentName collapse>{student.name}</StudentName>
                <ArrowheadIcon
                    color={isHover && theme.colorMap.greyLightOne}
                    direction={arrowDirection}
                    size={ICON_SIZE}
                />
            </StudentToggle>
            {isOpen && (
                <div>
                    <StudentBio>{student.bio}</StudentBio>
                    <SocialMediaEntries student={student} />
                </div>
            )}
        </StudentLi>
    );
};

const Students = ({ students, ...props }) => (
    <div>
        <H5>Created By</H5>
        <StudentsList {...props}>
            {students.map(student => (
                <Student key={student.name} student={student} />
            ))}
        </StudentsList>
    </div>
);

export default Students;
