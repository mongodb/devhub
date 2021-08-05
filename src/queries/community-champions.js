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
                  id
                  link
                  title
                }
                Socials {
                    facebookUrl
                    githubUrl
                    linkedinUrl
                    twitterUrl
                    youtubeUrl
                    twitchUrl
                }
                Certifications {
                  isDBAAssociateCertified
                  isDeveloperAssociateCertified
                }
            }
        }
    }
 `;
