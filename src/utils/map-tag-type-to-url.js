import { getTagPageUriComponent } from './get-tag-page-uri-component';

const STRAPI_TAG_MAPPING = {
    AggregationFramework: 'Aggregation Framework',
    AtlasSearch: 'Atlas Search',
    BIConnector: 'BI Connector',
    CloudDevelopment: 'Cloud Development',
    CloudManager: 'Cloud Manager',
    ChangeStreams: 'Change Streams',
    Cs: 'C#',
    dotNET: '.NET',
    dotNETCore: '.NET Core',
    DataLake: 'Data Lake',
    DataStructures: 'Data Structures',
    DataVisualization: 'Data Visualization',
    FARMStack: 'FARM Stack',
    FieldLevelEncryption: 'Field Level Encryption',
    FullTextSearch: 'Full-Text Search',
    GameDevelopment: 'Game Development',
    JupyterNotebook: 'Jupyter Notebook',
    MongoDB40: 'MongoDB 4.0',
    MongoDB42: 'MongoDB 4.2',
    MongoDB44: 'MongoDB 4.4',
    MongoDB50: 'MongoDB 5.0',
    ObjectiveC: 'Objective-C',
    OnlineArchive: 'Online Archive',
    OpsManager: 'Ops Manager',
    PublicSpeaking: 'Public Speaking',
    RemoteWork: 'Remote Work',
    SchemaDesign: 'Schema Design',
    SoftSkills: 'Soft Skills',
    SwiftUI: 'Swift UI',
    TimeSeries: 'Time Series',
    VSCode: 'VS Code',
};

export const mapTagTypeToUrl = (tags, tagType, useStrapiTagMapping = false) => {
    // Allow tag type to be omitted in article rST
    if (!tags || !tags.length) return [];
    return tags.map(t => {
        // Handle a null tag
        if (!t) return { label: '', to: '/' };
        const mappedTag = useStrapiTagMapping ? STRAPI_TAG_MAPPING[t] || t : t;
        return {
            label: mappedTag,
            to: `/${tagType}/${getTagPageUriComponent(mappedTag)}`,
        };
    });
};
