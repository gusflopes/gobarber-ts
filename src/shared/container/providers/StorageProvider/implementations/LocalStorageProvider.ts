import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class LocalStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // code
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpPath, file),
      path.resolve(uploadConfig.uploadPath, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadPath, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
