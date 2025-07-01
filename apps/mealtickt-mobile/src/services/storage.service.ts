import { IStorageService } from './interfaces/storage-service.interface.ts';
import { getDownloadURL, ref, uploadBytesResumable } from '@react-native-firebase/storage';
import { doc, updateDoc } from '@react-native-firebase/firestore';
import { db, storage } from 'firebaseConfig';

export class StorageService implements IStorageService {
	async updateProfilePicture(
		image: string,
		collection: string,
		docId: string,
		fileName: string,
	): Promise<string> {
		const response = await fetch(image);
		const blobFile = await response.blob();
		const reference = ref(storage, `${collection}/${docId}/${fileName}`);

		return new Promise((resolve, reject) => {
			const uploadTask = uploadBytesResumable(reference, blobFile);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
					);
					console.log(progress);
				},
				(error) => {
					alert(error);
					reject(error);
				},
				async () => {
					try {
						// @ts-ignore
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						await updateDoc(doc(db, collection, docId), {
							profilePic: downloadURL,
						});
						resolve(downloadURL);
					} catch (err) {
						reject(err);
					}
				},
			);
		});

	}
}
