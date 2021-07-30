import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Gender {
  MALE,
  FEMALE,
  UNSPECIFIED,
}

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field()
  streetName: string;

  @Field(() => Int, { nullable: true })
  postalCode: number;

  @Field()
  city: string;

  @Field()
  country: string;
}

@ObjectType()
export class User {
  // GraphQL ID type
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  // Enum type

  @Field(() => Gender)
  gender: Gender;

  @Field({ name: 'email' })
  emailAddress: string;

  // nullable type
  @Field({ nullable: true })
  weight?: number;

  // Object Type
  @Field({ nullable: true })
  address: Address;
}

@InputType()
export class AddressInput {
  @Field()
  streetName: string;

  @Field(() => Int)
  postalCode: number;

  @Field()
  city: string;

  @Field()
  country: string;
}

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  emailAddress: string;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  address?: AddressInput;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field({ nullable: true })
  emailAddress: string;

  @Field({ nullable: true })
  weight?: number;
}
