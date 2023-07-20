import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Erro global:', error);
    console.error('Erro não tratado :', error.message);
  }
}
