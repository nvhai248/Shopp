import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async find() {
    return await this.databaseService.user.findMany();
  }

  async create(userRegisterInput: any, salt: string) {
    const { email, password } = userRegisterInput;
    return await this.databaseService.user.create({
      data: { email, password, salt },
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { email } });
  }

  async findAdminOneByEmail(email: string): Promise<any> {
    return await this.databaseService.hShopAdmin.findFirst({
      where: { email },
    });
  }

  async findOneById(id: string): Promise<any> {
    return await this.databaseService.user.findFirst({ where: { id } });
  }

  async findAdminById(id: string): Promise<any> {
    return await this.databaseService.hShopAdmin.findFirst({ where: { id } });
  }

  async createNewRefreshToken(
    refreshToken: string,
    userId: string,
    expired: number,
  ): Promise<any> {
    return await this.databaseService.refreshToken.create({
      data: { userId, refreshToken, expired },
    });
  }

  async deleteRefreshToken(userId: string, refreshToken: string) {
    return await this.databaseService.refreshToken.deleteMany({
      where: { userId: userId, refreshToken: refreshToken },
    });
  }

  async updateOne(id: string, updateInfo: any) {
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

  async findRefreshToken(refreshToken: string, userId: string) {
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
