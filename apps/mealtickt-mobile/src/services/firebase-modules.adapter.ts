/**
 * React Native Firebase adapter for shared services
 * Maps React Native Firebase modules to the FirebaseModules interface
 */

import firestore from '@react-native-firebase/firestore';
import { FirebaseModules } from '@tickt-ltd/services/adapters/firebase-database.adapter';

// React Native Firebase module mappings
export const reactNativeFirebaseModules: FirebaseModules = {
  firestore: firestore(),
  collection: (db, path) => db.collection(path),
  doc: (db, path, id) => id ? db.collection(path).doc(id) : db.collection(path).doc(),
  getDoc: async (ref) => {
    const snapshot = await ref.get();
    return {
      id: snapshot.id,
      data: () => snapshot.data(),
      exists: snapshot.exists,
    };
  },
  getDocs: async (query) => {
    const snapshot = await query.get();
    return {
      forEach: (callback: (doc: any) => void) => {
        snapshot.docs.forEach((doc: any) => {
          callback({
            id: doc.id,
            data: () => doc.data(),
            exists: doc.exists,
          });
        });
      },
      docs: snapshot.docs.map((doc: any) => ({
        id: doc.id,
        data: () => doc.data(),
        exists: doc.exists,
      })),
    };
  },
  addDoc: async (ref, data) => {
    const docRef = await ref.add(data);
    return {
      id: docRef.id,
    };
  },
  setDoc: async (ref, data) => {
    await ref.set(data);
  },
  updateDoc: async (ref, data) => {
    await ref.update(data);
  },
  deleteDoc: async (ref) => {
    await ref.delete();
  },
  query: (ref, ...constraints) => {
    let query = ref;
    constraints.forEach((constraint) => {
      if (constraint.type === 'where') {
        query = query.where(constraint.field, constraint.op, constraint.value);
      } else if (constraint.type === 'orderBy') {
        query = query.orderBy(constraint.field, constraint.direction);
      } else if (constraint.type === 'limit') {
        query = query.limit(constraint.count);
      } else if (constraint.type === 'startAfter') {
        query = query.startAfter(constraint.doc);
      }
    });
    return query;
  },
  where: (field, op, value) => ({ type: 'where', field, op, value }),
  orderBy: (field, direction = 'asc') => ({ type: 'orderBy', field, direction }),
  limit: (count) => ({ type: 'limit', count }),
  startAfter: (doc) => ({ type: 'startAfter', doc }),
};