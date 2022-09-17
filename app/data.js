import { faker } from "@faker-js/faker";

global.USERS ??= [];

export function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    checked: false,
  };
}

export function update(id, checked) {
  let g = USERS.find((x) => x.id == id);
  if (g) g.checked = "true" === checked;
}

export function getAllUsers() {
  if (USERS.length) {
    return USERS;
  }

  Array.from({ length: 100 }).forEach(() => {
    USERS.push(createRandomUser());
  });

  return USERS;
}
