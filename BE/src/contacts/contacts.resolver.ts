import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  @UseGuards(JwtAccessAuthGuard)
  createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.contactsService.create(createContactInput, user.id);
  }

  @Query(() => [Contact], { name: 'contacts' })
  @UseGuards(JwtAccessAuthGuard)
  findAll(@CurrentUser() user: CurrentUserInterface) {
    return this.contactsService.findAll(user.id);
  }

  @Query(() => Contact, { name: 'contact' })
  @UseGuards(JwtAccessAuthGuard)
  findOne(@Args('id') id: string, @CurrentUser() user: CurrentUserInterface) {
    return this.contactsService.findOne(id, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.contactsService.update(
      updateContactInput.id,
      user.id,
      updateContactInput,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAccessAuthGuard)
  deleteContact(@Args('id') id: string, @CurrentUser() user: CurrentUserInterface) {
    return this.contactsService.remove(id, user.id);
  }
}
