import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo id scalar type',
  parseValue: (value: string) => new ObjectId(value), // client from input variable
  serialize: (value: ObjectId) => value.toHexString(), // value sent to client
  parseLiteral: (ast) => ast.kind === Kind.STRING ? new ObjectId(ast.value) : null,
});
