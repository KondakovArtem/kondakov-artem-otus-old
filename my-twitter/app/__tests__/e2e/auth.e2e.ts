import wd from 'wd';
import WdAndroid from 'wd-android';
import * as wdio from 'webdriverio';
import {BrowserObject} from 'webdriverio';

const path = require('path');

const wdAndroid = new WdAndroid(wd, 'com.mytwitter');

/* selenium webdriver client for node
 */

/* default timeout
 */
/* localhost because we run Appium server from our machine + port
 */
const URL = 'localhost';
const PORT = 4723;
/* creates webdriver object
 */
// const driver = wdAndroid.promiseChainRemote(URL, PORT);

/* Вожможности сервера.
 * инструкция для сервера Appium,
 * как запускать тесты, другими словами настройки.
 */

const capabilities = {
  platformName: 'Android', // или Android
  platformVersion: '9', // версия ОС
  deviceName: 'Android Emulator', // или “Android Emulator” или точное название устройства
  automationName: 'UIAutomator2', // фреймворк платформы (UIAutomator2 для Android)
  app: path.resolve(__dirname, '../../android/app/build/outputs/apk/debug/app-debug.apk'), // расположение файла .app (для Android это .apk)
};

const opts = {
  port: PORT,
  capabilities,
};

let driver: BrowserObject;

async function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

/* Jest, делаем что хотим, что позволяет Appium!
 * в данном примере мы проверяем, соответствует ли текст
 * 'topLabel' и 'subLabel' заданному
 * Рекомендую ознакомиться с документацией на сайте Appium
 */
describe('Home Screen landing', () => {
  beforeAll(async () => {
    try {
      // до того, как запустить тест
      console.log('################ initing driver');
      driver = await wdio.remote(opts);
    } catch (err) {
      console.log(err); // если что, мы хотим знать, что не так
    }
  }, 25000);

  afterAll(async () => {
    try {
      //await driver.quit(); // конец сессии
    } catch (err) {
      console.error(err);
    }
  });

  test('render search screen', async () => {
    console.log('################ run test');
    await delay(4000);

    const emailField = await driver.$('~email');
    await emailField.click();
    await delay(100);
    expect(await driver.isKeyboardShown()).toBe(true);
    await emailField.setValue('akondakov@diasoft.ru');

    const passwordField = await driver.$('~password');
    await passwordField.click();
    expect(await driver.isKeyboardShown()).toBe(true);
    await passwordField.setValue('12qwaszx');

    await driver.touchAction([
      {action: 'press', x: 540, y: 360},
      {action: 'wait', ms: 500},
      {action: 'moveTo', x: 540, y: 0},
      {action: 'release'},
    ]);

    await driver.hideKeyboard();
    await delay(1000);
    const loginButton = await driver.$('~signInButton');
    expect(await loginButton.isDisplayed()).toBe(true);

    await tapOnElement(loginButton);
    await tapOnElement(loginButton);
    await delay(10000);

    // signUpLink.click();
    // let subLabel = await driver.elementById('subLabel');
    // expect(await signUpLink.text()).toBe('Sign Up');
    //expect(await subLabel.text()).toBe('главный экран');
  }, 60000);
});

async function tapOnElement(element: wdio.Element) {
  const pos = await element.getLocation();
  console.log('location = ', pos);
  const size = await element.getSize();
  console.log('position = ', pos, 'size=', size);
  const tap = {x: pos.x + size.width / 2, y: pos.y + size.height / 2};
  console.log('position = ', pos, 'size=', size, 'tap=', tap);
  await driver.touchAction([{action: 'press', ...tap}, {action: 'wait', ms: 100}, {action: 'release'}]);
}
