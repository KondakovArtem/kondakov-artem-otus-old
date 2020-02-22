import {BrowserObject} from 'webdriverio';
import {
  initDriver,
  delay,
  tapOnElement,
  fillValueToField,
  getFieldValue,
  longTapOnElement,
  findIndexElementByText,
} from './utils';
import {toNumber} from 'lodash-es';

let driver: BrowserObject;
let firstInited = false;
const DEFAULT_TIMEOUT = 60000;

const authProcess = async () => {
  const loginScreen = await driver.$('~loginScreen');
  await loginScreen.waitForExist(10000);

  await fillValueToField(driver, 'username', 'akondakov@diasoft.ru');
  await fillValueToField(driver, 'password', '12qwaszx');

  await driver.touchAction([
    {action: 'press', x: 540, y: 360},
    {action: 'wait', ms: 500},
    {action: 'moveTo', x: 540, y: 0},
    {action: 'release'},
  ]);

  await delay(1000);

  // почему-то один раз не срабатывает
  await tapOnElement(driver, 'loginButton');
  await tapOnElement(driver, 'loginButton');
  await delay(3000);

  const mainScreen = await driver.$('~mainScreen');
  await mainScreen.waitForExist(5000);
  return await mainScreen.isExisting();
};

describe('Guest App', () => {
  beforeAll(async () => {
    try {
      // до того, как запустить тест
      driver = await initDriver();
    } catch (err) {
      console.log(err); // если что, мы хотим знать, что не так
    }
  }, 60000);

  afterAll(async () => {
    try {
      //await driver.quit(); // конец сессии
    } catch (err) {
      console.error(err);
    }
  });

  beforeEach(async () => {
    if (!firstInited) {
      firstInited = true;
      return;
    }
    await driver.closeApp();
    await (driver as any).launchApp();
  }, 10000);

  test('auth process', async () => {
    expect(await authProcess()).toBe(true);
  }, 60000);

  test(
    'add new 3 guests',
    async () => {
      expect(await authProcess()).toBe(true);

      const names = [];

      for (let i = 0; i < 3; i++) {
        const testGuestName = `GuestName_${Math.random()}`;
        names.push(testGuestName);
        await fillValueToField(driver, 'newGuestInput', testGuestName);
        await tapOnElement(driver, 'newGuestButton');
        await delay(1000);
      }
      const guestNameList = await driver.$$(`~guestName`);
      let resCount = 0;
      for (let i = 0; i < guestNameList.length; i++) {
        const text = await guestNameList[i].getText();
        names.includes(text) && resCount++;
      }
      expect(resCount).toBe(3);
    },
    DEFAULT_TIMEOUT,
  );

  test(
    'remove exists guests',
    async () => {
      expect(await authProcess()).toBe(true);
      let guestNameList = await driver.$$(`~removeGuestButton`);

      for (let i = guestNameList.length - 1; i >= 0; i--) {
        await tapOnElement(driver, guestNameList[i]);
        await delay(100);
      }
      guestNameList = await driver.$$(`~removeGuestButton`);
      expect(guestNameList.length).toBe(0);
    },
    DEFAULT_TIMEOUT,
  );

  test(
    'should work with guest',
    async () => {
      expect(await authProcess()).toBe(true);

      const testGuestName = `GuestName_${Math.random()}`;

      await fillValueToField(driver, 'newGuestInput', testGuestName);
      await tapOnElement(driver, 'newGuestButton');
      await delay(300);

      expect(await getFieldValue(driver, 'newGuestInput')).toBe('New guest'); //непонятно почему возвращает placeholder
      let guestNameList = await driver.$$(`~guestName`);

      let foundIndex = await findIndexElementByText(driver, guestNameList, testGuestName);
      expect(foundIndex).toBeDefined();
      await tapOnElement(driver, guestNameList[foundIndex as number]);
      await longTapOnElement(driver, guestNameList[foundIndex as number]);
      const guestEditNameList = await driver.$$('~guestEditName');
      expect(guestEditNameList.length).toBe(1);

      const newTestGuestName = `GuestName_${Math.random()}`;
      await guestEditNameList[0].setValue(newTestGuestName);
      await driver.sendKeyEvent('66');
      await delay(1000);
      guestNameList = await driver.$$(`~guestName`);

      foundIndex = await findIndexElementByText(driver, guestNameList, newTestGuestName);
      expect(foundIndex).toBeDefined();

      const withPartnerList = await driver.$$(`~withPartner`);
      const withPartner = withPartnerList[foundIndex as number];
      const isChecked = await withPartner.getAttribute('checked');

      let originHeaderTitle = await driver.$('~guestCountTitle');
      let headerCount = toNumber((await originHeaderTitle.getText()).replace(/[^0-9.]/g, ''));

      await withPartner.click();
      await delay(1000);
      const expectHeaderCount = isChecked === 'false' ? headerCount + 1 : headerCount - 1;
      originHeaderTitle = await driver.$('~guestCountTitle');
      headerCount = toNumber((await originHeaderTitle.getText()).replace(/[^0-9.]/g, ''));

      expect(headerCount).toBe(expectHeaderCount);

      await delay(10000);
    },
    DEFAULT_TIMEOUT,
  );
});
