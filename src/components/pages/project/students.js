import React from 'react';
import styled from '@emotion/styled';
import AuthorImage from '~components/dev-hub/author-image';
import { P } from '~components/dev-hub/text';
import Link from '~components/Link';

const GithubLink = styled(Link)``;
const LinkedinLink = styled(Link)``;
const StudentName = styled(P)``;
const StudentBio = styled(P)``;
const YoutubeLink = styled(Link)``;

const Student = ({ student }) => {
    console.log(student);
    return (
        <div>
            <AuthorImage
                gradientOffset={4}
                hideOnMobile={false}
                height={32}
                width={32}
                image={student.image.url}
                key={student.name}
            />
            <StudentName>{student.name}</StudentName>
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
    );
};

const Students = ({ students, ...props }) => (
    <div {...props}>
        {students.map(student => (
            <Student key={student.name} student={student} />
        ))}
    </div>
);

export default Students;
