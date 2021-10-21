import { formatDateToPublishDateFormat } from '../../src/utils/format-dates';

it('should properly format the date to Mmm dd, yyyy format', () => {
    expect(
        formatDateToPublishDateFormat(
            new Date('Wed, 07 Oct 2020 10:00:00 +0000')
        )
    ).toEqual('Oct 07, 2020');
});
