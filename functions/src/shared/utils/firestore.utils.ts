import {
	getFirestore,
	Timestamp,
	DocumentSnapshot,
	QuerySnapshot,
	DocumentReference,
	Query,
	CollectionReference,
	WriteResult,
	DocumentData,
	WhereFilterOp,
} from 'firebase-admin/firestore';

const db = getFirestore();

export interface FirestoreDocument {
	id: string;
	createdAt?: Date | Timestamp;
	updatedAt?: Date | Timestamp;
}

export interface PaginationOptions {
	page?: number;
	limit?: number;
	orderBy?: string;
	orderDirection?: 'asc' | 'desc';
	where?: Array<{
		field: string;
		operator: WhereFilterOp;
		value: any;
	}>;
}

export interface SearchOptions {
	page?: number;
	limit?: number;
}

export interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export class FirestoreUtils {
	static getCollection(name: string): CollectionReference<DocumentData> {
		return db.collection(name);
	}

	static async getById<T extends FirestoreDocument>(
		collection: string,
		id: string,
	): Promise<T | null> {
		try {
			const doc: DocumentSnapshot = await db.collection(collection).doc(id).get();
			if (!doc.exists) {
				return null;
			}

			const data = doc.data();
			if (!data) {
				return null;
			}

			return {
				id: doc.id,
				...data,
				createdAt: this.timestampToDate(data.createdAt),
				updatedAt: this.timestampToDate(data.updatedAt),
			} as T;
		} catch (error) {
			console.error(`Error getting document ${id} from ${collection}:`, error);
			throw new Error(`Failed to get document: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async create<T extends Partial<FirestoreDocument>>(
		collection: string,
		data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<T & { id: string }> {
		try {
			const now = Timestamp.now();
			const docData = {
				...data,
				createdAt: now,
				updatedAt: now,
			};

			const docRef: DocumentReference = await db.collection(collection).add(docData);
			const doc: DocumentSnapshot = await docRef.get();

			const savedData = doc.data();
			if (!savedData) {
				throw new Error('Failed to retrieve created document');
			}

			return {
				id: doc.id,
				...savedData,
				createdAt: this.timestampToDate(savedData.createdAt),
				updatedAt: this.timestampToDate(savedData.updatedAt),
			} as T & { id: string };
		} catch (error) {
			console.error(`Error creating document in ${collection}:`, error);
			throw new Error(`Failed to create document: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async update<T extends FirestoreDocument>(
		collection: string,
		id: string,
		data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
	): Promise<T> {
		try {
			const docRef: DocumentReference = db.collection(collection).doc(id);
			const doc: DocumentSnapshot = await docRef.get();

			if (!doc.exists) {
				throw new Error(`Document with id ${id} not found`);
			}

			const updateData = {
				...data,
				updatedAt: Timestamp.now(),
			};

			await docRef.update(updateData);
			const updatedDoc: DocumentSnapshot = await docRef.get();

			const updatedData = updatedDoc.data();
			if (!updatedData) {
				throw new Error('Failed to retrieve updated document');
			}

			return {
				id: updatedDoc.id,
				...updatedData,
				createdAt: this.timestampToDate(updatedData.createdAt),
				updatedAt: this.timestampToDate(updatedData.updatedAt),
			} as T;
		} catch (error) {
			console.error(`Error updating document ${id} in ${collection}:`, error);
			throw new Error(`Failed to update document: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async delete(collection: string, id: string): Promise<void> {
		try {
			const docRef: DocumentReference = db.collection(collection).doc(id);
			const doc: DocumentSnapshot = await docRef.get();

			if (!doc.exists) {
				throw new Error(`Document with id ${id} not found`);
			}

			await docRef.delete();
		} catch (error) {
			console.error(`Error deleting document ${id} from ${collection}:`, error);
			throw new Error(`Failed to delete document: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async paginate<T extends FirestoreDocument>(
		collection: string,
		options: PaginationOptions = {},
	): Promise<PaginatedResult<T>> {
		try {
			const {
				page = 1,
				limit = 10,
				orderBy = 'createdAt',
				orderDirection = 'desc',
				where = [],
			} = options;

			let query: Query = db.collection(collection);

			// Apply where conditions
			where.forEach(condition => {
				query = query.where(condition.field, condition.operator, condition.value);
			});

			// Get total count
			const countSnapshot = await query.count().get();
			const total = countSnapshot.data().count;

			// Apply ordering and pagination
			query = query.orderBy(orderBy, orderDirection);
			query = query.limit(limit);
			query = query.offset((page - 1) * limit);

			const snapshot: QuerySnapshot = await query.get();
			const items = snapshot.docs.map(doc => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					createdAt: this.timestampToDate(data.createdAt),
					updatedAt: this.timestampToDate(data.updatedAt),
				} as T;
			});

			return {
				items,
				total,
				page,
				limit,
				pages: Math.ceil(total / limit),
			};
		} catch (error) {
			console.error(`Error paginating collection ${collection}:`, error);
			throw new Error(`Failed to paginate collection: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async search<T extends FirestoreDocument>(
		collection: string,
		searchField: string,
		searchValue: string,
		options: SearchOptions = {},
	): Promise<PaginatedResult<T>> {
		try {
			const { page = 1, limit = 10 } = options;

			// Note: This is a simple text search. For production, consider using
			// Algolia, Elasticsearch, or Cloud Firestore's full-text search
			const query: Query = db.collection(collection)
				.where(searchField, '>=', searchValue)
				.where(searchField, '<=', searchValue + '\uf8ff')
				.orderBy(searchField)
				.limit(limit)
				.offset((page - 1) * limit);

			const snapshot: QuerySnapshot = await query.get();
			const items = snapshot.docs.map(doc => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					createdAt: this.timestampToDate(data.createdAt),
					updatedAt: this.timestampToDate(data.updatedAt),
				} as T;
			});

			// For total count, we'd need a separate query
			// This is simplified for now - in production, implement proper counting
			const countQuery: Query = db.collection(collection)
				.where(searchField, '>=', searchValue)
				.where(searchField, '<=', searchValue + '\uf8ff');

			const countSnapshot = await countQuery.count().get();
			const total = countSnapshot.data().count;

			return {
				items,
				total,
				page,
				limit,
				pages: Math.ceil(total / limit),
			};
		} catch (error) {
			console.error(`Error searching collection ${collection}:`, error);
			throw new Error(`Failed to search collection: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async batchGet<T extends FirestoreDocument>(
		collection: string,
		ids: string[],
	): Promise<T[]> {
		try {
			if (ids.length === 0) {
				return [];
			}

			// Firestore batch get limit is 500 documents
			const batchSize = 500;
			const results: T[] = [];

			for (let i = 0; i < ids.length; i += batchSize) {
				const batchIds = ids.slice(i, i + batchSize);
				const docs = await db.getAll(...batchIds.map(id => db.collection(collection).doc(id)));

				const batchResults = docs
					.filter(doc => doc.exists)
					.map(doc => {
						const data = doc.data()!;
						return {
							id: doc.id,
							...data,
							createdAt: this.timestampToDate(data.createdAt),
							updatedAt: this.timestampToDate(data.updatedAt),
						} as T;
					});

				results.push(...batchResults);
			}

			return results;
		} catch (error) {
			console.error(`Error batch getting documents from ${collection}:`, error);
			throw new Error(`Failed to batch get documents: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}

	static async exists(collection: string, id: string): Promise<boolean> {
		try {
			const doc: DocumentSnapshot = await db.collection(collection).doc(id).get();
			return doc.exists;
		} catch (error) {
			console.error(`Error checking document existence ${id} in ${collection}:`, error);
			return false;
		}
	}

	static timestampToDate(timestamp: any): Date | null {
		if (!timestamp) return null;
		if (timestamp instanceof Date) return timestamp;
		if (timestamp.toDate && typeof timestamp.toDate === 'function') {
			return timestamp.toDate();
		}
		if (timestamp.seconds && typeof timestamp.seconds === 'number') {
			return new Date(timestamp.seconds * 1000);
		}
		if (typeof timestamp === 'string') {
			return new Date(timestamp);
		}
		return null;
	}

	static dateToTimestamp(date: Date): Timestamp {
		return Timestamp.fromDate(date);
	}

	static serverTimestamp(): Timestamp {
		return Timestamp.now();
	}
}
