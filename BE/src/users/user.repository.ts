import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserRegisterInput } from './dto/createUser.input';
import { MyDBException } from 'src/utils/error';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async find() {
    return await this.databaseService.user.findMany();
  }

  async create(userRegisterInput: UserRegisterInput, salt: string) {
    const { firstName, lastName, email, password } = userRegisterInput;
    return await this.databaseService.user.create({
      data: { firstName, lastName, email, password, salt },
      
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

  async deleteRefreshToken(userId: number, refreshToken: string) {
    return await this.databaseService.refreshToken.deleteMany({
      where: { userId: userId, refreshToken: refreshToken },
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
      throw new MyDBException(error.message);
    }
  }

  async findRefreshToken(refreshToken: string, userId: number) {
    return await this.databaseService.refreshToken.findFirst({
      where: { refreshToken: refreshToken, userId: userId },
    });
  }

  async findOneByGoogleId(googleId: any) {
    return await this.databaseService.user.findFirst({
      where: { googleId: googleId },
    });
  }

  async createByOauth(userData: any) {
    return await this.databaseService.user.create({
      data: userData,
    });
  }
}
