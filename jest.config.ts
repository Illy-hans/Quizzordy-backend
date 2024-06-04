import type { Config } from '@jest/types';


const config: Config.InitialOptions =  {
    testEnvironment: 'node',
    preset: 'ts-jest',
    verbose: true,
    setupFilesAfterEnv: ['./src/config/setupTests.ts'],
    testTimeout: 12000,
    };

export default config;

