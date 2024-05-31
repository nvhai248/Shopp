import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { PagingOrderInput } from './dto/paging-order.input';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrderInput: CreateOrderInput, ownerId: string) {
    try {
      const {
        contactId,
        promotionId,
        isPaid,
        totalPrice,
        reducePrice,
        paymentMethod,
        items,
      } = createOrderInput;

      return await this.databaseService.$transaction(async (transaction) => {
        const order = await transaction.order.create({
          data: {
            contactId,
            promotionId,
            isPaid,
            totalPrice,
            reducePrice,
            ownerId: ownerId,
            paymentMethod,
          },
        });

        // Create order items
        for (let item of items) {
          await transaction.productOrder.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          });
        }

        return order;
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findMany(conditions: PagingOrderInput, ownerId: string = undefined) {
    try {
      const offset =
        conditions.limit && conditions.page
          ? (conditions.page - 1) * conditions.limit
          : 0;

      let where = {};
      if (ownerId) {
        where = { ownerId: ownerId };
      }

      const orders = await this.databaseService.order.findMany({
        skip: offset,
        take: conditions.limit,
        orderBy: { updatedAt: 'desc' },
        where: where,
      });

      const count = await this.databaseService.order.count({
        skip: offset,
        take: conditions.limit,
        orderBy: { updatedAt: 'desc' },
        where: where,
      });

      return {
        limit: conditions.limit,
        page: conditions.page,
        total: count,
        data: orders,
      };
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.databaseService.order.findFirst({ where: { id: id } });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    try {
      const isOk = await this.databaseService.order.update({
        where: { id: id },
        data: updateOrderInput,
      });

      return isOk ? true : false;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  findItems(orderId: string) {
    try {
      return this.databaseService.productOrder.findMany({
        where: { orderId: orderId },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
