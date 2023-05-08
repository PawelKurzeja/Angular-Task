export type Id = string | number;

export type Identifiable<T extends Id = Id> = {
  id: T;
};
