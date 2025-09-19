import { faker } from "@faker-js/faker";

export const generateCitizens = (count = 100000) => {
  const citizens = [];
  for (let i = 0; i < count; i++) {
    citizens.push({
      id: i + 1,
      fullName: faker.person.fullName(),
      birthDate: faker.date.birthdate({ min: 18, max: 90, mode: "age" }).toISOString().split("T")[0],
      gender: Math.random() > 0.5 ? "М" : "Ж",
      snils: faker.string.numeric(11),
      inn: faker.string.numeric(12),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      regAddress: faker.location.city(),
      factAddress: faker.location.streetAddress(),
      region: faker.location.state(),
      educationLevel: faker.helpers.arrayElement(["среднее", "высшее", "научное"]),
      maritalStatus: faker.helpers.arrayElement(["женат", "холост", "разведен"]),
      benefits: faker.helpers.arrayElements(["инвалид", "многодетный", "ветеран"], { min: 0, max: 2 }),
      work: {
        currentJob: faker.company.name(),
        position: faker.person.jobTitle(),
      },
    });
  }
  return citizens;
};

export const mockCitizens = generateCitizens(100000);
