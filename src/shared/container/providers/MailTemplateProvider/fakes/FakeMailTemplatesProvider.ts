import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplatesProvider
  implements IMailTemplateProvider {
  // code
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
