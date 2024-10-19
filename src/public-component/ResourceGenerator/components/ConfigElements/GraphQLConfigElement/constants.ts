import { GraphQLAuthType, GraphQLAuthValue } from '../../../../publicTypes';

export const GraphQLAuthTypeSelect = [
  {
    label: GraphQLAuthType.NONE,
    value: GraphQLAuthValue.NONE,
  },
  {
    label: GraphQLAuthType.BASIC,
    value: GraphQLAuthValue.BASIC,
  },
  {
    label: GraphQLAuthType.BEARER,
    value: GraphQLAuthValue.BEARER,
  },
  {
    label: GraphQLAuthType.APIKEY,
    value: GraphQLAuthValue.APIKEY,
  },
];
