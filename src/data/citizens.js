import { faker } from "@faker-js/faker";

export const generateCitizens = (count = 100000) => {
  const citizens = [];
  for (let i = 0; i < count; i++) {
    // Семья: всегда хотя бы 1
    const family = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => ({
        fullName: faker.person.fullName(),
        relation: faker.helpers.arrayElement(["мать", "отец", "брат", "сестра", "ребенок", "супруг"]),
        birthDate: faker.date.birthdate({ min: 18, max: 80, mode: "age" }).toISOString().split("T")[0],
        snils: faker.string.numeric(11),
      })
    );

    // Образование: всегда хотя бы 1
    const education = Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      () => ({
        institution: faker.company.name(),
        specialty: faker.lorem.words(2),
        graduationYear: faker.date.past({ years: 30 }).getFullYear(),
        diplomaNum: faker.string.alphanumeric(10),
      })
    );

    citizens.push({
      id: i + 1,
      fullName: faker.person.fullName(),
      birthDate: faker.date.birthdate({ min: 18, max: 90, mode: "age" }).toISOString().split("T")[0],
      gender: Math.random() > 0.5 ? "М" : "Ж",
      snils: faker.string.numeric(11),
      inn: faker.string.numeric(12),
      passport: {
        series: faker.string.numeric(4),
        number: faker.string.numeric(6),
        issuedBy: faker.company.name(),
        issueDate: faker.date.past().toISOString().split("T")[0],
      },
      phone: faker.phone.number(),
      email: faker.internet.email(),
      regAddress: `${faker.location.state()}, ${faker.location.city()}, ${faker.location.streetAddress()}`,
      factAddress: `${faker.location.state()}, ${faker.location.city()}, ${faker.location.streetAddress()}`,
      family,
      education,
      work: {
        currentJob: faker.company.name(),
        position: faker.person.jobTitle(),
        startDate: faker.date.past().toISOString().split("T")[0],
        salary: faker.number.int({ min: 20000, max: 150000 }),
      },
      benefits: faker.helpers.arrayElements(["инвалид", "многодетный", "ветеран"], { min: 0, max: 2 }),
      region: faker.location.state(),
      pensionAmount: faker.number.int({ min: 10000, max: 40000 }),
      educationLevel: faker.helpers.arrayElement(["среднее", "высшее", "научное"]),
      maritalStatus: faker.helpers.arrayElement(["женат", "холост", "разведен"]),
      disabilityGroup: Math.random() > 0.8 ? faker.number.int({ min: 1, max: 3 }) : null,
      photo: faker.image.avatar(),
    });
  }
  return citizens;
};

export const mockCitizens = generateCitizens(100000);
