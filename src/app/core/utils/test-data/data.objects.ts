import { Identifiable } from '../../models/object.models';

export type TestObjectId = string;

export interface TestObject extends Identifiable<TestObjectId> {
  value: string;
}

export const objectsRecord: Record<TestObjectId, TestObject> = {
  'id-0': {
    id: 'id-0',
    value: 'value-0',
  },
  'id-1': {
    id: 'id-1',
    value: 'value-1',
  },
  'id-2': {
    id: 'id-2',
    value: 'value-2',
  },
  'id-3': {
    id: 'id-3',
    value: 'value-3',
  },
};

export const objects: TestObject[] = Object.values(objectsRecord);
