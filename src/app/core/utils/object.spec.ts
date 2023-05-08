import { isNotUndefined, isNotNull, isNotNullOrUndefined, isNull, isUndefined, hasNotSameId, hasSameId, isNullOrUndefined } from './object';
import { objects } from './test-data/data.objects';

describe('[core] utils/object', () => {
  describe('hasSameId', () => {
    it('should return true when objects have the same id', () => {
      const result = hasSameId(objects[0])(objects[0]);
      expect(result).toBeTrue();
    });

    it('should return false when objects have different ids', () => {
      const result = hasSameId(objects[0])(objects[1]);
      expect(result).toBeFalse();
    });
  });

  describe('hasNotSameId', () => {
    it('should return false when objects have the same id', () => {
      const result = hasNotSameId(objects[0])(objects[0]);
      expect(result).toBeFalse();
    });

    it('should return true when objects have different ids', () => {
      const result = hasNotSameId(objects[0])(objects[1]);
      expect(result).toBeTrue();
    });
  });

  describe('isUndefined', () => {
    it('should return false when the value is an object', () => {
      const result = isUndefined({});
      expect(result).toBeFalse();
    });

    it('should return false when the value is null', () => {
      const result = isUndefined(null);
      expect(result).toBeFalse();
    });

    it('should return true when the value is undefined', () => {
      const result = isUndefined(undefined);
      expect(result).toBeTrue();
    });
  });

  describe('isNotUndefined', () => {
    it('should return true when the value is an object', () => {
      const result = isNotUndefined({});
      expect(result).toBeTrue();
    });

    it('should return false when the value is null', () => {
      const result = isNotUndefined(null);
      expect(result).toBeTrue();
    });

    it('should return false when the value is undefined', () => {
      const result = isNotUndefined(undefined);
      expect(result).toBeFalse();
    });
  });

  describe('isNull', () => {
    it('should return false when the value is an object', () => {
      const result = isNull({});
      expect(result).toBeFalse();
    });

    it('should return true when the value is null', () => {
      const result = isNull(null);
      expect(result).toBeTrue();
    });

    it('should return false when the value is undefined', () => {
      const result = isNull(undefined);
      expect(result).toBeFalse();
    });
  });

  describe('isNotNull', () => {
    it('should return true when the value is an object', () => {
      const result = isNotNull({});
      expect(result).toBeTrue();
    });

    it('should return false when the value is null', () => {
      const result = isNotNull(null);
      expect(result).toBeFalse();
    });

    it('should return true when the value is undefined', () => {
      const result = isNotNull(undefined);
      expect(result).toBeTrue();
    });
  });

  describe('isNullOrUndefined', () => {
    it('should return false when the value is an object', () => {
      const result = isNullOrUndefined({});
      expect(result).toBeFalse();
    });

    it('should return true when the value is null', () => {
      const result = isNullOrUndefined(null);
      expect(result).toBeTrue();
    });

    it('should return true when the value is undefined', () => {
      const result = isNullOrUndefined(undefined);
      expect(result).toBeTrue();
    });
  });

  describe('isNotNullOrUndefined', () => {
    it('should return true when the value is an object', () => {
      const result = isNotNullOrUndefined({});
      expect(result).toBeTrue();
    });

    it('should return false when the value is null', () => {
      const result = isNotNullOrUndefined(null);
      expect(result).toBeFalse();
    });

    it('should return false when the value is undefined', () => {
      const result = isNotNullOrUndefined(undefined);
      expect(result).toBeFalse();
    });
  });
});
