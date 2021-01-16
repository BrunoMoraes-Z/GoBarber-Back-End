import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import { uuid } from "uuidv4";
import UserToken from "../../infra/typeorm/entities/UserToken";

class UsersRepository implements IUserTokenRepository {

  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const user_token = new UserToken();
    Object.assign(user_token, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.userTokens.push(user_token);
    return user_token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user_token = this.userTokens.find(t => t.token === token);
    return user_token;
  }
}

export default UsersRepository;
