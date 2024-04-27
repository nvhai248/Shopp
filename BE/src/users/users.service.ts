import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMockData } from 'src/mockData/user';
import { ProductInCartsMockData } from 'src/mockData/productInCart';
import { DBError } from 'src/utils/error';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return UserMockData;
  }

  findOne(id: string) {
    return UserMockData.find((user) => user.id === id);
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new DBError('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
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
