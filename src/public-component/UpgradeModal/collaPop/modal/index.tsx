/** @jsxImportSource @emotion/react */
import { getCurrentTeamInfo, getPlanUtils } from '../../../UserData';
import { canManagePayment } from '../../../UserRoleUtils';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMessage } from '../../../../design/react';
import { CollarModal } from '../../component/CollarModal';
import { OPERATION_NO_PERMISSION } from '../constants';
import { ModalShowProps } from './interface';
import { modalStore } from './store';
import React from 'react';

export const UpgradeCollarModal: FC = () => {
  const [modal, setModal] = useState<ModalShowProps | null>(null);
  const currentTeamInfo: any = useSelector(getCurrentTeamInfo);
  const message = useMessage();
  const { t } = useTranslation();
  const canManageThisCollar: any = canManagePayment(currentTeamInfo?.myRole, getPlanUtils(currentTeamInfo));

  useEffect(() => {
    const listener = modalStore.subscribe(() => {
      setModal(modalStore.getModal());
    });
    return () => {
      modalStore.unSubscribe(listener.listenerId);
    };
  }, []);

  const collarModal = useMemo(() => {
    if (!modal) return null;
    if (!currentTeamInfo || !canManageThisCollar) {
      message.info({
        content: t(OPERATION_NO_PERMISSION[modal.modalType]),
      });
      modalStore.remove();
      return null;
    }
    return (
      <CollarModal
        modalType={modal.modalType}
        visible={modal.visible}
        from={modal.from}
        onCancel={() => {
          if (modal.id) {
            modalStore.update({ ...modal, visible: false });
          }
        }}
        afterClose={() => modalStore.remove()}
      />
    );
  }, [canManageThisCollar, currentTeamInfo, message, modal, t]);

  return <>{collarModal}</>;
};

UpgradeCollarModal.displayName = 'UpgradeCollarModal';
