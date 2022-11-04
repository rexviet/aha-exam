import PasswordValidator from 'password-validator';
import { PASSWORD_MIN_LENGTH } from './auth.constant';
import { registerDecorator, ValidationOptions } from 'class-validator';

const validatePassword = (password: string): boolean => {
  // Create a schema
  const schema = new PasswordValidator();
  schema
    .has()
    .lowercase() // contains at least one lower character
    .has()
    .uppercase() // contains at least one upper character
    .has()
    .digits() // contains at least one digit character
    .has()
    .symbols() // contains at least one special character
    .is()
    .min(PASSWORD_MIN_LENGTH); // contains at least 8 characters

  // Validate against a password string
  return schema.validate(password) as boolean;
};

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            return true;
          }
          return typeof value === 'string' && validatePassword(value);
        },
      },
    });
  };
}
