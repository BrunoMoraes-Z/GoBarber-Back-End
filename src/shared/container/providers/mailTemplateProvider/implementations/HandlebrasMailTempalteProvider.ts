import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from "../dto/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class HandlebrasMailTempalteProvider implements IMailTemplateProvider {

  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const content = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(content);
    return parseTemplate(variables);
  }

}

export default HandlebrasMailTempalteProvider;
