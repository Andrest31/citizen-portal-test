import { useState, useEffect } from "react";

export function useCitizen(id, citizens) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // приводим id и у граждан к строке, чтобы исключить проблему "5" !== 5
    const found = citizens.find((c) => String(c.id) === String(id));

    setData(found || null);
    setLoading(false);
  }, [id, citizens]);

  const save = (updated) => {
    console.log("Сохраняем", updated);
    // здесь позже можно будет добавить API-запрос или локальное обновление
  };

  return { data, setData, save, loading };
}
