import { StylisPlugin } from '@emotion/cache';
import { DECLARATION } from 'stylis';

export type Px2RemOptions = {
  unit?: string;
  remSize?: number;
  allowList?: string[];
  blockList?: string[];
};

const px2Unit = (unit: string) => {
  const regText = `"[^"]+"|'[^']+'|url\\([^)]+\\)|(\\d*\\.?\\d+)${unit}`;
  return new RegExp(regText, 'g');
};

export const px2Rem: (options?: Px2RemOptions) => StylisPlugin =
  ({ unit = 'px', remSize = 16, allowList, blockList } = {}) =>
  (element) => {
    if (element.type === DECLARATION) {
      const unitRegexp = px2Unit(unit);
      const matchUnit = element.value?.match(unitRegexp);
      if (matchUnit) {
        if (typeof element.props === 'string') {
          if (allowList && !allowList.includes(element.props)) return;
          if (blockList && blockList.includes(element.props)) return;
        }

        if (typeof element.children === 'string') {
          const expression = element.children.replace(unitRegexp, (match, group) =>
            group ? Number(group) / remSize + 'rem' : match,
          );
          element.return = element.props + ':' + expression + ';';
        }
      }
    }
  };
