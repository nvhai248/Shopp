import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserInput: CreateUserInput) {
    return await this.databaseService.user.create({
      data: {
        name: createUserInput.name,
        email: createUserInput.email,
        birthDate: null,
        address: null,
        avatar: null,
        password: createUserInput.password,
        salt: '',
      },
    });

    PrismaClient
  }
}
