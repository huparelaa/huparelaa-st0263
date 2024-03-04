// configStore.js
let configs = {};

export const setConfig = (key, value) => {
  configs[key] = value;
};

export const getConfig = (key) => {
  return configs[key];
};
