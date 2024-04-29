import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserRegisterInput } from './dto/create-user.input';
import { DBError } from 'src/utils/error';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userRegisterInput: UserRegisterInput, salt: string) {
    const { name, email, password } = userRegisterInput;
    return await this.databaseService.user.create({
      data: { name, email, password, salt },
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { email } });
  }

  async findOneById(id: number): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { id } });
  }

  async createNewRefreshToken(
    refreshToken: string,
    userId: number,
    expired: number,
  ): Promise<any> {
    return await this.databaseService.refreshToken.create({
      data: { userId, refreshToken, expired },
    });
  }

  async deleteRefreshToken(userId: number) {
    return await this.databaseService.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async updateOne(id: number, updateInfo: any) {
    try {
      return await this.databaseService.user.update({
        where: { id },
        data: updateInfo,
      });
    } catch (error) {
      console.error(error.message);
      throw new DBError(error.message);
    }
  }
}
