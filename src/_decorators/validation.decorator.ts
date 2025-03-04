import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

var StatusArr = ['BACKLOG', 'TODO', 'INPROGRESS', 'DONE'];

export function IsStatusEnum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStatusEnum',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value?: any) {
          if (!value) return true;
          return typeof value === 'string' && StatusArr.includes(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}

var PriorityEnum = ['LOW', 'MEDIUM', 'HIGH'];

export function IsPriorityEnum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPriorityEnum',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value?: any) {
          if (!value) return true;
          return typeof value === 'string' && PriorityEnum.includes(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
