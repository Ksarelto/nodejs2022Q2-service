export const updateObject = (obj: unknown, modifications: unknown) => {
  const updatedObject = Object.entries(obj).map(([key, value]) => {
    if (modifications[key] === false || modifications[key]) {
      return [key, modifications[key]];
    }

    return [key, value];
  });

  return Object.fromEntries(updatedObject);
};
