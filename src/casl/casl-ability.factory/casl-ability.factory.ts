import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Duty } from '../types/Duty';
import { User } from '../types/User';
import { Action } from 'src/_decorators/action.decorator';
import { Role } from '@prisma/client';

type Subjects = InferSubjects<typeof Duty | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    console.log(user);
    can(Action.Manage, 'all'); // read-write access to everything
    if (user.role === Role.ADMIN) {
    } else if (user.role === Role.MODERATOR) {
      cannot(Action.Delete, Duty);
      cannot(Action.Create, Duty);
      cannot(Action.Update, User, ['role']);
    } else {
      cannot(Action.Update, User, ['role']);
    }
    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
