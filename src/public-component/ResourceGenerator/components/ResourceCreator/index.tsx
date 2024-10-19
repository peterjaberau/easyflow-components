/** @jsxImportSource @emotion/react */
import { ResourceType } from '../../../publicTypes';
import { FC, Suspense, useCallback, useContext } from 'react';
import { ResourceGeneratorContext } from '../../provider';
import { ResourceCreatePanel } from '../ResourceCreatePanel';
import { ResourceCreatorProps } from './interface';
import React from 'react';

export const ResourceCreator: FC<ResourceCreatorProps> = (props) => {
  const { resourceType, resourceID, onBack } = props;

  const { getResourceByID } = useContext(ResourceGeneratorContext);

  const resource = getResourceByID(resourceID);
  const finalResourceType = resource ? resource.resourceType : resourceType;
  const handleBack = useCallback(() => onBack('select'), [onBack]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourceCreatePanel
        resourceID={resourceID}
        resourceType={finalResourceType as ResourceType}
        handleOnClickBack={handleBack}
      />
    </Suspense>
  );
};
