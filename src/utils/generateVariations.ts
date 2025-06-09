// Types
type Attribute = {
  id?: string;
  name: string;
  attributeValues: string[];
};

// Utility function to compare two arrays regardless of order
const arraysAreEqual = (a: string[], b: string[]): boolean => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, i) => val === sortedB[i]);
};

// Variation generator
export const generateVariations = (
  attributes: Attribute[],
  existingVariations: string[][] // array of ["key:value", "key2:value2"] arrays
): string[][] => {
  if (attributes.length === 0) return [];

  const allCombos = attributes.reduce((acc: string[][], attr) => {
    if (acc.length === 0) {
      return attr.attributeValues.map((value) => [`${attr.name}:${value}`]);
    }

    const newCombinations: string[][] = [];
    for (const combo of acc) {
      for (const value of attr.attributeValues) {
        newCombinations.push([...combo, `${attr.name}:${value}`]);
      }
    }
    return newCombinations;
  }, []);

  // Remove duplicates: filter out any combo already existing
  const newVariations = allCombos.filter(
    (combo) =>
      !existingVariations.some((existing) => arraysAreEqual(existing, combo))
  );

  return newVariations;
};
