import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { InputValidationError } from '../errors';
const validationMetaKey = Symbol();
type validationMetaData<T> = {
  idx: number;
  classConstructor: ClassConstructor<T>;
};
/**
 * This is a param decorator which can be used with ValidateArgs() function
 * decorator to validate function arguments
 *
 * @template T - class validator class type
 * @param {ClassConstructor<T>} classConstructor - class validator class constructor
 */
export function ShouldValidate<T>(classConstructor: ClassConstructor<T>) {
  return function (target: object, key: string | symbol, index: number) {
    const argsToValidate: Array<validationMetaData<any>> =
      Reflect.getOwnMetadata(validationMetaKey, target, key) || [];
    argsToValidate.push({
      idx: index,
      classConstructor,
    });
    // Storing validation metadata for later use on ValidateArgs() function
    Reflect.defineMetadata(validationMetaKey, argsToValidate, target, key);
  };
}
/**
 * This is function decorator validates function arguments with
 * ShouldValidate() param decorator
 *
 * @throws {ServiceError} - If something goes wrong during validation
 * @throws {InputValidationError} - thrown if validation fails validation
 */
export function ValidateArgs() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // retrieving validation metadata stored in ShouldValidate() function
      const argsToValidate: Array<validationMetaData<any>> =
        Reflect.getOwnMetadata(validationMetaKey, target, key);
      if (argsToValidate) {
        for (const { idx, classConstructor } of argsToValidate) {
          try {
            const instance = plainToInstance(classConstructor, args[idx]);
            const ve = await validate(instance, {
              whitelist: true,
            });
            if (ve.length != 0) {
              throw new InputValidationError(ve);
            }
          } catch (err) {
            if (err instanceof InputValidationError) {
              console.log(err);
              throw err;
            } else {
              throw new Error(
                'Something went wrong during validation: ' + err.message,
              );
            }
          }
        }
      }
      return method.apply(this, args);
    };
  };
}
