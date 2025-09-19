// src/data/citizens.js

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ФИО
const LASTNAMES_M = ["Иванов", "Петров", "Сидоров", "Кузнецов", "Смирнов", "Фёдоров", "Соловьёв", "Морозов", "Волков", "Егоров"];
const LASTNAMES_F = ["Иванова", "Петрова", "Сидорова", "Кузнецова", "Смирнова", "Фёдорова", "Соловьёва", "Морозова", "Волкова", "Егорова"];
const FIRSTNAMES_M = ["Алексей", "Иван", "Павел", "Сергей", "Андрей", "Дмитрий", "Николай", "Владимир", "Олег", "Егор"];
const FIRSTNAMES_F = ["Анна", "Мария", "Елена", "Ольга", "Татьяна", "Наталья", "Ирина", "Светлана", "Виктория", "Полина"];
const PATRONYMICS_M = ["Иванович", "Петрович", "Сергеевич", "Александрович", "Андреевич", "Николаевич"];
const PATRONYMICS_F = ["Ивановна", "Петровна", "Сергеевна", "Александровна", "Андреевна", "Николаевна"];

// Адреса
const STREETS = ["Ленина", "Советская", "Молодёжная", "Школьная", "Центральная", "Победы", "Гагарина", "Кирова"];
const CITIES = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Ростов-на-Дону", "Краснодар", "Воронеж"];

// ВУЗы и специальности
const UNIVERSITIES = [
  "МГУ им. Ломоносова",
  "СПбГУ",
  "Казанский федеральный университет",
  "УрФУ",
  "МФТИ",
  "НИУ ВШЭ",
];
const SPECIALTIES = ["Программная инженерия", "Юриспруденция", "Экономика", "Медицина", "Педагогика", "Строительство"];

// Компании и должности
const COMPANIES = ["Яндекс", "Сбер", "Газпром", "РЖД", "Лукойл", "МТС", "Ростелеком", "Татнефть"];
const POSITIONS = ["Инженер", "Разработчик", "Юрист", "Менеджер", "Учитель", "Врач", "Экономист", "Аналитик"];

// Генерация даты
function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .slice(0, 10);
}

// СНИЛС
function generateSnils() {
  const num = () => String(Math.floor(100 + Math.random() * 900));
  const part1 = num();
  const part2 = num();
  const part3 = num();
  const check = String(Math.floor(10 + Math.random() * 90));
  return `${part1}-${part2}-${part3} ${check}`;
}

// Фото
function photo(gender) {
  return gender === "М"
    ? `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`
    : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 90)}.jpg`;
}

// Создание одного гражданина
function createCitizen(id) {
  const gender = Math.random() > 0.5 ? "М" : "Ж";
  const last = gender === "М" ? randomItem(LASTNAMES_M) : randomItem(LASTNAMES_F);;
  const first = gender === "М" ? randomItem(FIRSTNAMES_M) : randomItem(FIRSTNAMES_F);
  const patronymic = gender === "М" ? randomItem(PATRONYMICS_M) : randomItem(PATRONYMICS_F);
  const fullName = `${last} ${first} ${patronymic}`;

  const birthDate = randomDate(1960, 2005);
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();

  // базовые контакты
  const email = `${first.toLowerCase()}.${last.toLowerCase()}@mail.ru`;
  const phone = `+7 9${Math.floor(100000000 + Math.random() * 899999999)}`;
  const city = randomItem(CITIES);
  const regAddress = `${city}, ул. ${randomItem(STREETS)}, д. ${Math.ceil(Math.random() * 50)}, кв. ${Math.ceil(Math.random() * 150)}`;

  // образование
  const education = [
    {
      institution: randomItem(UNIVERSITIES),
      specialty: randomItem(SPECIALTIES),
      graduationYear: 2000 + Math.floor(Math.random() * 20),
      diplomaNum: `D-${10000 + Math.floor(Math.random() * 90000)}`,
    },
  ];

  // работа
  const work = {
    currentJob: randomItem(COMPANIES),
    position: randomItem(POSITIONS),
    startDate: randomDate(2005, 2022),
  };

  // семья: учитываем пол для правильной генерации родственных связей
  const family = [];
  if (gender === "М") {
    family.push({
      fullName: `${randomItem(LASTNAMES_F)} ${randomItem(FIRSTNAMES_F)} ${randomItem(PATRONYMICS_F)}`,
      relation: "Жена",
      birthDate: randomDate(1965, 2002),
      snils: generateSnils(),
    });
    family.push({
      fullName: `${randomItem(LASTNAMES_M)} ${randomItem(FIRSTNAMES_M)} ${randomItem(PATRONYMICS_M)}`,
      relation: "Сын",
      birthDate: randomDate(2000, 2015),
      snils: generateSnils(),
    });
  } else {
    family.push({
      fullName: `${randomItem(LASTNAMES_M)} ${randomItem(FIRSTNAMES_M)} ${randomItem(PATRONYMICS_M)}`,
      relation: "Муж",
      birthDate: randomDate(1965, 2002),
      snils: generateSnils(),
    });
    family.push({
      fullName: `${randomItem(LASTNAMES_F)} ${randomItem(FIRSTNAMES_F)} ${randomItem(PATRONYMICS_F)}`,
      relation: "Дочь",
      birthDate: randomDate(2000, 2015),
      snils: generateSnils(),
    });
  }

  // льготы
  const benefits = [];
  if (Math.random() < 0.2) benefits.push("инвалид");
  if (Math.random() < 0.15) benefits.push("многодетный");
  if (Math.random() < 0.1) benefits.push("ветеран");

  // --- ДОБАВЛЯЕМ ПОЛЯ ДЛЯ ДАШБОРДОВ ---  
  const maritalStatuses = ["Женат/Замужем", "Холост/Не замужем", "Разведён/Разведена"];
  const maritalStatus = randomItem(maritalStatuses);

  // уровень образования
  let educationLevel = "Среднее общее";
  if (education[0].specialty === "Программная инженерия" || education[0].specialty === "Юриспруденция" || education[0].specialty === "Экономика" || education[0].specialty === "Медицина") {
    educationLevel = "Высшее";
  } else if (education[0].specialty === "Педагогика" || education[0].specialty === "Строительство") {
    educationLevel = "Среднее специальное";
  }

  // статус занятости
  let employment = "Работает";
  if (age > 65) employment = "Пенсионер";
  if (Math.random() < 0.1) employment = "Безработный";

  const profession = work.position;

  return {
    id: `CIT-${String(id).padStart(5, "0")}`,
    fullName,
    gender,
    birthDate,
    age, // 👈 добавлено
    email,
    phone,
    regAddress,
    snils: generateSnils(),
    photo: photo(gender),
    region: city,
    education,
    work,
    family,
    benefits,
    maritalStatus,   // 👈 добавлено
    educationLevel,  // 👈 добавлено
    employment,      // 👈 добавлено
    profession,      // 👈 добавлено
    cases: [
      { topic: "Экология", date: "2025-01-01" },
      { topic: "Льготы", date: "2025-02-01" },
    ],
  };
}

export const mockCitizens = Array.from({ length: 200 }, (_, i) => createCitizen(i + 1));
