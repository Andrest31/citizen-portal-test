// src/workers/catalogWorker.js
// Воркер для фильтрации граждан

function calcAgeFromBirth(birthDate) {
  if (!birthDate) return null;
  const by = new Date(birthDate);
  if (isNaN(by)) return null;
  const now = new Date();
  let age = now.getFullYear() - by.getFullYear();
  const m = now.getMonth() - by.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < by.getDate())) age--;
  return age;
}

self.onmessage = (e) => {
  const { citizens, filters } = e.data;

  const {
    searchTerm,
    regionFilter,
    genderFilter,
    ageRange,
    educationFilter,
    professionFilter,
    benefitsFilter,
    hasVehicle,
    hasHousing,
  } = filters;

  const sTerm = (searchTerm || "").trim().toLowerCase();
  const pTerm = (professionFilter || "").trim().toLowerCase();
  const [ageMin, ageMax] = ageRange || [0, 100];
  const eduSet = new Set(educationFilter || []);
  const benefitsSet = new Set(benefitsFilter || []);

  const filtered = citizens.filter((c) => {
    const fullName = (c.personalInfo?.fullName || "").toLowerCase();
    if (sTerm && !fullName.includes(sTerm)) return false;

    if (regionFilter && c.region !== regionFilter) return false;
    if (genderFilter && (c.personalInfo?.gender || "") !== genderFilter) return false;

    let age = c.personalInfo?.age ?? calcAgeFromBirth(c.personalInfo?.birthDate);
    if (typeof age === "number") {
      if (age < ageMin || age > ageMax) return false;
    } else return false;

    if (eduSet.size > 0) {
      if (!c.educationLevel || !eduSet.has(c.educationLevel)) return false;
    }

    if (pTerm) {
      const prof = (c.profession || "").toLowerCase();
      if (!prof.includes(pTerm)) return false;
    }

    if (benefitsSet.size > 0) {
      const hasAny = (c.benefits || []).some((b) => benefitsSet.has(b));
      if (!hasAny) return false;
    }

    if (hasVehicle && (!Array.isArray(c.vehicles) || c.vehicles.length === 0)) return false;
    if (hasHousing && (!Array.isArray(c.housing) || c.housing.length === 0)) return false;

    return true;
  });

  self.postMessage(filtered);
};
