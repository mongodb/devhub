import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import Select from './select';
import TextFilterInput from './text-filter-input';
import { screenSize, size } from './theme';
import { LearnPageTabs } from '../../utils/learn-page-tabs';

// Promote Atlas in filters by bringing to top, otherwise sort by count of items
const raiseAtlasAndSortByCount = (getCount, a, b) => {
    if (a.includes('Atlas')) return -1;
    if (b.includes('Atlas')) return 1;
    return getCount(b) - getCount(a);
};

// Zip array of objects into array of 2-element arrays to populate Select forms
// Replace key with label text, if defined (e.g. nodejs => Node.js)
const zipFilterObjects = (filterObject, findCount = x => x.count) => {
    const filterSortFunction = (a, b) =>
        raiseAtlasAndSortByCount(x => findCount(filterObject[x]), a, b);
    return [
        ['all', 'All'],
        ...Object.keys(filterObject)
            .sort(filterSortFunction)
            .map(p => [p, `${p} ${`(${findCount(filterObject[p])})`}`]),
    ];
};

const ResponsiveFlexContainer = styled('div')`
    align-items: center;
    display: flex;
    @media ${screenSize.upToLarge} {
        display: block;
    }
`;

const FilterBar = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    h3 {
        flex: 2;
    }
    @media ${screenSize.upToLarge} {
        display: block;
    }
`;

const FilterLabel = styled('span')`
    flex: 0 0 85px;
`;

const SelectWrapper = styled('div')`
    margin: 0 ${size.small};
    min-width: 250px;
    @media ${screenSize.upToLarge} {
        margin: ${size.small} 0;
    }
`;

export default React.memo(
    ({
        filters,
        filterValue,
        setFilterValue,
        setTextFilterQuery,
        textFilterQuery,
        activeContentTab,
        ...props
    }) => {
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
        const hasProductFilter = useMemo(
            () => filterValue.products && filterValue.products !== 'all',
            [filterValue.products]
        );
        const hasLanguageFilter = useMemo(
            () => filterValue.languages && filterValue.languages !== 'all',
            [filterValue.languages]
        );
        const selectTextFormatting = useMemo(
            () =>
                hasLanguageFilter && hasProductFilter
                    ? x => x.replace(/\(\d*\)/g, '')
                    : null,
            [hasLanguageFilter, hasProductFilter]
        );
        // Update filter values when changed
        useEffect(() => {
            if (hasProductFilter) {
                // Filter only languages which have an article in common with the selected product
                const langs = filters.products[filterValue.products].languages;
                setLanguages(
                    // Don't include counts if both filters are applied
                    zipFilterObjects(langs, l => l)
                );
            } else {
                setLanguages(initialLanguages);
            }
            if (hasLanguageFilter) {
                // Filter only products which have an article in common with the selected language
                const products =
                    filters.languages[filterValue.languages].products;
                setProducts(zipFilterObjects(products, p => p));
            } else {
                setProducts(initialProducts);
            }
        }, [
            filterValue,
            filters.languages,
            filters.products,
            hasLanguageFilter,
            hasProductFilter,
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
        const onTextFilterChange = useCallback(
            e => {
                setTextFilterQuery(e.target.value);
            },
            [setTextFilterQuery]
        );
        const selectEnabled =
            !textFilterQuery &&
            (activeContentTab === LearnPageTabs.all ||
                activeContentTab === LearnPageTabs.articles);
        return (
            <FilterBar data-test="filter-bar" {...props}>
                <TextFilterInput
                    placeholder={`Search ${activeContentTab}`}
                    onChange={onTextFilterChange}
                    value={textFilterQuery}
                />
                <ResponsiveFlexContainer>
                    <FilterLabel>Filter By</FilterLabel>
                    <SelectWrapper>
                        <Select
                            enabled={selectEnabled}
                            narrow
                            name="product"
                            choices={products}
                            defaultText="Product"
                            value={filterValue.products}
                            onChange={e => handleChange(e, 'products')}
                            styleSelectedText={selectTextFormatting}
                        ></Select>
                    </SelectWrapper>
                    <SelectWrapper>
                        <Select
                            enabled={selectEnabled}
                            narrow
                            name="language"
                            choices={languages}
                            defaultText="Language"
                            value={filterValue.languages}
                            onChange={e => handleChange(e, 'languages')}
                            styleSelectedText={selectTextFormatting}
                        ></Select>
                    </SelectWrapper>
                </ResponsiveFlexContainer>
            </FilterBar>
        );
    }
);
