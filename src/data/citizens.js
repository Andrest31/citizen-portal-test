// src/data/citizens.js
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Базовые данные ---
const LASTNAMES_M = [
  "Иванов", "Петров", "Сидоров", "Кузнецов", "Смирнов", "Фёдоров", "Соловьёв", "Морозов", "Волков", "Егоров",
];
const LASTNAMES_F = [
  "Иванова", "Петрова", "Сидорова", "Кузнецова", "Смирнова", "Фёдорова", "Соловьёва", "Морозова", "Волкова", "Егорова",
];
const FIRSTNAMES_M = [
  "Алексей", "Иван", "Павел", "Сергей", "Андрей", "Дмитрий", "Николай", "Владимир", "Олег", "Егор",
];
const FIRSTNAMES_F = [
  "Анна", "Мария", "Елена", "Ольга", "Татьяна", "Наталья", "Ирина", "Светлана", "Виктория", "Полина",
];
const PATRONYMICS_M = [
  "Иванович", "Петрович", "Сергеевич", "Александрович", "Андреевич", "Николаевич",
];
const PATRONYMICS_F = [
  "Ивановна", "Петровна", "Сергеевна", "Александровна", "Андреевна", "Николаевна",
];
const STREETS = [
  "Ленина", "Советская", "Молодёжная", "Школьная", "Центральная", "Победы", "Гагарина", "Кирова",
];
const CITIES = [
  "Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Ростов-на-Дону", "Краснодар", "Воронеж",
];
const UNIVERSITIES = [
  "МГУ им. Ломоносова", "СПбГУ", "Казанский федеральный университет", "УрФУ", "МФТИ", "НИУ ВШЭ",
];
const SPECIALTIES_HIGH = [
  "Программная инженерия", "Юриспруденция", "Экономика", "Медицина", "Педагогика", "Строительство", "Физика", "Математика"
];
const SPECIALTIES_VOC = [
  "Программист", "Электромонтер", "Медсестра", "Сварщик", "Повар", "Токарь", "Парикмахер", "Автомеханик"
];
const COMPANIES = [
  "Яндекс", "Сбер", "Газпром", "РЖД", "Лукойл", "МТС", "Ростелеком", "Татнефть",
];
const POSITIONS = [
  "Инженер", "Разработчик", "Юрист", "Менеджер", "Учитель", "Врач", "Экономист", "Аналитик", "Рабочий", "Кассир"
];
const MARITAL_STATUSES = ["Женат/Замужем", "Холост/Не замужем", "Разведён/Разведена", "Вдовец/Вдова"];
const NATIONALITIES = ["Русский", "Татарин", "Башкир", "Чуваш", "Удмурт", "Украинец", "Белорус"];
const LANGUAGES = ["Русский", "Английский", "Немецкий", "Французский", "Испанский", "Китайский"];
const BLOOD_TYPES = ["I (0)", "II (A)", "III (B)", "IV (AB)"];
const DISABILITY_GROUPS = ["I группа", "II группа", "III группа"];
const DISABILITY_REASONS = ["Общее заболевание", "Травма", "Врожденное"];
const DOCUMENT_TYPES = ["Паспорт РФ", "Загранпаспорт", "Водительское удостоверение", "Военный билет", "ИНН", "СНИЛС", "Полис ОМС"];
const HOUSING_TYPES = ["Квартира", "Дом", "Комната", "Общежитие", "Гараж", "Дача"];
const VEHICLE_TYPES = ["Легковой автомобиль", "Мотоцикл", "Грузовой автомобиль", "Водный транспорт", "Прицеп"];
const TAX_TYPES = ["НДФЛ", "Имущественный налог", "Транспортный налог", "Земельный налог"];
const SOCIAL_NETWORKS = ["VK", "Telegram", "Одноклассники", "Facebook", "Instagram"];
const EDUCATION_LEVELS = ["Без образования", "Начальное", "Среднее общее", "Среднее специальное", "Высшее", "Ученая степень"];

// --- Вспомогательные функции ---
function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0, 10);
}

function generateSnils() {
  const num = () => String(Math.floor(100 + Math.random() * 900));
  const part1 = num();
  const part2 = num();
  const part3 = num();
  const check = String(Math.floor(10 + Math.random() * 90));
  return `${part1}-${part2}-${part3} ${check}`;
}

function photo(gender) {
  // Исправлены пути к изображениям
  return gender === "М"
    ? `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`
    : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 90)}.jpg`;
}

// --- Функция создания гражданина ---
export function createCitizen(id) {
  const gender = Math.random() > 0.5 ? "М" : "Ж";
  const lastName = gender === "М" ? randomItem(LASTNAMES_M) : randomItem(LASTNAMES_F);
  const firstName = gender === "М" ? randomItem(FIRSTNAMES_M) : randomItem(FIRSTNAMES_F);
  const patronymic = gender === "М" ? randomItem(PATRONYMICS_M) : randomItem(PATRONYMICS_F);
  const fullName = `${lastName} ${firstName} ${patronymic}`;
  const birthDate = randomDate(1950, 2005);
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  const city = randomItem(CITIES);
  const regAddress = `${city}, ул. ${randomItem(STREETS)}, д. ${Math.ceil(Math.random() * 50)}, кв. ${Math.ceil(Math.random() * 150)}`;

  // --- ОСНОВНАЯ ИНФОРМАЦИЯ (PersonalInfoTab) ---
  const personalInfo = {
    lastName,
    firstName,
    patronymic,
    fullName,
    gender,
    birthDate,
    age,
    birthPlace: `${randomItem(CITIES)}, ${randomItem(STREETS)} район`,
    citizenship: "Российская Федерация",
    nationality: randomItem(NATIONALITIES),
    languages: ["Русский"],
    maritalStatus: randomItem(MARITAL_STATUSES),
    // Паспорт
    passportSeries: `${Math.floor(1000 + Math.random() * 9000)}`,
    passportNumber: `${Math.floor(100000 + Math.random() * 900000)}`,
    passportIssuedBy: `УФМС России по ${city}`,
    passportIssueDate: randomDate(2000, 2020),
    passportDivisionCode: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
    // Идентификаторы
    snils: generateSnils(),
    inn: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    ogrn: `${Math.floor(1000000000000 + Math.random() * 9000000000000)}`,
    okpo: `${Math.floor(10000000 + Math.random() * 90000000)}`,
  };

  // --- КОНТАКТЫ ---
  const contacts = {
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mail.ru`,
    phone: `+7 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    factAddress: `${city}, ул. ${randomItem(STREETS)}, д. ${Math.ceil(Math.random() * 50)}, кв. ${Math.ceil(Math.random() * 150)}`,
    socialNetworks: [],
  };
  if (Math.random() > 0.5) {
    contacts.socialNetworks.push({ type: randomItem(SOCIAL_NETWORKS), link: `https://${randomItem(SOCIAL_NETWORKS).toLowerCase()}.com/id${Math.floor(10000000 + Math.random() * 90000000)}` });
  }
  if (Math.random() > 0.6) {
    contacts.socialNetworks.push({ type: randomItem(SOCIAL_NETWORKS), link: `https://${randomItem(SOCIAL_NETWORKS).toLowerCase()}.com/user${Math.floor(100000 + Math.random() * 900000)}` });
  }

  // --- АДРЕСА ---
  const addresses = [
    { type: "Регистрация", address: regAddress },
    { type: "Фактический", address: contacts.factAddress },
  ];
  if (Math.random() > 0.7) {
    addresses.push({ type: "Временная регистрация", address: `${city}, ул. ${randomItem(STREETS)}, д. ${Math.ceil(Math.random() * 50)}` });
  }

  // --- ДОКУМЕНТЫ ---
  const documents = [
    {
      type: "Паспорт РФ",
      series: personalInfo.passportSeries,
      number: personalInfo.passportNumber,
      issuedBy: personalInfo.passportIssuedBy,
      issueDate: personalInfo.passportIssueDate,
      divisionCode: personalInfo.passportDivisionCode,
    },
    { type: "СНИЛС", number: personalInfo.snils },
    { type: "ИНН", number: personalInfo.inn },
  ];
  if (Math.random() > 0.8) {
    documents.push({ type: "Загранпаспорт", series: `${Math.floor(10 + Math.random() * 90)}`, number: `${Math.floor(1000000 + Math.random() * 9000000)}`, issueDate: randomDate(2015, 2023), expiryDate: randomDate(2025, 2033) });
  }
  if (Math.random() > 0.9) {
    documents.push({ type: "Водительское удостоверение", series: `${Math.floor(10 + Math.random() * 90)}`, number: `${Math.floor(100000 + Math.random() * 900000)}`, issueDate: randomDate(2010, 2023), categories: ["B"] });
  }

  // --- ОБРАЗОВАНИЕ ---
  // Генерируем разнообразный список образований для гражданина
  const education = [];
  const hasEducation = Math.random() > 0.05; // 5% граждан без образования

  if (hasEducation) {
    // Определяем количество записей об образовании (1-3)
    const numEduRecords = Math.random() > 0.9 ? (Math.random() > 0.7 ? 3 : 2) : 1;

    for (let i = 0; i < numEduRecords; i++) {
      // Вероятность иметь высшее образование (высокая)
      const willHaveHigher = Math.random() > 0.3; // 70% шанс высшего, если есть образование
      let level, institution, specialty, graduationYear, diplomaSeries, diplomaNumber, qualification;

      if (willHaveHigher && i === 0) { // Первое образование с высокой вероятностью высшее
        level = "Высшее";
        institution = randomItem(UNIVERSITIES);
        specialty = randomItem(SPECIALTIES_HIGH);
        graduationYear = 2000 + Math.floor(Math.random() * (Math.min(age, 35) - 18)); // Выпуск не раньше 18 лет и не позже возраста
        diplomaSeries = `Д-${Math.floor(1000 + Math.random() * 9000)}`;
        diplomaNumber = `D-${10000 + Math.floor(Math.random() * 90000)}`;
        qualification = randomItem(["Бакалавр", "Специалист", "Магистр"]);
      } else if (!willHaveHigher && i === 0) { // Если первое не высшее, то среднее профессиональное
        level = "Среднее профессиональное";
        institution = `${randomItem(["Колледж", "Техникум"])} при ${randomItem(UNIVERSITIES)}`;
        specialty = randomItem(SPECIALTIES_VOC);
        graduationYear = 1995 + Math.floor(Math.random() * (Math.min(age, 35) - 16)); // Выпуск не раньше 16 лет
        diplomaSeries = `СП-${Math.floor(1000 + Math.random() * 9000)}`;
        diplomaNumber = `СП-${10000 + Math.floor(Math.random() * 90000)}`;
        qualification = "Специалист";
      } else { // Последующие образования могут быть любыми
        const levelType = Math.random();
        if (levelType < 0.5) {
          level = "Среднее профессиональное";
          institution = `${randomItem(["Колледж", "Техникум", "Училище"])} при ${randomItem(UNIVERSITIES)}`;
          specialty = randomItem(SPECIALTIES_VOC);
          graduationYear = 2000 + Math.floor(Math.random() * (Math.min(age, 45) - 20));
          diplomaSeries = `СП-${Math.floor(1000 + Math.random() * 9000)}`;
          diplomaNumber = `СП-${10000 + Math.floor(Math.random() * 90000)}`;
          qualification = "Специалист";
        } else {
          level = "Высшее";
          institution = randomItem(UNIVERSITIES);
          specialty = randomItem([...SPECIALTIES_HIGH, ...SPECIALTIES_VOC]);
          graduationYear = 2005 + Math.floor(Math.random() * (Math.min(age, 50) - 22));
          diplomaSeries = `Д-${Math.floor(1000 + Math.random() * 9000)}`;
          diplomaNumber = `D-${10000 + Math.floor(Math.random() * 90000)}`;
          qualification = randomItem(["Бакалавр", "Специалист", "Магистр"]);
        }
      }

      education.push({
        level,
        institution,
        specialty,
        graduationYear,
        diplomaSeries,
        diplomaNumber,
        qualification
      });
    }
  }


  // --- ТРУДОВАЯ ДЕЯТЕЛЬНОСТЬ ---
  const work = {
    currentJob: randomItem(COMPANIES),
    position: randomItem(POSITIONS),
    startDate: randomDate(Math.max(1990, new Date().getFullYear() - age + 18), 2022), // Начало работы не раньше 18 лет
  };
  const workHistory = [
    { company: work.currentJob, position: work.position, startDate: work.startDate, endDate: null }, // Текущая работа
  ];
  // Добавляем предыдущие места работы
  if (age > 25 && Math.random() > 0.3) {
    const numPrevJobs = Math.floor(Math.random() * 3) + 1; // 1-3 предыдущих места
    let lastEndDate = new Date(work.startDate);
    for (let i = 0; i < numPrevJobs; i++) {
      const startYear = lastEndDate.getFullYear() - Math.floor(Math.random() * 5) - 1;
      if (startYear < 1990) break; // Не уходим слишком далеко в прошлое
      const endYear = lastEndDate.getFullYear() - 1;
      workHistory.push({
        company: randomItem(COMPANIES),
        position: randomItem(POSITIONS),
        startDate: randomDate(startYear - 2, startYear),
        endDate: randomDate(startYear, endYear)
      });
      lastEndDate = new Date(startYear, 0, 1);
    }
  }

  // --- СЕМЬЯ ---
  const family = [];
  if (gender === "М") {
    if (age > 20 && Math.random() > 0.2) { // 80% мужчин старше 20 женаты
      family.push({
        fullName: `${randomItem(LASTNAMES_F)} ${randomItem(FIRSTNAMES_F)} ${randomItem(PATRONYMICS_F)}`,
        relation: "Жена",
        birthDate: randomDate(1965, Math.min(2005, new Date().getFullYear() - 18)), // Не младше 18
        snils: generateSnils(),
      });
    }
    // Дети
    const numChildren = Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0; // 30% с детьми, 0-3 детей
    for (let i = 0; i < numChildren; i++) {
      const childAge = Math.floor(Math.random() * (age - 18)); // Возраст ребенка
      const childBirthYear = new Date().getFullYear() - childAge;
      family.push({
        fullName: `${randomItem(LASTNAMES_M)} ${randomItem(FIRSTNAMES_M)} ${randomItem(PATRONYMICS_M)}`,
        relation: "Сын",
        birthDate: randomDate(childBirthYear - 1, childBirthYear),
        snils: childAge > 14 ? generateSnils() : "", // СНИЛС с 14 лет
      });
    }
  } else {
    if (age > 20 && Math.random() > 0.2) { // 80% женщин старше 20 замужем
      family.push({
        fullName: `${randomItem(LASTNAMES_M)} ${randomItem(FIRSTNAMES_M)} ${randomItem(PATRONYMICS_M)}`,
        relation: "Муж",
        birthDate: randomDate(1965, Math.min(2005, new Date().getFullYear() - 18)),
        snils: generateSnils(),
      });
    }
    // Дети
    const numChildren = Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0;
    for (let i = 0; i < numChildren; i++) {
      const childAge = Math.floor(Math.random() * (age - 18));
      const childBirthYear = new Date().getFullYear() - childAge;
      family.push({
        fullName: `${randomItem(LASTNAMES_F)} ${randomItem(FIRSTNAMES_F)} ${randomItem(PATRONYMICS_F)}`,
        relation: "Дочь",
        birthDate: randomDate(childBirthYear - 1, childBirthYear),
        snils: childAge > 14 ? generateSnils() : "",
      });
    }
  }

  // --- МЕДИЦИНСКАЯ ИНФОРМАЦИЯ ---
  const medicalInfo = {
    bloodType: randomItem(BLOOD_TYPES),
    rhFactor: Math.random() > 0.5 ? "Положительный" : "Отрицательный",
    allergies: Math.random() > 0.7 ? ["Пыльца", "Цитрусовые"] : [],
    chronicDiseases: Math.random() > 0.8 ? ["Гипертония", "Астма"] : [],
    lastVisitDate: randomDate(2020, 2024),
    insurancePolicy: `ОМС-${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
  };

  // --- ПЕНСИОННЫЕ ДАННЫЕ ---
  const pensionInfo = {
    snils: personalInfo.snils, // Уже есть, но дублируем для удобства
    pensionType: randomItem(["Страховая", "Накопительная"]),
    pensionAmount: Math.floor(10000 + Math.random() * 30000),
    insurancePeriod: `${Math.floor(15 + Math.random() * (age - 18))} лет`, // Страховой стаж
    individualCoefficient: (Math.random() * 2).toFixed(2),
  };

  // --- ИНВАЛИДНОСТЬ ---
  const disability = Math.random() > 0.95 ? {
    group: randomItem(DISABILITY_GROUPS),
    reason: randomItem(DISABILITY_REASONS),
    establishmentDate: randomDate(2000, 2024),
    expiryDate: randomDate(2025, 2035),
    documentNumber: `У-${Math.floor(1000000 + Math.random() * 9000000)}`,
  } : null;

  // --- ЛЬГОТЫ ---
  const benefits = [];
  if (disability) benefits.push("инвалид");
  if (family.filter(f => f.relation === "Сын" || f.relation === "Дочь").length > 2) benefits.push("многодетный");
  if (age > 60) {
      if (Math.random() > 0.7) benefits.push("ветеран");
      if (Math.random() > 0.8) benefits.push("участник ВОВ");
  }

  // --- ДОХОДЫ ---
  const income = {
    mainJob: Math.floor(20000 + Math.random() * 100000),
    additionalJobs: Math.random() > 0.8 ? Math.floor(5000 + Math.random() * 30000) : 0,
    benefits: Math.random() > 0.7 ? Math.floor(2000 + Math.random() * 20000) : 0,
    other: Math.random() > 0.9 ? Math.floor(1000 + Math.random() * 10000) : 0,
  };
  // Вычисляем итог при создании
  income.total = income.mainJob + income.additionalJobs + income.benefits + income.other;

  // --- НАЛОГИ ---
  const taxes = [
    { type: "НДФЛ", amount: Math.floor(income.total * 0.13), year: 2023 },
    { type: "Транспортный налог", amount: Math.floor(1000 + Math.random() * 10000), year: 2023 },
  ];
  if (Math.random() > 0.5) {
    taxes.push({ type: "Имущественный налог", amount: Math.floor(2000 + Math.random() * 15000), year: 2023 });
  }

  // --- ЖИЛЬЕ (Недвижимость) ---
  const housing = [
    {
      type: randomItem(HOUSING_TYPES),
      address: regAddress,
      area: Math.floor(30 + Math.random() * 100),
      ownershipType: randomItem(["Собственность", "Аренда", "Долевая собственность"]),
      cadastralNumber: `30:30:${Math.floor(1000000 + Math.random() * 9000000)}:${Math.floor(100 + Math.random() * 900)}`,
      registrationDate: randomDate(1990, 2024),
    },
  ];
  if (Math.random() > 0.7) {
    housing.push({
      type: randomItem(HOUSING_TYPES),
      address: `${city}, ул. ${randomItem(STREETS)}, ${Math.ceil(Math.random() * 50)}`,
      area: Math.floor(15 + Math.random() * 50),
      ownershipType: "Собственность",
      cadastralNumber: `30:30:${Math.floor(1000000 + Math.random() * 9000000)}:${Math.floor(100 + Math.random() * 900)}`,
      registrationDate: randomDate(2000, 2024),
    });
  }

  // --- ТРАНСПОРТ (Машины) ---
  const vehicles = [];
  if (age > 18 && Math.random() > 0.6) { // 40% взрослых имеют транспорт
    const numVehicles = Math.random() > 0.8 ? 2 : 1; // 20% имеют 2 ТС
    for (let i = 0; i < numVehicles; i++) {
      vehicles.push({
        type: randomItem(VEHICLE_TYPES),
        brand: randomItem(["Toyota", "Lada", "BMW", "Audi", "Mercedes-Benz", "Ford", "Hyundai", "Kia"]),
        model: randomItem(["Camry", "Vesta", "X5", "A6", "C-Class", "Focus", "Solaris", "Rio"]),
        regNumber: `А${Math.floor(100 + Math.random() * 900)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(10 + Math.random() * 90)}`,
        year: 2000 + Math.floor(Math.random() * (new Date().getFullYear() - 2000)),
        vin: `VIN${Math.floor(100000000000000 + Math.random() * 900000000000000)}`,
        enginePower: Math.floor(100 + Math.random() * 300), // л.с.
      });
    }
  }

  // --- ВОИНСКИЙ УЧЕТ ---
  const military = {
    hasMilitaryId: (gender === "М" && age > 18 && age < 50) ? Math.random() > 0.4 : false, // Мужчины 18-50, 60% имеют военный билет
    militaryIdNumber: Math.random() > 0.6 ? `ВУ-${Math.floor(1000000 + Math.random() * 9000000)}` : "",
    rank: Math.random() > 0.9 ? randomItem(["Рядовой", "Ефрейтор", "Младший сержант"]) : "",
    composition: Math.random() > 0.9 ? randomItem(["Запас", "В отставке"]) : "",
    fitnessCategory: Math.random() > 0.3 ? "Годен" : (Math.random() > 0.5 ? "Не годен" : "Ограниченно годен"),
  };

  // --- ТРУДОВОЙ СТАЖ ---
  const workExperience = {
    totalYears: Math.floor(0 + Math.random() * (age - 16)), // С 16 лет
    privilegedYears: Math.random() > 0.8 ? Math.floor(2 + Math.random() * 10) : 0,
    northernYears: Math.random() > 0.9 ? Math.floor(1 + Math.random() * 8) : 0,
  };

  // --- ДАШБОРД ДАННЫЕ ---
  const maritalStatusForDashboard = personalInfo.maritalStatus;
  
  // уровень образования - ИСПРАВЛЕНО для реалистичного распределения
  let educationLevel = "Без образования";
  if (education.length === 0) {
    educationLevel = "Без образования";
  } else {
    // Определяем уровень на основе содержимого массива education
    const hasHigherEducation = education.some(edu => edu.level === "Высшее");
    const hasSecondaryVocational = education.some(edu => edu.level === "Среднее профессиональное");
    
    if (hasHigherEducation) {
      educationLevel = "Высшее";
    } else if (hasSecondaryVocational) {
      educationLevel = "Среднее специальное";
    } else {
      // Если есть записи, но ни одной из вышеперечисленных, остается "Среднее общее"
      // Это покрывает случаи, когда, например, в education пусто или там только записи без level
      // Но по нашей логике выше, если есть элементы, то level будет.
      educationLevel = "Среднее общее";
    }
  }

  let employment = "Работает";
  if (age > 65) employment = "Пенсионер";
  if (Math.random() < 0.05) employment = "Безработный";
  if (Math.random() < 0.03 && age < 25) employment = "Студент";
  const profession = work.position;

  // --- ВОЗВРАЩАЕМЫЙ ОБЪЕКТ ---
  return {
    id: `CIT-${String(id).padStart(5, "0")}`,
    // Основные данные
    personalInfo,
    // Контакты
    contacts,
    // Адреса
    addresses,
    // Документы
    documents,
    // Образование
    education,
    // Трудовая деятельность
    work,
    workHistory,
    // Семья
    family,
    // Медицинская информация
    medicalInfo,
    // Пенсионные данные
    pensionInfo,
    // Инвалидность
    disability,
    // Льготы
    benefits,
    // Доходы
    income,
    // Налоги
    taxes,
    // Жилье (Недвижимость)
    housing,
    // Транспорт (Машины)
    vehicles,
    // Воинский учет
    military,
    // Трудовой стаж
    workExperience,
    // Данные для дашборда
    region: city,
    photo: photo(gender),
    maritalStatus: maritalStatusForDashboard,
    educationLevel, // Используем исправленное значение
    employment,
    profession,
    cases: [
      { topic: "Экология", date: "2025-01-01" },
      { topic: "Льготы", date: "2025-02-01" },
    ],
  };
}

export const mockCitizens = Array.from({ length: 200 }, (_, i) =>
  createCitizen(i + 1)
);
