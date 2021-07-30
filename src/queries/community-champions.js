export const communityChampions = `
    query CommunityChampions {
        allStrapiCommunityChampions(
            sort: { fields: [firstName, middleName, lastName] }
        ) {
            nodes {
                id
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
