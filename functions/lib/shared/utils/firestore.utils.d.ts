import { Timestamp, CollectionReference, DocumentData, WhereFilterOp } from 'firebase-admin/firestore';
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
export declare class FirestoreUtils {
    static getCollection(name: string): CollectionReference<DocumentData>;
    static getById<T extends FirestoreDocument>(collection: string, id: string): Promise<T | null>;
    static create<T extends Partial<FirestoreDocument>>(collection: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T & {
        id: string;
    }>;
    static update<T extends FirestoreDocument>(collection: string, id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T>;
    static delete(collection: string, id: string): Promise<void>;
    static paginate<T extends FirestoreDocument>(collection: string, options?: PaginationOptions): Promise<PaginatedResult<T>>;
    static search<T extends FirestoreDocument>(collection: string, searchField: string, searchValue: string, options?: SearchOptions): Promise<PaginatedResult<T>>;
    static batchGet<T extends FirestoreDocument>(collection: string, ids: string[]): Promise<T[]>;
    static exists(collection: string, id: string): Promise<boolean>;
    static timestampToDate(timestamp: any): Date | null;
    static dateToTimestamp(date: Date): Timestamp;
    static serverTimestamp(): Timestamp;
}
//# sourceMappingURL=firestore.utils.d.ts.map