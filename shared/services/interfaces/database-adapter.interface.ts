/**
 * Simple, platform-agnostic database adapter interface
 * Works with any database implementation (Firestore, MongoDB, SQL, etc.)
 */

export interface DatabaseDocument {
	id: string;
	data: any;
	exists: boolean;
}

export interface QueryResult {
	docs: DatabaseDocument[];
	lastDoc?: any; // For pagination
	hasMore: boolean;
}

export interface QueryOptions {
	where?: Array<{ field: string; op: string; value: any }>;
	orderBy?: Array<{ field: string; direction: 'asc' | 'desc' }>;
	limit?: number;
	startAfter?: any;
}

export interface IDatabaseAdapter {
	get(collection: string, id: string): Promise<DatabaseDocument | null>;

	create(collection: string, data: any): Promise<string>; // Returns new document ID
	create(collection: string, data: any, id: string): Promise<string>; // Create with specific ID
	update(collection: string, id: string, data: any): Promise<void>;

	delete(collection: string, id: string): Promise<void>;

	query(collection: string, options?: QueryOptions): Promise<QueryResult>;
}
