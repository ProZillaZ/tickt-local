import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mealtickt',
	name: process.env.DATABASE_NAME || 'mealtickt',
}));
