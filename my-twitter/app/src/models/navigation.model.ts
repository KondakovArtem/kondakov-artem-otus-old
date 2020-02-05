export const NAV_STATE_KEY = 'navState';

// Non Authorized Access
export type TNavAlias = string;
export const AUTH_STACK: TNavAlias = 'authStack';
export const LOGIN_SCREEN: TNavAlias = 'loginScreen';
export const SIGN_UP_SCREEN: TNavAlias = 'signUpScreen';

// Authorized Access
export const EMAIL_VERIFICATION: TNavAlias = 'emailVerification';
export const APP_STACK: TNavAlias = 'appStack';
export const TAB_STACK: TNavAlias = 'appTabs';
export const USER_PROFILE_SCREEN: TNavAlias = 'settings';
export const USER_PROFILE_EDIT_SCREEN: TNavAlias = 'editSettings';

export const MAIN_SCREEN: TNavAlias = 'main';
export const EXPLORE_SCREEN: TNavAlias = 'explore';

export const NavAliases: TNavAlias[] = [
  AUTH_STACK,
  LOGIN_SCREEN,
  SIGN_UP_SCREEN,
  EMAIL_VERIFICATION,
  APP_STACK,
  TAB_STACK,
  USER_PROFILE_SCREEN,
  USER_PROFILE_EDIT_SCREEN,
  MAIN_SCREEN,
  EXPLORE_SCREEN,
];

// Окна приложения
export const AppNavAliases: TNavAlias[] = [
  AUTH_STACK,
  USER_PROFILE_SCREEN,
  USER_PROFILE_EDIT_SCREEN,
  MAIN_SCREEN,
  EXPLORE_SCREEN,
  TAB_STACK,
];
// Окна требующие авторизации пользователя
export const AuthNavAliases: TNavAlias[] = [...AppNavAliases, EMAIL_VERIFICATION];
