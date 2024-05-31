import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { PromotionsModule } from 'src/promotions/promotions.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersController } from './orders.controller';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  providers: [OrdersResolver, OrdersService],
  imports: [PromotionsModule, ProductsModule, ContactsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
