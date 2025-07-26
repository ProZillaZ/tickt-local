import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tag {
	@Prop({ required: true, minlength: 1, maxlength: 50 })
	name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);