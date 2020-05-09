import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplatesProvider
  implements IMailTemplateProvider {
  // code
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
