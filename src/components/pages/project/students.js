import React, { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import Button from '~components/dev-hub/button';
import ArrowheadIcon from '~components/dev-hub/icons/arrowhead-icon';
import GithubIcon from '~components/dev-hub/icons/github';
import LinkedinIcon from '~components/dev-hub/icons/linkedin';
import YoutubeIcon from '~components/dev-hub/icons/youtube';
import AuthorImage from '~components/dev-hub/author-image';
import { P3 } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';
import Link from '~components/Link';

const AUTHOR_IMAGE_SIZE = 32;
const AUTHOR_IMAGE_GRADIENT_WIDTH = 4;
const CONDENSED_STUDENT_HEIGHT = '46px';
const TOTAL_AUTHOR_IMAGE_SIZE = `${
    AUTHOR_IMAGE_SIZE + AUTHOR_IMAGE_GRADIENT_WIDTH
}px`;
const ICON_SIZE = size.stripUnit(size.default);

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
`;
const InvisibleLink = styled(Link)`
    margin-bottom: 10px;
    text-decoration: none;
`;
const StudentLi = styled('li')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;
const StudentsList = styled('ul')`
    list-style: none;
    padding-left: 0;
`;
const StudentName = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;
const StudentBio = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
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

const SocialMediaEntry = ({ Icon, url }) => {
    const theme = useTheme();
    return url ? (
        <InvisibleLink to={url}>
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
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const arrowDirection = useMemo(() => (isOpen ? 'up' : 'right'), [isOpen]);
    return (
        <StudentLi>
            <StudentToggle onClick={toggleIsOpen}>
                <AuthorImage
                    gradientOffset={AUTHOR_IMAGE_GRADIENT_WIDTH}
                    hideOnMobile={false}
                    height={AUTHOR_IMAGE_SIZE}
                    width={AUTHOR_IMAGE_SIZE}
                    image={student.image.url}
                    key={student.name}
                />
                <StudentName collapse>{student.name}</StudentName>
                <ArrowheadIcon direction={arrowDirection} size={ICON_SIZE} />
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
    <StudentsList {...props}>
        {students.map(student => (
            <Student key={student.name} student={student} />
        ))}
    </StudentsList>
);

export default Students;
