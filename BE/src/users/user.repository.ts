import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserRegisterInput } from './dto/create-user.input';
@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userRegisterInput: UserRegisterInput, salt: string) {
    return await this.databaseService.user.create({
      data: {
        name: userRegisterInput.name,
        email: userRegisterInput.email,
        birthDate: null,
        address: null,
        avatar: null,
        password: userRegisterInput.password,
        salt: salt,
      },
    });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.databaseService.user.findFirst({
      where: { email: email },
    });
  }

  async findOneById(id: number): Promise<any> {
    return await this.databaseService.user.findFirst({
      where: { id: id },
    });
  }
}
