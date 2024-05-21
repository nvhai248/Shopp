import { Injectable } from '@nestjs/common';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';
import { PublishersRepository } from './publishers.repository';

@Injectable()
export class PublishersService {
  constructor(private readonly publisherRepository: PublishersRepository) {}

  create(createdBy: string, createPublisherInput: CreatePublisherInput) {
    return this.publisherRepository.create(createdBy, createPublisherInput);
  }

  findMany() {
    return this.publisherRepository.findMany();
  }

  findOne(id: string) {
    return this.publisherRepository.findOne(id);
  }

  update(id: string, updatePublisherInput: UpdatePublisherInput) {
    return this.publisherRepository.update(id, updatePublisherInput);
  }
}
