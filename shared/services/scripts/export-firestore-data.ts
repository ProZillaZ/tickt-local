import admin from 'firebase-admin';
import fs from 'fs';

// Initialize admin SDK
admin.initializeApp({
	projectId: 'tickt-90f02'
});

const db = admin.firestore();

// Export collection
async function exportCollection(collectionName: string) {
	const snapshot: any = await db.collection(collectionName).get();
	const data: any[] = [];

	snapshot.forEach((doc: any) => {
		console.log(doc.id);

		data.push({
			id: doc.id,
			...doc.data()
		});
	});

	fs.writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2));
}

exportCollection('recipes').then(r => console.log(r)).catch(err => console.log(err));
