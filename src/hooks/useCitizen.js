import { useState, useEffect, useCallback } from "react";


const OVERRIDES_KEY = "citizen_overrides_v1";
const SAVE_DELAY_MS = 700; 

function readOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Не удалось прочитать overrides из localStorage:", e);
    return {};
  }
}

function writeOverrides(obj) {
  try {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(obj));
  } catch (e) {
    console.warn("Не удалось записать overrides в localStorage:", e);
  }
}

export function useCitizen(id, citizens) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const applyOverrideTo = useCallback((cit) => {
    if (!cit) return cit;
    const overrides = readOverrides();
    const key = String(cit.id);
    const ov = overrides[key];
    if (!ov) return cit;
    return { ...cit, ...ov };
  }, []);

  useEffect(() => {
    setLoading(true);

    // ищем гражданина в списке (c.id и id могут быть разного типа)
    const found = citizens.find((c) => String(c.id) === String(id)) || null;
    const withOverrides = applyOverrideTo(found);
    setData(withOverrides);
    setLoading(false);
  }, [id, citizens, applyOverrideTo]);

  const save = useCallback(
    (updated) => {
      if (!updated || !updated.id) {
        return Promise.reject(new Error("Неверный объект для сохранения: нет id"));
      }

      setSaving(true);
      setLoading(true);

      return new Promise((resolve) => {
        // эмуляция сетевой задержки
        setTimeout(() => {
          try {
            const overrides = readOverrides();
            const key = String(updated.id);

            // Сохраняем только изменённые поля — сохраняем полный объект обновлённого гражданина
            // чтобы при следующей инициализации можно было применить его поверх сгенерированного.
            overrides[key] = updated;

            writeOverrides(overrides);

            // Обновляем локальный state
            setData(updated);
          } catch (e) {
            console.error("Ошибка при сохранении гражданина в localStorage:", e);
          } finally {
            setSaving(false);
            setLoading(false);
            resolve(true);
          }
        }, SAVE_DELAY_MS);
      });
    },
    [setData]
  );

  // Возвращаем loading || saving как loading внешнему коду, а saving отдельно если нужно
  return { data, setData, save, loading: loading || saving, saving };
}
