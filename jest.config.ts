const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  testMatch: [
    "**/*.spec.ts"
  ],
};
