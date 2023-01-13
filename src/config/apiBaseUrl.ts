import { isDevMode } from '@angular/core';

export const getApiBaseUrl = () => {
  if (isDevMode()) {
    return 'http://localhost:3000';
  } else {
    return 'https://fullstack-test-node.vercel.app';
  }
  console.log(isDevMode());
};
