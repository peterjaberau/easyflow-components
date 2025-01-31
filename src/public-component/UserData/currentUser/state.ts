import { CurrentUserInfo } from '../../publicTypes';

export const CurrentUserInitialState: CurrentUserInfo = {
  userID: '',
  uid: '',
  nickname: '',
  language: '',
  email: '',
  avatar: '',
  isTutorialViewed: false,
  isPasswordSet: false,
  ssoVerified: {
    github: false,
    google: false,
  },
  isNewUser: false,
  haveAppSumoSubscription: false,
  doesAppSumoSubscriptionAppliedToTeam: false,
  createdAt: '',
  updatedAt: '',
};
