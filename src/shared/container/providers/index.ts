import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';
// import IMailProvider from './MailProvider/models/IMailProvider.interface';
// import FakeMailProvider from './MailProvider/fakes/FakeMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);

// container.registerSingleton<IMailProvider>('MailProvider', FakeMailProvider);
