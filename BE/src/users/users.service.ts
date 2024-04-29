import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMockData } from 'src/mockData/user';
import { ProductInCartsMockData } from 'src/mockData/productInCart';
import { DBError } from 'src/utils/error';
import { UserRepository } from './user.repository';
import { unmaskId } from 'src/utils/mask';
import { DB_TYPES } from 'src/utils/const';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return UserMockData;
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneById(
        typeof id == 'number' ? id : unmaskId(id, DB_TYPES.USER),
      );

      if (!user) {
        throw new DBError('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
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

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.userRepository.updateOne(id, updateUserInput);
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
