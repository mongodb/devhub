import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import ArrowheadIcon from '~components/dev-hub/icons/arrowhead-icon';
import GithubIcon from '~components/dev-hub/icons/github';
import LinkedinIcon from '~components/dev-hub/icons/linkedin';
import AuthorImage from '~components/dev-hub/author-image';
import { P3 } from '~components/dev-hub/text';
import Link from '~components/Link';

const StudentToggle = styled('div')`
    display: grid;
    grid-template-columns: 32px 1fr 16px;
    grid-template-rows: 56px;
    column-gap: 16px;
    align-items: center;
    width: 100%;
`;
const InvisibleLink = styled(Link)`
    text-decoration: none;
`;
const StudentLi = styled('li')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    display: flex;
    justify-content: center;
    flex-direction: column;
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
    display: grid;
    grid-template-columns: 16px 1fr;
    column-gap: 8px;
    align-items: center;
`;
const LinkText = styled(P3)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;
const StudentInfo = styled('div')`
    padding-bottom: 16px;
`;

const Student = ({ student }) => {
    const theme = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    return (
        <StudentLi>
            {/* Button? */}
            <StudentToggle onClick={toggleIsOpen}>
                <AuthorImage
                    gradientOffset={4}
                    hideOnMobile={false}
                    height={32}
                    width={32}
                    image={student.image.url}
                    key={student.name}
                />
                <StudentName collapse>{student.name}</StudentName>
                <ArrowheadIcon size="16" />
            </StudentToggle>
            {isOpen && (
                <StudentInfo>
                    <StudentBio>{student.bio || 'test'}</StudentBio>
                    {student.github_url && (
                        <InvisibleLink to={student.github_url}>
                            <LinkContainer>
                                <GithubIcon />
                                <LinkText>{student.github_url}</LinkText>
                            </LinkContainer>
                        </InvisibleLink>
                    )}
                    {student.linkedin_url && (
                        <InvisibleLink>
                            <LinkContainer>
                                <LinkedinIcon
                                    color={theme.colorMap.darkGreen}
                                    width="16"
                                />
                                <LinkText collapse>
                                    {student.linkedin_url}
                                </LinkText>
                            </LinkContainer>
                        </InvisibleLink>
                    )}
                    {student.youtube_url && (
                        <InvisibleLink>{student.youtube_url}</InvisibleLink>
                    )}
                </StudentInfo>
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
