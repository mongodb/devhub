import React from 'react';
import styled from '@emotion/styled';
import Link from '~components/Link';
import Students from './students';
import ToolsUsed from './tools-used';

const BottomBorder = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    margin-bottom: 24px;
`;

const LinksContainer = styled('div')`
    padding-bottom: 32px;
`;

const ProjectLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const ToolsUsedWithPadding = styled(ToolsUsed)`
    padding-bottom: 32px;
`;

const Links = ({ github_url, project_link }) => {
    const hasExternalLinks = !!(github_url || project_link);
    if (hasExternalLinks) {
        return (
            <LinksContainer>
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
            </LinksContainer>
        );
    }
};

const SidebarContent = ({ github_url, project_link, students, tags }) => (
    <div>
        <BottomBorder>
            <ToolsUsedWithPadding tags={tags} />
            <Links github_url={github_url} project_link={project_link} />
        </BottomBorder>
        <Students students={students} />
    </div>
);

export default SidebarContent;
