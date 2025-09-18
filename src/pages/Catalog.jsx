import { useState } from "react";

function Catalog({ citizens }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 10;

  const filteredCitizens = citizens.filter((c) => {
    const nameMatch = c.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const regionMatch = !regionFilter || c.region === regionFilter;
    const genderMatch = !genderFilter || c.gender === genderFilter;
    return nameMatch && regionMatch && genderMatch;
  });

  const sortedCitizens = [...filteredCitizens].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedCitizens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCitizens = sortedCitizens.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const uniqueRegions = [...new Set(citizens.map((c) => c.region))];
  const uniqueGenders = ["М", "Ж"];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Картотека</h1>
      <p>Всего записей: 100000+ (показываем 150 для демо)</p>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            marginRight: "10px",
            width: "300px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <select
          value={regionFilter}
          onChange={(e) => {
            setRegionFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="">Все регионы</option>
          {uniqueRegions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="">Все полы</option>
          {uniqueGenders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1976d2", color: "white" }}>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => handleSort("fullName")}
            >
              ФИО{" "}
              {sortField === "fullName" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => handleSort("birthDate")}
            >
              Дата рождения{" "}
              {sortField === "birthDate" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => handleSort("region")}
            >
              Регион{" "}
              {sortField === "region" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>СНИЛС</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCitizens.map((c) => (
            <tr
              key={c.id}
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = `/catalog/${c.id}`)}
            >
              <td>{c.fullName}</td>
              <td>{c.birthDate}</td>
              <td>{c.region}</td>
              <td>{c.citizenshipStatus || "Не указан"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>
        <span>
          {" "}
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
    </div>
  );
}
export default Catalog;
