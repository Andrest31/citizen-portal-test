// src/data/citizens.js

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .slice(0, 10);
}

function generateSnils() {
  const num = () => String(Math.floor(100 + Math.random() * 900));
  return `${num()}-${num()}-${num()} ${Math.floor(10 + Math.random() * 90)}`;
}

function photo(gender) {
  return gender === "М"
    ? `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`
    : `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 90)}.jpg`;
}

// --- Основной генератор ---
export function createCitizen(id) {
  const gender = Math.random() > 0.5 ? "М" : "Ж";
  const firstNamesM = ["Алексей", "Иван", "Павел", "Сергей"];
  const firstNamesF = ["Анна", "Мария", "Елена", "Ольга"];
  const lastNamesM = ["Иванов", "Петров", "Сидоров"];
  const lastNamesF = ["Иванова", "Петрова", "Сидорова"];
  const patronymicsM = ["Иванович", "Петрович"];
  const patronymicsF = ["Ивановна", "Петровна"];

  const first = gender === "М" ? randomItem(firstNamesM) : randomItem(firstNamesF);
  const last = gender === "М" ? randomItem(lastNamesM) : randomItem(lastNamesF);
  const patronymic = gender === "М" ? randomItem(patronymicsM) : randomItem(patronymicsF);
  const fullName = `${last} ${first} ${patronymic}`;

  const birthDate = randomDate(1960, 2005);
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();

  // --- Основные поля ---
  const citizen = {
    id: `CIT-${String(id).padStart(5, "0")}`,
    fullName,
    gender,
    birthDate,
    age,
    snils: generateSnils(),
    inn: `77${Math.floor(100000000 + Math.random() * 899999999)}`,
    passport: {
      series: `${Math.floor(1000 + Math.random() * 9000)}`,
      number: `${Math.floor(100000 + Math.random() * 900000)}`,
      issuedBy: "ОВД Москвы",
      issuedDate: randomDate(2000, 2020),
    },
    nationality: "Русский",
    citizenship: "Россия",
    photo: photo(gender),
    maritalStatus: randomItem(["Женат/Замужем", "Холост/Не замужем", "Разведён/Разведена"]),

    // --- Контакты и адреса ---
    email: `${first.toLowerCase()}.${last.toLowerCase()}@mail.ru`,
    phone: `+7 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    mobilePhone: `+7 9${Math.floor(100000000 + Math.random() * 899999999)}`,
    regAddress: `г. Москва, ул. Ленина, д. ${Math.ceil(Math.random() * 50)}`,
    factAddress: `г. Москва, ул. Кирова, д. ${Math.ceil(Math.random() * 50)}`,
    workAddress: "г. Москва, ул. Советская, 10",
    postalCode: "101000",
    region: "Москва",
    country: "Россия",
    emergencyContactName: "Иван Иванов",
    emergencyContactPhone: "+7 999 123-45-67",

    // --- Связанные сущности ---
    education: [
      {
        institution: "МГУ",
        specialty: "Программная инженерия",
        graduationYear: 2010,
        diplomaNum: "D-12345",
        educationLevel: "Высшее",
        studyType: "Очное",
      },
    ],
    work: [
      {
        company: "Яндекс",
        position: "Разработчик",
        startDate: "2015-01-01",
        endDate: null,
        contractType: "Бессрочный",
        salary: 150000,
        department: "IT",
        supervisor: "Петров П.П.",
      },
    ],
    family: [
      {
        fullName: "Иванова Анна Петровна",
        relation: "Жена",
        birthDate: "1985-03-15",
        gender: "Ж",
        snils: generateSnils(),
        phone: "+7 999 111-22-33",
        isDependent: false,
      },
    ],
    realEstate: [
      {
        type: "Квартира",
        address: "Москва, ул. Ленина, д. 1",
        area: 56,
        ownershipType: "Собственность",
        cadastralNumber: "77:01:000401:1234",
        acquisitionDate: "2018-06-10",
      },
    ],
    cars: [
      {
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        vin: "XW8ZZZ61ZHG123456",
        plateNumber: "А123ВС77",
        ownershipType: "Собственность",
      },
    ],
    credits: [
      {
        bankName: "Сбер",
        accountNumber: "40817810000001234567",
        creditType: "Ипотека",
        creditAmount: 3500000,
        creditBalance: 2500000,
        startDate: "2019-01-01",
        endDate: "2039-01-01",
      },
    ],
    medical: {
      bloodType: "A+",
      chronicDiseases: ["Гипертония"],
      disabilities: [],
      allergies: ["Пыльца"],
      insuranceNumber: "ОМС-123456",
      hospitalAttached: "Городская поликлиника №5",
    },
    taxes: {
      taxId: `77${Math.floor(100000000 + Math.random() * 899999999)}`,
      taxRegion: "77",
      propertyTaxPaid: true,
      transportTaxPaid: false,
      insurancePolicies: [
        { type: "ОСАГО", number: "111222333", validUntil: "2025-01-01" },
      ],
    },
    legalCases: [
      {
        caseId: "CASE-123",
        type: "Административное",
        courtName: "Московский суд",
        dateStart: "2020-01-01",
        dateEnd: "2020-06-01",
        result: "Закрыто",
      },
    ],
    military: {
      status: "Запас",
      rank: "Сержант",
      unit: "В/ч 12345",
      conscriptionYear: 2005,
      specialty: "Связист",
    },
    extra: {
      hobbies: ["Рыбалка", "Программирование"],
      socialNetworks: ["vk.com/ivanov"],
      preferredLanguage: "ru",
      digitalSignatureId: "DS-98765",
      biometricData: "hash12345",
      migrationStatus: "Гражданин РФ",
    },
  };

  return citizen;
}

export const mockCitizens = Array.from({ length: 200 }, (_, i) =>
  createCitizen(i + 1)
);
