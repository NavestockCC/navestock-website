import { NavestockWebsitePage } from './app.po';

describe('navestock-website App', () => {
  let page: NavestockWebsitePage;

  beforeEach(() => {
    page = new NavestockWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
