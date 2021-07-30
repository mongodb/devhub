export const communityChampions = `
    query CommunityChampions {
        allStrapiCommunityChampions {
            nodes {
                firstName
                middleName
                lastName
                location
                title
                image {
                    url
                }
                quote
                languagesSpoken
                bio
                BlogsAndPublications {
                  link
                  title
                }
                Certifications {
                  isDBAAssociateCertified
                  isDeveloperAssociateCertified
                }
            }
        }
    }
 `;
