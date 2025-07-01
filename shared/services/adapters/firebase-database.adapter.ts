/**
 * Firebase implementation of the database adapter
 * Can be used by any platform that uses Firebase (React Native, Node.js, Web)
 */

import { IDatabaseAdapter, DatabaseDocument, QueryResult, QueryOptions } from '../interfaces';

// Firebase modules interface - platform provides these
export interface FirebaseModules {
	firestore: any; // Firebase app instance
	collection: (db: any, path: string) => any;
	doc: (db: any, path: string, id?: string) => any;
	getDoc: (ref: any) => Promise<any>;
	getDocs: (query: any) => Promise<any>;
	addDoc: (ref: any, data: any) => Promise<any>;
	setDoc: (ref: any, data: any) => Promise<void>;
	updateDoc: (ref: any, data: any) => Promise<void>;
	deleteDoc: (ref: any) => Promise<void>;
	query: (ref: any, ...constraints: any[]) => any;
	where: (field: string, op: string, value: any) => any;
	orderBy: (field: string, direction?: string) => any;
	limit: (count: number) => any;
	startAfter: (doc: any) => any;
}

export class FirebaseDatabaseAdapter implements IDatabaseAdapter {
	constructor(private firebase: FirebaseModules) {
	}

	async get(collection: string, id: string): Promise<DatabaseDocument | null> {
		const docRef = this.firebase.doc(this.firebase.firestore, collection, id);
		const docSnap = await this.firebase.getDoc(docRef);

		if (!docSnap.exists) {
			return null;
		}

		return {
			id: docSnap.id,
			data: docSnap.data(),
			exists: true,
		};
	}

	async create(collection: string, data: any, id?: string): Promise<string> {
		if (id) {
			// Create document with specific ID using setDoc
			const docRef = this.firebase.doc(this.firebase.firestore, collection, id);
			await this.firebase.setDoc(docRef, data);
			return id;
		} else {
			// Create document with auto-generated ID
			const collectionRef = this.firebase.collection(this.firebase.firestore, collection);
			const docRef = await this.firebase.addDoc(collectionRef, data);
			return docRef.id;
		}
	}

	async update(collection: string, id: string, data: any): Promise<void> {
		const docRef = this.firebase.doc(this.firebase.firestore, collection, id);
		await this.firebase.updateDoc(docRef, data);
	}

	async delete(collection: string, id: string): Promise<void> {
		const docRef = this.firebase.doc(this.firebase.firestore, collection, id);
		await this.firebase.deleteDoc(docRef);
	}

	async query(collection: string, options: QueryOptions = {}): Promise<QueryResult> {
		let q = this.firebase.collection(this.firebase.firestore, collection);

		// Apply where filters
		if (options.where) {
			for (const filter of options.where) {
				q = this.firebase.query(q, this.firebase.where(filter.field, filter.op, filter.value));
			}
		}

		// Apply ordering
		if (options.orderBy) {
			for (const sort of options.orderBy) {
				q = this.firebase.query(q, this.firebase.orderBy(sort.field, sort.direction));
			}
		}

		// Apply pagination
		if (options.startAfter) {
			q = this.firebase.query(q, this.firebase.startAfter(options.startAfter));
		}

		if (options.limit) {
			q = this.firebase.query(q, this.firebase.limit(options.limit));
		}

		const querySnapshot = await this.firebase.getDocs(q);
		const docs: DatabaseDocument[] = [];
		let lastDoc: any;

		querySnapshot.forEach((doc: any) => {
			docs.push({
				id: doc.id,
				data: doc.data(),
				exists: true,
			});
			lastDoc = doc;
		});

		return {
			docs,
			lastDoc,
			hasMore: docs.length === (options.limit || 0),
		};
	}
}
