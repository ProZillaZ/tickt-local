export interface IStorageService {
	updateProfilePicture(
		image: string,
		collection: string,
		docId: string,
		fileName: string,
	): Promise<string>;
}
