import React, { /* useEffect, */ useState } from 'react';
import styled from '@emotion/styled';
import { H3 } from './text';
import Select from './select';
import { screenSize, size } from './theme';
// import { callStitchFunction } from '../utils/stitch';
// import { useSiteMetadata } from '../hooks/use-site-metadata';
// import { devhubMapping } from '../../constants';

// Zip array of objects into array of 2-element arrays to populate Select forms
// Replace key with label text, if defined (e.g. nodejs => Node.js)
// const zipObjects = arr =>
//     arr.map(({ _id, count }) => {
//         const label = devhubMapping[_id] || _id;
//         return [_id, `${label} (${count})`];
//     });

const ResponsiveFlexContainer = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const FilterBar = styled('div')`
    align-items: center;
    display: flex;
    h3 {
        flex: 2;
    }
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;

const FilterLabel = styled('span')`
    flex: 0 0 85px;
`;

const SelectWrapper = styled('div')`
    margin: 0 ${size.small};
    @media ${screenSize.upToMedium} {
        margin: ${size.small} 0;
    }
`;

export default ({ heading = 'All Articles' }) => {
    // const metadata = useSiteMetadata();
    const [languages] = useState([]);
    const [products] = useState([]);

    // useEffect(() => {
    //     if (languages.length === 0) {
    //         callStitch('languages', setLanguages);
    //     }

    //     if (products.length === 0) {
    //         callStitch('products', setProducts);
    //     }
    // }, [callStitch, languages.length, products.length]);

    // Populate forms by fetching all values associated with given key
    // Returns array of {_id: 'Name', count: X} objects in descending count order
    // These objects are then zipped into an array of arrays
    // const callStitch = async (key, callback) => {
    //     const res = await callStitchFunction('getValuesByKey', metadata, [key]);
    //     callback(zipObjects(res));
    // };

    return (
        <FilterBar>
            <H3>{heading}</H3>
            <ResponsiveFlexContainer>
                <FilterLabel>Filter By</FilterLabel>
                <SelectWrapper>
                    <Select
                        narrow
                        name="product"
                        choices={products}
                        defaultText="Product"
                    ></Select>
                </SelectWrapper>
                <SelectWrapper>
                    <Select
                        narrow
                        name="language"
                        choices={languages}
                        defaultText="Language"
                    ></Select>
                </SelectWrapper>
            </ResponsiveFlexContainer>
        </FilterBar>
    );
};
