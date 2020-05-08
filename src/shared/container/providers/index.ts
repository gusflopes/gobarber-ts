import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);
