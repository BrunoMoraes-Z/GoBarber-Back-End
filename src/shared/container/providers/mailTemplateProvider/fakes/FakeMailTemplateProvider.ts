import IParseMailTemplateDTO from "../dto/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }

}

export default FakeMailTemplateProvider;
