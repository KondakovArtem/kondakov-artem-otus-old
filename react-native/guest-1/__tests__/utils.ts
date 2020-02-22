// import wd from 'wd';
// import WdAndroid from 'wd-android';
import * as wdio from 'webdriverio';
import path from 'path';
import {BrowserObject} from 'webdriverio';

// const wdAndroid = new WdAndroid(wd, 'com.mytwitter');

/* selenium webdriver client for node
 */

/* default timeout
 */
/* localhost because we run Appium server from our machine + port
 */
// const URL = 'localhost';
const PORT = 4723;
/* creates webdriver object
 */
// const driver = wdAndroid.promiseChainRemote(URL, PORT);

/* Вожможности сервера.
 * инструкция для сервера Appium,
 * как запускать тесты, другими словами настройки.
 */
const opts = {
  port: PORT,
  capabilities: {
    platformName: 'Android', // или Android
    platformVersion: '10', // версия ОС
    deviceName: 'Android Emulator', // или “Android Emulator” или точное название устройства
    automationName: 'UIAutomator2', // фреймворк платформы (UIAutomator2 для Android)
    app: path.resolve(__dirname, '../../guest-1/android/app/build/outputs/apk/debug/app-debug.apk'), // расположение файла .app (для Android это .apk)
  },
};

/* Jest, делаем что хотим, что позволяет Appium!
 * в данном примере мы проверяем, соответствует ли текст
 * 'topLabel' и 'subLabel' заданному
 * Рекомендую ознакомиться с документацией на сайте Appium
 */

export const initDriver = async () => {
  return await wdio.remote(opts);
};

export const delay = async (time: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export const tapOnElement = async (driver: BrowserObject, key: string | wdio.Element) => {
  let element;
  if (typeof key === 'string') {
    element = await driver.$(`~${key}`);
  } else {
    element = key;
  }
  const pos = await element.getLocation();
  const size = await element.getSize();
  expect(await element.isDisplayed()).toBe(true);
  const tap = {x: pos.x + size.width / 2, y: pos.y + size.height / 2};
  await driver.touchAction([{action: 'press', ...tap}, {action: 'wait', ms: 100}, {action: 'release'}]);
};

export const longTapOnElement = async (driver: BrowserObject, element: wdio.Element) => {
  expect(await element.isDisplayed()).toBe(true);
  await driver.touchPerform([{action: 'longPress', options: {element: element.elementId}}, {action: 'release'}]);
};

export const fillValueToField = async (driver: BrowserObject, key: string, value: string) => {
  const field = await driver.$(`~${key}`);
  await field.click();
  await delay(100);
  expect(await driver.isKeyboardShown()).toBe(true);
  await field.setValue(value);
  await delay(100);
  await driver.hideKeyboard();
  await delay(100);
};

export const getFieldValue = async (driver: BrowserObject, key: string) => {
  const field = await driver.$(`~${key}`);
  expect(await field.isExisting()).toBeDefined();
  return await field.getText();
};

export const findIndexElementByText = async (driver: BrowserObject, elements: wdio.Element[], findText: string) => {
  let foundIndex;
  for (let i = 0; i < elements.length; i++) {
    const guestName = elements[i];
    const text = await guestName.getText();
    if (text === findText) {
      foundIndex = i;
      break;
    }
  }
  return foundIndex;
};
