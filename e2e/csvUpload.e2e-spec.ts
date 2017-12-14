import { CommonChartPage } from './pages/common-chart.po';
import { Header } from './pages/components/header.e2e-component';
import * as fs from 'fs';
import { $, $$ } from 'protractor';
import { disableAnimations } from './helpers/helper';

const header: Header = new Header();
const commonChartPage: CommonChartPage = new CommonChartPage();

describe('Upload CSV: ', () => {
  const positiveFilePath = './e2e/additional_files/positive/';
  const negativeFilePath = './e2e/additional_files/negative/';
  let positiveFilesToUpload = fs.readdirSync(positiveFilePath);
  let negativeFilesToUpload = fs.readdirSync(negativeFilePath);

  beforeEach(async () => {
    await disableAnimations();
  });

  afterEach(async () => {
    await commonChartPage.closeTab();
  });

  for (let fileToUpload of positiveFilesToUpload) {
    it(`Positive: ${fileToUpload}`, async () => {
      const absolutePath = fs.realpathSync(positiveFilePath + fileToUpload);

      await header.uploadCsv(absolutePath, fileToUpload);

      await expect($$('.vzb-bc-entity').first().isDisplayed()).toBeTruthy();
    });
  }

  for (let fileToUpload of negativeFilesToUpload) {
    it(`Negative: ${fileToUpload}`, async () => {
      const absolutePath = fs.realpathSync(negativeFilePath + fileToUpload);

      await header.uploadCsv(absolutePath, fileToUpload);

      await expect($('.vzb-placeholder.vzb-error').isDisplayed()).toBeTruthy();
    });
  }

});