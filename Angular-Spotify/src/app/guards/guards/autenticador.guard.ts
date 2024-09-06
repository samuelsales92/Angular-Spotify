import { CanMatchFn } from '@angular/router';

export const autenticadorGuard: CanMatchFn = (route, segments) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true)
    },2000)
  });
};
