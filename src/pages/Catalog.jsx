import { useState } from 'react';

function Catalog({ citizens }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCitizens = citizens.filter(c => {
    const nameMatch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const regionMatch = !regionFilter || c.region === regionFilter;
    const genderMatch = !genderFilter || c.gender === genderFilter;
    return nameMatch && regionMatch && genderMatch;
  });

  const totalPages = Math.ceil(filteredCitizens.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCitizens = filteredCitizens.slice(startIndex, startIndex + itemsPerPage);

  const uniqueRegions = [...new Set(citizens.map(c => c.region))];
  const uniqueGenders = ['М', 'Ж'];

  return (
    <div>
      <h1>Картотека</h1>
      <p>Всего записей: 100000+ (показываем 150 для демо)</p>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          style={{ padding: '10px', marginRight: '10px', width: '300px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <select
          value={regionFilter}
          onChange={(e) => { setRegionFilter(e.target.value); setCurrentPage(1); }}
          style={{ padding: '10px', marginRight: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">Все регионы</option>
          {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select
          value={genderFilter}
          onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="">Все полы</option>
          {uniqueGenders.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1976d2', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ФИО</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Дата рождения</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Регион</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCitizens.map(c => (
            <tr key={c.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.fullName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.birthDate}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{c.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Предыдущая</button>
        <span> Страница {currentPage} из {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Следующая</button>
      </div>
    </div>
  );
}
export default Catalog;