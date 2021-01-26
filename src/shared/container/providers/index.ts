import { container } from 'tsyringe';

// import IMailProvider from './mailProvider/models/IMailProvider';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IMailProvider from './mailProvider/models/IMailProvider';
import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider';
import HandlebrasMailTempalteProvider from './mailTemplateProvider/implementations/HandlebrasMailTempalteProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider', HandlebrasMailTempalteProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider', container.resolve(EtherealMailProvider)
);
