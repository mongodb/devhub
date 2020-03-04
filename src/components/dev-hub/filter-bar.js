import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { H3 } from './text';
import Select from './select';
import { screenSize, size } from './theme';

// Zip array of objects into array of 2-element arrays to populate Select forms
// Replace key with label text, if defined (e.g. nodejs => Node.js)
const zipFilterObjects = (
    filterObject,
    includeCount = true,
    findCount = x => x.count
) => [
    ['all', 'All'],
    ...Object.keys(filterObject).map(p => [
        p,
        `${p} ${includeCount ? `(${findCount(filterObject[p])})` : ''}`,
    ]),
];

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
    min-width: 250px;
    @media ${screenSize.upToMedium} {
        margin: ${size.small} 0;
    }
`;

export default React.memo(
    ({ heading = 'All Articles', filters, filterValue, setFilterValue }) => {
        const initialLanguages = useMemo(
            () => zipFilterObjects(filters.languages),
            [filters.languages]
        );
        const initialProducts = useMemo(
            () => zipFilterObjects(filters.products),
            [filters.products]
        );
        const [languages, setLanguages] = useState(initialLanguages);
        const [products, setProducts] = useState(initialProducts);
        // Update filter values when changed
        useEffect(() => {
            const hasProductFilter =
                filterValue.products && filterValue.products !== 'all';
            const hasLanguageFilter =
                filterValue.languages && filterValue.languages !== 'all';
            if (hasProductFilter) {
                // Filter only languages which have an article in common with the selected product
                const langs = filters.products[filterValue.products].languages;
                setLanguages(
                    // Don't include counts if both filters are applied
                    zipFilterObjects(langs, !hasLanguageFilter, l => l)
                );
            } else {
                setLanguages(initialLanguages);
            }
            if (hasLanguageFilter) {
                // Filter only products which have an article in common with the selected language
                const products =
                    filters.languages[filterValue.languages].products;
                setProducts(
                    zipFilterObjects(products, !hasProductFilter, p => p)
                );
            } else {
                setProducts(initialProducts);
            }
        }, [
            filterValue,
            filters.languages,
            filters.products,
            initialLanguages,
            initialProducts,
        ]);
        const handleChange = (value, type) => {
            // only update if the filter value has changed
            if (filterValue[type]) {
                filterValue[type] !== value &&
                    setFilterValue({ ...filterValue, [type]: value });
            } else {
                setFilterValue({ ...filterValue, [type]: value });
            }
        };
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
                            value={filterValue.products}
                            onChange={e => handleChange(e, 'products')}
                        ></Select>
                    </SelectWrapper>
                    <SelectWrapper>
                        <Select
                            narrow
                            name="language"
                            choices={languages}
                            defaultText="Language"
                            value={filterValue.languages}
                            onChange={e => handleChange(e, 'languages')}
                        ></Select>
                    </SelectWrapper>
                </ResponsiveFlexContainer>
            </FilterBar>
        );
    }
);
