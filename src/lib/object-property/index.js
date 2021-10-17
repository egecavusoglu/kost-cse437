function defineProperty({ prototype, name, value }) {
  if (prototype.hasOwnProperty(name)) {
    return;
  }
  Object.defineProperty(prototype, name, {
    value: value,
  });
}

export { defineProperty };
