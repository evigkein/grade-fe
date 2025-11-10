import { PriorityMap, SortOption, ESortingType, getSortedArray } from './sort';

interface TestItem {
  id: number;
  name: string;
  isActive: boolean;
  birthday: Date | string;
  category: string;
}

const items: TestItem[] = [
  {
    id: 3,
    name: 'Charlie',
    isActive: false,
    birthday: new Date('1990-01-01'),
    category: 'B',
  },
  {
    id: 1,
    name: 'Alice',
    isActive: true,
    birthday: new Date('1985-05-15'),
    category: 'A',
  },
  {
    id: 2,
    name: 'Bob',
    isActive: true,
    birthday: new Date('1995-03-20'),
    category: 'C',
  },
  {
    id: 4,
    name: 'David',
    isActive: false,
    birthday: new Date('2000-07-30'),
    category: 'A',
  },
];

describe('getSortedArray', () => {
  describe('Automatic type detection', () => {
    test('should sort by numeric field "id" ascending', () => {
      const options: SortOption<TestItem>[] = [{ field: 'id' }];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([1, 2, 3, 4]);
    });

    test('should sort by numeric field "id" descending', () => {
      const options: SortOption<TestItem>[] = [{ field: 'id', order: 'desc' }];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([4, 3, 2, 1]);
    });

    test('should sort by string field "name" ascending lexicographically', () => {
      const options: SortOption<TestItem>[] = [{ field: 'name' }];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.name)).toEqual(['Alice', 'Bob', 'Charlie', 'David']);
    });

    test('should sort by boolean field "isActive" ascending (false < true)', () => {
      const options: SortOption<TestItem>[] = [{ field: 'isActive' }];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([3, 4, 1, 2]);
    });

    test('should sort by date field "birthday" ascending', () => {
      const options: SortOption<TestItem>[] = [{ field: 'birthday' }];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.name)).toEqual(['Alice', 'Charlie', 'Bob', 'David']);
    });
  });

  describe('Explicit sortType specification', () => {
    test('should sort by boolean field "isActive" with sortType BOOLEAN', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'isActive', sortType: ESortingType.BOOLEAN }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([3, 4, 1, 2]);
    });

    test('should sort by numeric field "id" with sortType NUMBER', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'id', sortType: ESortingType.NUMBER }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([1, 2, 3, 4]);
    });

    test('should sort by string field "name" with sortType LEX', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'name', sortType: ESortingType.LEX }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.name)).toEqual(['Alice', 'Bob', 'Charlie', 'David']);
    });

    test('should sort by date field "birthday" with sortType DATE', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'birthday', sortType: ESortingType.DATE }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.name)).toEqual(['Alice', 'Charlie', 'Bob', 'David']);
    });
  });

  describe('Custom comparator (cmp)', () => {
    test('should sort by "id" descending using a custom comparator', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'id', cmp: (a, b) => b - a }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([4, 3, 2, 1]);
    });
  });

  describe('Using useMap', () => {
    test('should sort by field "category" using useMap', () => {
      const categoryMap: PriorityMap<string> = { A: 2, B: 1, C: 3 };
      const options: SortOption<TestItem>[] = [
        { field: 'category', useMap: categoryMap }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([3, 1, 4, 2]);
    });
  });

  describe('Multiple fields sorting', () => {
    test('should sort first by "isActive" ascending then by "id" ascending', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'isActive', sortType: ESortingType.BOOLEAN, priority: 0 },
        { field: 'id', sortType: ESortingType.NUMBER, priority: 1 }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.id)).toEqual([3, 4, 1, 2]);
    });

    test('should sort by "name" descending then by "id" ascending', () => {
      const options: SortOption<TestItem>[] = [
        { field: 'name', sortType: ESortingType.LEX, order: 'desc', priority: 0 },
        { field: 'id', sortType: ESortingType.NUMBER, order: 'asc', priority: 1 }
      ];
      const result = getSortedArray(items, options);
      expect(result.map(item => item.name)).toEqual(['David', 'Charlie', 'Bob', 'Alice']);
    });
  });

  describe('Edge cases', () => {
    test('should return an empty array when input array is empty', () => {
      const result = getSortedArray([], [{ field: 'id' }]);
      expect(result).toEqual([]);
    });

    test('should return the same array when it contains a single element', () => {
      const singleItem: TestItem[] = [
        { id: 1, name: 'Single', isActive: true, birthday: new Date(), category: 'A' }
      ];
      const result = getSortedArray(singleItem, [{ field: 'name' }]);
      expect(result).toEqual(singleItem);
    });
  });
});
