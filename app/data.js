import { faker } from '@faker-js/faker';

global.USERS ??= [];

export function createRandomUser() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
}

export function update(id, checked){
  
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
