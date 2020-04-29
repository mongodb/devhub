// hardcoded for now because this target lookup will be complex
// as it relies on other sites (e.g. manual) cc. Andrew
export const REF_TARGETS = {
    'compass-index': 'https://docs.mongodb.com/compass/current/#compass-index',
    'document-dot-notation':
        'https://docs.mongodb.com/manual/core/document/#document-dot-notation',
    glossary: 'https://docs.mongodb.com/manual/reference/glossary',
    'install-rhel-configure-selinux':
        'https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/#install-rhel-configure-selinux',
    manual: 'https://docs.mongodb.com/manual',
    'mongodb-uri':
        'https://docs.mongodb.com/manual/reference/connection-string/#mongodb-uri',
    'mongodb-supported-platforms':
        'https://docs.mongodb.com/manual/installation/#mongodb-supported-platforms',
    'schema-validation-json':
        'https://docs.mongodb.com/manual/core/schema-validation/#schema-validation-json',
    'write-op-insert-behavior':
        'https://docs.mongodb.com/manual/tutorial/insert-documents/#insert-behavior',
    'configuration-options':
        'https://docs.mongodb.com/manual/reference/configuration-options/#configuration-options',
};

export const ADMONITIONS = [
    'admonition',
    'example',
    'important',
    'note',
    'seealso',
    'tip',
    'warning',
];

// Twitch API constants
export const TWITCH_API_ENDPOINT = 'https://api.twitch.tv/helix/';
export const TWITCH_CLIENT_ID = '041r2glmgub2pt357ss0la44j2sz95';
export const TWITCH_MDB_CHANNEL_ID = '467752938';
export const TWITCH_HEADERS = { 'Client-ID': TWITCH_CLIENT_ID };
export const TWITCH_STREAMS_URL = `${TWITCH_API_ENDPOINT}streams?user_id=${TWITCH_MDB_CHANNEL_ID}`;
export const TWITCH_VIDEO_URL = `${TWITCH_API_ENDPOINT}videos?user_id=${TWITCH_MDB_CHANNEL_ID}`;
