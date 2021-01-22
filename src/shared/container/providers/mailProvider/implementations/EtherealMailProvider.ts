import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from "../models/IMailProvider";

interface IMessage {
  to: string,
  body: string
}

class EtherealMailProvider implements IMailProvider {

  private client: Transporter;

  constructor() {

    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      this.client = transporter;
    });

  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "Equipe GoBarder <staff@gobarber.com.br>",
      to,
      subject: "Recuperação de senha",
      text: body
    });
    console.log('message sent: %s', message.messageId);
    console.log('message sent: %s', nodemailer.getTestMessageUrl(message));

  }

}

export default EtherealMailProvider;
