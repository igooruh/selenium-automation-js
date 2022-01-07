const { Builder, By, Key } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const fs = require("fs");

async function test() {
  const service = new firefox.ServiceBuilder('./node_modules/geckodriver/bin/geckodriver')

  let driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxService(service)
    .build();

  try {
    fs.mkdirSync('./screenShot')
  } catch(err) {
    if(err.code !== 'EEXIST') console.error(err)
  }

  try {

    await driver.get("https://www.google.com");

    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);

    const url = await driver.getCurrentUrl()

    await driver.get(`${url}search?q=Selenium`)

    await driver.takeScreenshot().then((image) => {
      fs.writeFileSync("./screenShot/searchSelenium.png", image, "base64");
    });

   /*  await driver.get("https://www.facebook.com");
    await driver.takeScreenshot().then((image) => {
      fs.writeFileSync("./screenShot/facebook.png", image, "base64");
    }); */
  } finally {
    await driver.quit();
  }
}

test();

