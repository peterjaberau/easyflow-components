import { SerializedStyles, css } from '@emotion/react';
import { globalColor, illaPrefix } from '../../design/react';

export const textLinkStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-techPurple-03`)};
  cursor: pointer;
`;
