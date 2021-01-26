import IParseMailTemplateDTO from "../dto/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
  parse(date: IParseMailTemplateDTO): Promise<string>;
}
