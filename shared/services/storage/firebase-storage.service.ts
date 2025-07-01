import { getStorage, getDownloadURL } from 'firebase-admin/storage';
import { IStorageService, StorageUploadResult, StorageUploadOptions } from '../interfaces/storage-service.interface';
import { Logger } from '../core/logger';

export class FirebaseStorageService implements IStorageService {
    private logger: Logger;
    private bucket: any;

    constructor() {
        this.logger = new Logger('FirebaseStorageService');
        this.bucket = getStorage().bucket();
    }

    async uploadFromUrl(
        url: string,
        resourceId: string,
        fileId: string,
        options?: StorageUploadOptions
    ): Promise<StorageUploadResult> {
        this.logger.info('Uploading file from URL to Firebase Storage', { 
            url: url.substring(0, 100),
            resourceId,
            fileId 
        });

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }

            const buffer = Buffer.from(await response.arrayBuffer());
            return this.uploadFromBuffer(buffer, resourceId, fileId, options);
        } catch (error) {
            this.logger.error('Failed to upload file from URL', error instanceof Error ? error : new Error(String(error)));
            throw new Error(`File upload from URL failed: ${error}`);
        }
    }

    async uploadFromBuffer(
        buffer: Buffer,
        resourceId: string,
        fileId: string,
        options?: StorageUploadOptions
    ): Promise<StorageUploadResult> {
        this.logger.info('Uploading file buffer to Firebase Storage', { 
            resourceId,
            fileId,
            bufferSize: buffer.length 
        });

        try {
            const fileName = options?.fileName || `${fileId}.png`;
            const folder = options?.folder || 'uploads';
            const fullPath = `${folder}/${resourceId}/${fileName}`;
            
            const file = this.bucket.file(fullPath);
            const contentType = options?.contentType || this.detectContentType(fileName);
            
            const metadata = {
                contentType,
                metadata: {
                    resourceId,
                    fileId,
                    uploadedAt: new Date().toISOString(),
                    ...options?.metadata,
                },
            };

            await file.save(buffer, {
                metadata,
                resumable: false,
            });

            // Get download URL (works with uniform bucket-level access)
            const downloadUrl = await getDownloadURL(file);

            const result: StorageUploadResult = {
                downloadUrl,
                fileName,
                fullPath,
                bucket: this.bucket.name,
                size: buffer.length,
                contentType,
                uploadedAt: new Date(),
                metadata: options?.metadata,
            };

            this.logger.info('File uploaded successfully', { 
                downloadUrl,
                fullPath,
                size: result.size 
            });

            return result;
        } catch (error) {
            this.logger.error('Failed to upload file buffer', error instanceof Error ? error : new Error(String(error)));
            throw new Error(`File buffer upload failed: ${error}`);
        }
    }

    async deleteFile(filePath: string): Promise<void> {
        this.logger.info('Deleting file from Firebase Storage', { filePath });

        try {
            const file = this.bucket.file(filePath);
            await file.delete();
            this.logger.info('File deleted successfully', { filePath });
        } catch (error) {
            this.logger.error('Failed to delete file', error instanceof Error ? error : new Error(String(error)));
            throw new Error(`File deletion failed: ${error}`);
        }
    }

    async getFileUrl(filePath: string): Promise<string> {
        this.logger.info('Getting file URL from Firebase Storage', { filePath });

        try {
            const file = this.bucket.file(filePath);
            const downloadUrl = await getDownloadURL(file);
            this.logger.info('File URL retrieved successfully', { downloadUrl });
            return downloadUrl;
        } catch (error) {
            this.logger.error('Failed to get file URL', error instanceof Error ? error : new Error(String(error)));
            throw new Error(`Failed to get file URL: ${error}`);
        }
    }

    async fileExists(filePath: string): Promise<boolean> {
        this.logger.info('Checking if file exists in Firebase Storage', { filePath });

        try {
            const file = this.bucket.file(filePath);
            const [exists] = await file.exists();
            this.logger.info('File existence check completed', { filePath, exists });
            return exists;
        } catch (error) {
            this.logger.error('Failed to check file existence', error instanceof Error ? error : new Error(String(error)));
            return false;
        }
    }

    private detectContentType(fileName: string): string {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'png': return 'image/png';
            case 'jpg':
            case 'jpeg': return 'image/jpeg';
            case 'gif': return 'image/gif';
            case 'webp': return 'image/webp';
            case 'svg': return 'image/svg+xml';
            case 'pdf': return 'application/pdf';
            case 'txt': return 'text/plain';
            case 'json': return 'application/json';
            default: return 'application/octet-stream';
        }
    }
}