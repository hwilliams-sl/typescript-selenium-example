import { WebElementPromise, Browser, Page, findBy } from '../../lib';
import { ShowIdeaPage, GoogleSignInPage } from './';
import config from '../config';

export class HomePage extends Page {
  constructor(browser: Browser) {
    super(browser);
    this.setUrl(`${config.baseUrl}/`);
  }

  @findBy('#new-idea-input')
  public IdeaTitle: WebElementPromise;

  @findBy('.ui.form textarea')
  public IdeaDescription: WebElementPromise;

  @findBy('.ui.button.primary')
  public SubmitIdea: WebElementPromise;

  @findBy('.signin')
  public UserMenu: WebElementPromise;

  @findBy('.fdr-profile-popup .button.google')
  public GoogleSignIn: WebElementPromise;

  public async waitForLoad(): Promise<void> {
    await this.browser.waitUntilIsVisible(() => this.IdeaTitle);
  }

  public async getUserName(): Promise<string> {
    return await this.UserMenu.getText();
  }

  public async submitNewIdea(): Promise<void> {
    await this.SubmitIdea.click();
    await this.browser.waitForPage(ShowIdeaPage);
  }

  public async clickAtSignInWithGoogle(): Promise<void> {
    await this.UserMenu.click();
    await this.browser.waitUntilIsVisible(() => this.GoogleSignIn);
    await this.GoogleSignIn.click();
    await this.browser.waitForPage(GoogleSignInPage);
  }
}
