import { getTagPageUriComponent } from './get-tag-page-uri-component';

const STRAPI_TAG_MAPPING = {
    AggregationFramework: 'Aggregation Framework',
    AtlasSearch: 'Atlas Search',
    BIConnector: 'BI Connector',
    CloudManager: 'Cloud Manager',
    ChangeStreams: 'Change Streams',
    CloudDevelopment: 'Cloud Development',
    Cs: 'C#',
    dotNET: '.NET',
    DataLake: 'Data Lake',
    DataStructures: 'Data Structures',
    DataVisualization: 'Data Visualization',
    FARMStack: 'FARM Stack',
    FullTextSearch: 'Full-Test Search',
    GameDevelopment: 'Game Development',
    MongoDB40: 'MongoDB 4.0',
    MongoDB42: 'MongoDB 4.2',
    MongoDB44: 'MongoDB 4.4',
    MongoDB50: 'MongoDB 5.0',
    ObjectiveC: 'Objective-C',
    OnlineArchive: 'Online Archive',
    OpsManager: 'Ops Manager',
    PublicSpeaking: 'Public Speaking',
    SchemaDesign: 'Schema Design',
    SoftSkills: 'Soft Skills',
    TimeSeries: 'Time Series',
    VSCode: 'VS Code',
};

export const mapTagTypeToUrl = (tags, tagType, useStrapiTagMapping = false) => {
    // Allow tag type to be omitted in article rST
    if (!tags || !tags.length) return [];
    return tags.map(t => {
        const mappedTag = useStrapiTagMapping ? STRAPI_TAG_MAPPING[t] || t : t;
        return {
            label: mappedTag,
            to: `/${tagType}/${getTagPageUriComponent(mappedTag)}`,
        };
    });
};
