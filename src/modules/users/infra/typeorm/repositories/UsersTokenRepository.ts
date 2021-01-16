import IUserTokenRepository from "@modules/users/repositories/IUserTokenRepository";
import { Repository, getRepository } from "typeorm";
import UserToken from "../entities/UserToken";

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({
      where: { token }
    });
    return user;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const token = this.ormRepository.create({
      user_id
    });
    await this.ormRepository.save(token);
    return token;
  }

}

export default UserTokenRepository;
