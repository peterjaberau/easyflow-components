import { publicHashtagRequest } from '../../ILLANet';
import { FuzzySearchHashTag } from './interface';

export const fetchFuzzySearchHashTag = (keyword: string) => {
  return publicHashtagRequest<FuzzySearchHashTag>({
    method: 'GET',
    url: `/search?keyword=${keyword}`,
  });
};
