export const defaultOptions = {
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'UTC',
    timeZoneName: 'short',
};

const OFFSET_REGEX = /[+-]\d{2}:?(\d{2})?$/;

function isAware(dateString) {
    return (
        dateString.charAt(dateString.length - 1) === 'Z' ||
        dateString.match(OFFSET_REGEX)
    );
}

export const createDateObject = date => {
    // A datestring is aware if it ends in a Z or timezone offset
    if (typeof date === 'string' && isAware(date)) {
        return new Date(date);
    }
    // if the datestring was naive, force it to be interpreted as UTC
    // TOOD: I don't think this case happens in practice, only in tests
    return new Date(`${date}Z`);
};

export const toDateString = (date, options = defaultOptions) => {
    // fail gracefully
    if (!date) {
        return '';
    }

    let newDate = date;
    //  If the passed date is not already a Date object
    if (typeof date === 'string') {
        newDate = createDateObject(date);
    }
    return newDate.toLocaleString(undefined, options);
};

export const formatDateToPublishDateFormat = date => {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return (
        months[date.getMonth()] +
        ' ' +
        String(date.getDate()).padStart(2, '0') +
        ', ' +
        date.getFullYear()
    );
};
