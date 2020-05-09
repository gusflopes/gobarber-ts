import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider.interface';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  LocalStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
