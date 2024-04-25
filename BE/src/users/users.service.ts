import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserMockData } from 'src/mockData/user';
import { ProductInCartsMockData } from 'src/mockData/productInCart';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return {
      id: 'stringAtt',
      name: createUserInput.name,
      email: createUserInput.email,
      birthDate: createUserInput.birthDate,
      address: createUserInput.address,
    };
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
