import { useState, useEffect } from "react";

export function useCitizen(id, citizens) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fromLocal = localStorage.getItem(`citizen_${id}`);
    if (fromLocal) {
      setData(JSON.parse(fromLocal));
      setLoading(false);
      return;
    }
    const c = citizens.find((x) => x.id === Number(id));
    setData(c ? { ...c } : null);
    setLoading(false);
  }, [id, citizens]);

  const save = (newData) => {
    setData(newData);
    localStorage.setItem(`citizen_${id}`, JSON.stringify(newData));
  };

  return { data, setData, save, loading };
}
