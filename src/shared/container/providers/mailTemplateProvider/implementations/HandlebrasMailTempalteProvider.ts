import handlebars from 'handlebars';
import IParseMailTemplateDTO from "../dto/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlebrasMailTempalteProvider implements IMailTemplateProvider {

  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }

}

export default HandlebrasMailTempalteProvider;
