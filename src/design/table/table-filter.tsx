/** @jsxImportSource @emotion/react */
import { FC, useCallback, useState } from 'react';
import { Button } from '../button';
import { FilterIcon } from '../icon';
import { FilterOptionsState, TableFilterProps } from './interface';
import { isNumber } from '../system';
import { FiltersEditor } from './filters-editor';
import { Trigger } from '../trigger';
import { ColumnFilter } from '@tanstack/react-table';
import React from 'react';

const getFilter = (filterOption: FilterOptionsState) => {
  return filterOption.filter((item) => {
    if (item.filterFn === 'notEmpty' || item.filterFn === 'empty') {
      return item.id.length;
    }
    return item.id.length && item.value;
  });
};

export const TableFilter: FC<TableFilterProps> = (props) => {
  const { filterOperator, filterOption, columnsOption, onChange, colorScheme } = props;

  const [operator, setOperator] = useState(filterOperator);
  const [filters, setFilters] = useState(filterOption);

  const addOrUpdateFilters = (index?: number, filter?: ColumnFilter) => {
    setFilters((prev) => {
      const filters = [...prev];
      if (filters) {
        if (isNumber(index) && filter && index < filters.length) {
          filters[index] = filter;
        } else {
          filters.push({ id: '', value: '' });
        }
      }
      return filters;
    });
  };

  const removeFilters = useCallback((index: number, id: string) => {
    setFilters((prev) => {
      const filters = [...prev];
      if (filters) {
        filters.splice(index, 1);
        if (filters.length == 0) {
          filters.push({ id: '', value: '' });
        }
      }
      return filters;
    });
  }, []);

  const onVisibleChange = useCallback(
    (visible: boolean) => {
      if (!visible) {
        const columnFilters = getFilter(filters);
        onChange(columnFilters, operator);
      }
    },
    [onChange, filters, operator],
  );

  return (
    <Trigger
      maxW="unset"
      withoutPadding
      showArrow={false}
      closeWhenScroll={false}
      colorScheme={'white'}
      position={'bottom-end'}
      trigger={'click'}
      onVisibleChange={onVisibleChange}
      content={
        <FiltersEditor
          colorScheme={colorScheme}
          filterOperator={operator}
          columnFilters={filters}
          columnsOption={columnsOption}
          onChange={(index, filters) => {
            addOrUpdateFilters(index, filters);
          }}
          onChangeOperator={setOperator}
          onAdd={addOrUpdateFilters}
          onDelete={(index, filters) => {
            removeFilters(index, filters.id);
          }}
        />
      }
    >
      <Button variant={'text'} colorScheme={'grayBlue'} leftIcon={<FilterIcon size={'16px'} />} />
    </Trigger>
  );
};

TableFilter.displayName = 'TableFilter';
