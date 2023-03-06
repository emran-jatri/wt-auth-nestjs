import { ValidationError } from 'class-validator';
/**
 * Parses validation error array and creates a InputValidationError object with
 * formatted error message and validation result.
 * @extends Error
 */
export class InputValidationError extends Error {
  name = 'ValidationError';
  result: { [key: string]: string } = {};
  constructor(ve: Array<ValidationError>) {
    super('');
    const errors = [];
    for (const err of ve) {
      const currentErrors = [];
      for (const key in err.constraints) {
        currentErrors.push(err.constraints[key]);
      }
      const msg = currentErrors.join(', ');
      this.result[err.property] = msg + '.';
      errors.push(msg);
    }
    this.message = errors.join(', ') + '.';
  }
}
