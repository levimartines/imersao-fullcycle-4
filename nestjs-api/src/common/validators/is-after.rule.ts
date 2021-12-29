import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { parseISO } from 'date-fns';

export function isAfter(field, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsAfter',
      constraints: [field],
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args?: ValidationArguments): boolean {
          return parseISO(value) > parseISO(args.object[args.constraints[0]]);
        },
        defaultMessage: buildMessage(
          (eachPrefix, args) =>
            `${eachPrefix}$property must be after than ${args.constraints[0]}`,
          validationOptions,
        ),
      },
    });
  };
}
