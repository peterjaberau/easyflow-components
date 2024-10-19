/** @jsxImportSource @emotion/react */
import { Agent } from '../../../../../../publicTypes';
import { getCurrentId } from '../../../../../../UserData';
import { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { fetchTeamAgentListByPage } from '../../../../../service';
import { AGENT_LIST_HEIGHT, TEAM_AGENT_ITEM_HEIGHT } from '../../constants';
import { ListEmptyState } from '../ListEmptyState';
import { TeamListItem } from '../TeamListItem';
import { TeamAgentListProps } from './interface';
import React from 'react';

export const TeamAgentList: FC<TeamAgentListProps> = (props) => {
  const { onSelect, search = '' } = props;
  const [teamList, setTeamList] = useState<Agent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);

  const currentTeamId = useSelector(getCurrentId)!;

  const loadMoreItems = useCallback(async () => {
    setIsNextPageLoading(true);
    const result = await fetchTeamAgentListByPage(currentTeamId, currentPage, search);
    setCurrentPage((prev) => prev + 1);
    setIsNextPageLoading(false);
    setHasNextPage(result.data.totalPages > currentPage);
    setTeamList((prev) => prev.concat(result.data.aiAgentList));
  }, [currentPage, currentTeamId, search]);

  const itemCount = hasNextPage ? teamList.length + 1 : teamList.length;

  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={isNextPageLoading ? () => {} : loadMoreItems}
      isItemLoaded={(index) => {
        return !hasNextPage || index < teamList.length;
      }}
    >
      {({ onItemsRendered, ref }) =>
        itemCount === 0 ? (
          <ListEmptyState />
        ) : (
          <FixedSizeList
            height={AGENT_LIST_HEIGHT}
            width="100%"
            itemCount={itemCount}
            itemData={teamList}
            itemSize={TEAM_AGENT_ITEM_HEIGHT}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {(props: ListChildComponentProps<Agent[]>) => {
              const { index, style, data } = props;
              if (!Array.isArray(data) || data.length === 0 || index >= data.length) return null;
              return <TeamListItem item={data[index]} style={style} onSelected={onSelect} />;
            }}
          </FixedSizeList>
        )
      }
    </InfiniteLoader>
  );
};
