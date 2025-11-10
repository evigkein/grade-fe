import {IPilotSkill} from '../../interfaces/api/entities/competencies';

export function createIdListFromStringArray<T extends string>(items: T[]): IPilotSkill[] {
  return items.map((item, index) => ({
    label: item,
    id: (index + 1).toString()
  }));
}

