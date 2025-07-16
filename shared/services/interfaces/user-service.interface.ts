import { UserProfile, CreateUserProfileDto, UpdateUserProfileDto } from '@tickt-ltd/types';
import { PaginatedResult, SearchOptions } from './common-types';

/**
 * Interface for user service operations
 * Provides CRUD operations and search functionality for user profiles
 */
export interface IUserService {
	getById(id: string): Promise<UserProfile | null>;

	getByEmail(email: string): Promise<UserProfile | null>;

	create(data: CreateUserProfileDto): Promise<UserProfile>;

	update(id: string, data: UpdateUserProfileDto): Promise<UserProfile>;

	delete(id: string): Promise<void>;

	search(options?: SearchOptions): Promise<PaginatedResult<UserProfile>>;

	getByActivityLevel(activityLevel: string, options?: SearchOptions): Promise<PaginatedResult<UserProfile>>;

	getByDietGoal(goal: string, options?: SearchOptions): Promise<PaginatedResult<UserProfile>>;
}
