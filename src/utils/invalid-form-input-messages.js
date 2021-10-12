export const nameInvalidMessage = (name, nameType) =>
    name === ''
        ? `${nameType} cannot be blank`
        : `${nameType} should only contain letters. e.g. John`;

export const emailInvalidMessage = email =>
    email === ''
        ? 'Email cannot be blank'
        : 'Please enter a valid email address. e.g. example@email.com';
