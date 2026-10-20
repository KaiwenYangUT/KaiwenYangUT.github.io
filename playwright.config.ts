import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/e2e',fullyParallel:true,workers:2,use:{baseURL:'http://127.0.0.1:4173',browserName:'chromium',launchOptions:{channel:'chrome'},trace:'retain-on-failure'},webServer:{command:'npm run preview',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},reporter:'list'});
