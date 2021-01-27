import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import ArrowheadIcon from '~components/dev-hub/icons/arrowhead-icon';
import AuthorImage from '~components/dev-hub/author-image';
import { P } from '~components/dev-hub/text';
import Link from '~components/Link';

const StudentToggle = styled('div')`
    display: grid;
    grid-template-columns: 32px 1fr 16px;
    grid-template-rows: 56px;
    column-gap: 16px;
    align-items: center;
    width: 100%;
`;
const GithubLink = styled(Link)``;
const LinkedinLink = styled(Link)``;
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
const StudentName = styled(P)``;
const StudentBio = styled(P)``;
const YoutubeLink = styled(Link)``;

const Student = ({ student }) => {
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
                <ArrowheadIcon />
            </StudentToggle>
            {isOpen && (
                <div>
                    <StudentBio>{student.bio || 'test'}</StudentBio>
                    {student.github_url && (
                        <GithubLink>{student.github_url}</GithubLink>
                    )}
                    {student.linkedin_url && (
                        <LinkedinLink>{student.linkedin_url}</LinkedinLink>
                    )}
                    {student.youtube_url && (
                        <YoutubeLink>{student.youtube_url}</YoutubeLink>
                    )}
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
