import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, Address, UserInput, UpdateUserInput } from './user.types';
import { v4 as uuid } from 'uuid';

/**
 * This is similar to a controller in normal REST APIs
 */
@Resolver(() => User)
export class UserResolver {
  // I am using an object as the mock database.
  // We can switch this with mysql, mongodb, etc.
  database = {
    /**
     * users:{
     *   userId: User
     * }
     *
     * addresses:{
     *   userId: Address
     * }
     */
    users: {},
    addresses: {},
  };

  @Query(() => User, { name: 'user' })
  getUser(@Args('userId') userId: string): User {
    const user = this.database.users[userId];

    // Error handling
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Query(() => [User], { name: 'users' })
  getAllUsers(): User[] {
    return Object.values(this.database.users);
  }

  @Mutation(() => User)
  addUser(@Args('user') userInput: UserInput): User {
    const userId = uuid();
    const addressId = uuid();
    const user: User = {
      id: userId,
      name: userInput.name,
      age: userInput.age,
      emailAddress: userInput.emailAddress,
      gender: userInput.gender,
      weight: userInput.weight,

      // A little hack
      // `undefined` because we don't want to save the address
      // this will be provided by a @ResolveField() method
      address: undefined,
    };

    // Save the user object to the database
    this.database.users[userId] = user;

    let address: Address = null;
    address = {
      id: addressId,
      streetName: userInput.address.streetName,
      postalCode: userInput.address.postalCode,
      city: userInput.address.city,
      country: userInput.address.country,
      userId: userId,
    };

    this.database.addresses[userId] = address;

    return user;
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('user') userInput: UpdateUserInput,
  ): User {
    // Get access to the current user
    const currentUser = this.database.users[userId];

    // Error handling
    if (!currentUser) {
      throw new NotFoundException();
    }

    // Update user
    const updatedUser = { ...currentUser, ...userInput };

    this.database.users[userId] = updatedUser;
    return updatedUser;
  }

  @Mutation(() => Int)
  deleteUser(@Args('userId') userId: string): number {
    const user = this.database.users[userId];
    if (!user) {
      return 0;
    }
    delete this.database.users[userId];
    return 1;
  }

  @Mutation(() => Int)
  deleteAll(): number {
    // Cache all users
    const users = this.database.users;

    this.database.users = {};
    this.database.addresses = {};
    return Object.keys(users).length;
  }

  @ResolveField(() => Address)
  address(@Parent() user: User) {
    return this.database.addresses[user.id];
  }
}
