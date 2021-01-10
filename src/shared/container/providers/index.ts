import { container } from 'tsyringe';

// import IMailProvider from './mailProvider/models/IMailProvider';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', DiskStorageProvider
);

// container.registerSingleton<IStorageProvider>(
  // 'StorageProvider', DiskStorageProvider
// );
