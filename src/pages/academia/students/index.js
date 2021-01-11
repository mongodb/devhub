import React from 'react';
import Layout from '~components/dev-hub/layout';
import {
    GithubStudentPack,
    ShareProjectCTA,
} from '~components/dev-hub/student-spotlight';
import GalleryHeroBanner from '~components/pages/students/gallery-hero-banner';

const Students = () => {
    return (
        <Layout>
            <GalleryHeroBanner />
            <ShareProjectCTA />
            <GithubStudentPack />
        </Layout>
    );
};

export default Students;
