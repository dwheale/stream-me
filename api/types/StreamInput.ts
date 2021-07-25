import { Field, InputType } from 'type-graphql';
import { Stream } from '../entities/Stream';
import { ObjectId } from 'mongodb';

@InputType()
export class StreamInput implements Partial<Stream> {
  @Field({ nullable: true })
  id?: ObjectId;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  url: string;
}