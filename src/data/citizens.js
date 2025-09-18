import { faker } from '@faker-js/faker';

export const generateCitizens = (count = 150) => {
  const citizens = [];
  for (let i = 0; i < count; i++) {
    const family = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      fullName: faker.person.fullName(),
      relation: ['мать', 'отец', 'брат', 'сестра', 'дети'][Math.floor(Math.random() * 5)],
      birthDate: faker.date.past().toISOString().split('T')[0],
      snils: faker.string.numeric(11),
    }));
    const education = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      institution: faker.company.name(),
      specialty: faker.lorem.words(2),
      graduationYear: faker.date.past().getFullYear(),
      diplomaNum: faker.string.alphanumeric(10),
    }));
    citizens.push({
      id: i + 1,
      fullName: faker.person.fullName(),
      birthDate: faker.date.past({ years: 80 }).toISOString().split('T')[0],
      gender: Math.random() > 0.5 ? 'М' : 'Ж',
      snils: faker.string.numeric(11),
      inn: faker.string.numeric(12),
      passport: {
        series: faker.string.numeric(4),
        number: faker.string.numeric(6),
        issuedBy: faker.lorem.words(3),
        issueDate: faker.date.past().toISOString().split('T')[0],
      },
      phone: faker.phone.number(),
      email: faker.internet.email(),
      regAddress: `${faker.location.zipCode()} ${faker.location.city()} ${faker.location.streetAddress()}`,
      factAddress: `${faker.location.zipCode()} ${faker.location.city()} ${faker.location.streetAddress()}`,
      family,
      education,
      work: {
        currentJob: faker.company.name(),
        position: faker.person.jobTitle(),
        startDate: faker.date.past().toISOString().split('T')[0],
      },
      benefits: ['инвалид', 'многодетный', 'ветеран'].filter(() => Math.random() > 0.7),
      region: faker.location.state(),
      pensionAmount: faker.number.int({ min: 10000, max: 30000 }),
      educationLevel: ['среднее', 'высшее', 'научное'][Math.floor(Math.random() * 3)],
      maritalStatus: ['женат', 'холост', 'разведен'][Math.floor(Math.random() * 3)],
      disabilityGroup: Math.random() > 0.7 ? faker.number.int({ min: 1, max: 3 }) : null,
      photo: faker.image.avatar(),
    });
  }
  return citizens;
};

export const mockCitizens = generateCitizens(150);