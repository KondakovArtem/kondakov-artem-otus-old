export const NAV_STATE_KEY = 'navState';
export const NAV_STATE_VERSION = 'navVersion';

// Non Authorized Access
export type TNavAlias = string;
export const AUTH_STACK: TNavAlias = 'authStack';
export const LOGIN_SCREEN: TNavAlias = 'loginScreen';
export const SIGN_UP_SCREEN: TNavAlias = 'signUpScreen';
export const LOADING_SCREEN: TNavAlias = 'loadingScreen';

// Authorized Access
export const EMAIL_VERIFICATION: TNavAlias = 'emailVerification';
export const APP_STACK: TNavAlias = 'appStack';
export const TAB_STACK: TNavAlias = 'appTabs';
export const USER_PROFILE_SCREEN: TNavAlias = 'settings';
export const USER_PROFILE_EDIT_SCREEN: TNavAlias = 'editSettings';
export const MAIN_SCREEN: TNavAlias = 'main';
export const EXPLORE_SCREEN: TNavAlias = 'explore';
export const NEW_POST_SCREEN: TNavAlias = 'newPost';
export const FOLLOW_SCREEN: TNavAlias = 'follows';
export const USER_INFO_SCREEN: TNavAlias = 'userInfo';
export const ABOUT_SCREEN: TNavAlias = 'about';

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
  NEW_POST_SCREEN,
  LOADING_SCREEN,
  FOLLOW_SCREEN,
  ABOUT_SCREEN,
];

// Окна приложения
export const AppNavAliases: TNavAlias[] = [
  AUTH_STACK,
  USER_PROFILE_SCREEN,
  USER_INFO_SCREEN,
  USER_PROFILE_EDIT_SCREEN,
  MAIN_SCREEN,
  EXPLORE_SCREEN,
  TAB_STACK,
  NEW_POST_SCREEN,
  FOLLOW_SCREEN,
  ABOUT_SCREEN,
];
// Окна требующие авторизации пользователя
export const AuthNavAliases: TNavAlias[] = [...AppNavAliases, EMAIL_VERIFICATION, ABOUT_SCREEN];
