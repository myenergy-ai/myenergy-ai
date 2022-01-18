export const addKeysToObjects = (list) => {
  return list.map((item, index) => ({ ...item, key: index + 1 }));
};

export const INVALID_SCHEMA_ERROR = new Error(
  "INVALID SCHEMA: The schema of object paramater passed is not in valid format"
);
