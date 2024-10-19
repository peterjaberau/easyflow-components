/** @jsxImportSource @emotion/react */
import { LayoutAutoChange } from '../../LayoutAutoChange';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { UserLayout } from '../layout/desktopLayout';
import { MobileUserLayout } from '../layout/mobileLayout';
import { LoginFields, LoginPageProps } from './interface';
import { MobileLogin } from './mobile';
import { PCLogin } from './pc';
import React from 'react';

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { email } = useParams();
  const [searchParams] = useSearchParams();

  const formProps = useForm<LoginFields>({
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    defaultValues: {
      email: email ?? searchParams.get('email') ?? '',
    },
  });

  return (
    <FormProvider {...formProps}>
      <LayoutAutoChange
        desktopPage={
          <UserLayout>
            <PCLogin {...props} lockedEmail={email ?? searchParams.get('email') ?? ''} />
          </UserLayout>
        }
        mobilePage={
          <MobileUserLayout>
            <MobileLogin {...props} lockedEmail={email ?? searchParams.get('email') ?? ''} />
          </MobileUserLayout>
        }
      />
    </FormProvider>
  );
};
