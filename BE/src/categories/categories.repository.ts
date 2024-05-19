import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { DatabaseService } from 'src/database/database.service';
import { CATEGORY_TYPE } from 'src/utils/const';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createdBy: string, createCategoryInput: CreateCategoryInput) {
    const { name, description, type, parentId } = createCategoryInput;

    return this.databaseService.category.create({
      data: { name, description, type, createdBy, parentId },
    });
  }

  findMany(type: CATEGORY_TYPE, parentId: string) {
    return this.databaseService.category.findMany({
      where: { type: type, parentId: parentId, status: true },
    });
  }

  findOne(id: string) {
    return this.databaseService.category.findFirst({
      where: { id: id, status: true },
    });
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const result = await this.databaseService.category.update({
      where: { id: id },
      data: updateCategoryInput,
    });

    return result ? true : false;
  }
}
