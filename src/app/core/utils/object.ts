import { Identifiable } from '../models/object.models';

export const isUndefined = <T>(object: T | undefined): object is undefined => object === undefined;
export const isNotUndefined = <T>(object: T | undefined): object is T => object !== undefined;

export const isNull = <T>(object: T | null): object is null => object === null;
export const isNotNull = <T>(object: T | null): object is T => object !== null;

export const isNullOrUndefined = <T>(object: T | null | undefined): object is null | undefined => isNull(object) || isUndefined(object);
export const isNotNullOrUndefined = <T>(object: T | null | undefined): object is T => !isNullOrUndefined(object);

export const hasSameId =
  <T1 extends Identifiable, T2 extends Identifiable>(object1: T1) =>
  (object2: T2): boolean =>
    object1.id === object2.id;
export const hasNotSameId =
  <T1 extends Identifiable, T2 extends Identifiable>(object1: T1) =>
  (object2: T2): boolean =>
    object1.id !== object2.id;
