import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CATEGORY_TYPE } from 'src/utils/const';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';

@Injectable()
export class PublishersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createdBy: string, createPublisherInput: CreatePublisherInput) {
    const { name, description, avatar } = createPublisherInput;

    return this.databaseService.publisher.create({
      data: { name, description, avatar, createdBy },
    });
  }

  findMany() {
    return this.databaseService.publisher.findMany({
      where: { status: true },
    });
  }

  findOne(id: string) {
    return this.databaseService.publisher.findFirst({
      where: { id: id, status: true },
    });
  }

  async update(id: string, updatePublisherInput: UpdatePublisherInput) {
    const result = await this.databaseService.publisher.update({
      where: { id: id },
      data: updatePublisherInput,
    });

    return result ? true : false;
  }
}
