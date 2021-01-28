import React from 'react';
import styled from '@emotion/styled';
import Link from '~components/Link';
import Students from './students';
import ToolsUsed from './tools-used';

const ProjectLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const SidebarContent = ({ github_url, project_link, students, tags }) => (
    <div>
        <ToolsUsed tags={tags} />
        {github_url && (
            <ProjectLink tertiary to={github_url}>
                View on GitHub
            </ProjectLink>
        )}
        {project_link && (
            <ProjectLink tertiary to={project_link}>
                Live Demo
            </ProjectLink>
        )}
        <Students students={students} />
    </div>
);

export default SidebarContent;
