"use server";

import { faker } from "@faker-js/faker";

export const getRandomUserName = async () => {
  const adj = faker.word.adjective({ length: { min: 3, max: 10 } });
  const noun = faker.word.noun({ length: { min: 3, max: 10 } });
  const num = faker.number.int(100000);
  const username = `${adj}_${noun}_${num}`;
  return username;
};
