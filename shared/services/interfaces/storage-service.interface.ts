export interface StorageUploadOptions {
    fileName?: string;
    folder?: string;
    metadata?: Record<string, string>;
    contentType?: string;
}

export interface StorageUploadResult {
    downloadUrl: string;
    fileName: string;
    fullPath: string;
    bucket: string;
    size: number;
    contentType: string;
    uploadedAt: Date;
    metadata?: Record<string, string>;
}

export interface IStorageService {
    uploadFromUrl(
        url: string,
        resourceId: string,
        fileId: string,
        options?: StorageUploadOptions
    ): Promise<StorageUploadResult>;
    
    uploadFromBuffer(
        buffer: Buffer,
        resourceId: string,
        fileId: string,
        options?: StorageUploadOptions
    ): Promise<StorageUploadResult>;
    
    deleteFile(filePath: string): Promise<void>;
    
    getFileUrl(filePath: string): Promise<string>;
    
    fileExists(filePath: string): Promise<boolean>;
}