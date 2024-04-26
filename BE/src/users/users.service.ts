import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMockData } from 'src/mockData/user';
import { ProductInCartsMockData } from 'src/mockData/productInCart';
import { BadRequestError } from 'src/utils/error';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.userRepository.create(createUserInput);
    } catch (error) {
      if (error.code === 'P2002' && error.meta.target.includes('email')) {
        throw new BadRequestError('Email already exists');
      }
      throw error;
    }
  }

  findAll() {
    return UserMockData;
  }

  findOne(id: string) {
    return UserMockData.find((user) => user.id === id);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  getUserCart(id: string) {
    const products = [];

    ProductInCartsMockData.forEach((product) => {
      if (product.userId === id) {
        products.push(product);
      }
    });
    return products;
  }
}
