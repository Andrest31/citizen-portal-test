import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CitizenCard({ citizens }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [citizenData, setCitizenData] = useState(null);

  useEffect(() => {
    const citizen = citizens.find(c => c.id === parseInt(id));
    if (citizen) {
      setCitizenData({
        ...citizen,
        passport: { ...citizen.passport },
        family: [...(citizen.family || [])],
        education: [...(citizen.education || [])],
        work: { ...citizen.work },
        benefits: [...(citizen.benefits || [])],
      });
    }
  }, [id, citizens]);

  if (!citizenData) return <div>Гражданин не найден</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitizenData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, field, subField) => {
    const { value } = e.target;
    setCitizenData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleFamilyChange = (index, field, value) => {
    setCitizenData(prev => ({
      ...prev,
      family: prev.family.map((member, i) => i === index ? { ...member, [field]: value } : member),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setCitizenData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => i === index ? { ...edu, [field]: value } : edu),
    }));
  };

  const handleBenefitsChange = (e) => {
    const { value, checked } = e.target;
    setCitizenData(prev => ({
      ...prev,
      benefits: checked
        ? [...prev.benefits, value]
        : prev.benefits.filter(b => b !== value),
    }));
  };

  const tabs = [
    { key: 'personal', label: 'Основные сведения' },
    { key: 'family', label: 'Семья' },
    { key: 'education', label: 'Образование' },
    { key: 'work', label: 'Работа' },
    { key: 'benefits', label: 'Льготы' },
    { key: 'appeals', label: 'Обращения' },
  ];

  const renderPersonalTab = () => (
    <div>
      <h2>Личные данные</h2>
      <label>ФИО: <input type="text" name="fullName" value={citizenData.fullName} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Дата рождения: <input type="date" name="birthDate" value={citizenData.birthDate} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Пол: <select name="gender" value={citizenData.gender} onChange={handleInputChange} disabled={!isEditing}><option>М</option><option>Ж</option></select></label><br />
      <label>СНИЛС: <input type="text" name="snils" value={citizenData.snils} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>ИНН: <input type="text" name="inn" value={citizenData.inn || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Паспорт серия: <input type="text" value={citizenData.passport?.series || ''} onChange={(e) => handleNestedChange(e, 'passport', 'series')} disabled={!isEditing} /></label><br />
      <label>Паспорт номер: <input type="text" value={citizenData.passport?.number || ''} onChange={(e) => handleNestedChange(e, 'passport', 'number')} disabled={!isEditing} /></label><br />
      <label>Кем выдан: <input type="text" value={citizenData.passport?.issuedBy || ''} onChange={(e) => handleNestedChange(e, 'passport', 'issuedBy')} disabled={!isEditing} /></label><br />
      <label>Дата выдачи: <input type="date" value={citizenData.passport?.issueDate || ''} onChange={(e) => handleNestedChange(e, 'passport', 'issueDate')} disabled={!isEditing} /></label><br />
      <label>Гражданство: <input type="text" name="citizenship" value={citizenData.citizenship || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Email: <input type="email" name="email" value={citizenData.email || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Телефон: <input type="tel" name="phone" value={citizenData.phone || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Адрес регистрации: <textarea name="regAddress" value={citizenData.regAddress || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Адрес проживания: <textarea name="factAddress" value={citizenData.factAddress || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Семейное положение: <select name="maritalStatus" value={citizenData.maritalStatus || 'холост'} onChange={handleInputChange} disabled={!isEditing}><option>женат</option><option>холост</option><option>разведен</option></select></label><br />
      <label>Уровень образования: <select name="educationLevel" value={citizenData.educationLevel || 'среднее'} onChange={handleInputChange} disabled={!isEditing}><option>среднее</option><option>высшее</option><option>научное</option></select></label><br />
      <label>Сумма пенсии: <input type="number" name="pensionAmount" value={citizenData.pensionAmount || 0} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Группа инвалидности: <input type="number" name="disabilityGroup" value={citizenData.disabilityGroup || ''} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Статус гражданства: <input type="text" name="citizenshipStatus" value={citizenData.citizenshipStatus || 'Гражданин'} onChange={handleInputChange} disabled={!isEditing} /></label><br />
      <label>Регион: <input type="text" name="region" value={citizenData.region} onChange={handleInputChange} disabled={!isEditing} /></label>
    </div>
  );

  const renderFamilyTab = () => (
    <div>
      <h2>Члены семьи</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ФИО</th><th>Родство</th><th>Дата рождения</th><th>СНИЛС</th></tr>
        </thead>
        <tbody>
          {citizenData.family.map((member, index) => (
            <tr key={index}>
              <td><input type="text" value={member.fullName} onChange={(e) => handleFamilyChange(index, 'fullName', e.target.value)} disabled={!isEditing} /></td>
              <td><input type="text" value={member.relation} onChange={(e) => handleFamilyChange(index, 'relation', e.target.value)} disabled={!isEditing} /></td>
              <td><input type="date" value={member.birthDate} onChange={(e) => handleFamilyChange(index, 'birthDate', e.target.value)} disabled={!isEditing} /></td>
              <td><input type="text" value={member.snils} onChange={(e) => handleFamilyChange(index, 'snils', e.target.value)} disabled={!isEditing} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEducationTab = () => (
    <div>
      <h2>Образование</h2>
      <ul>
        {citizenData.education.map((edu, index) => (
          <li key={index}>
            <input type="text" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} disabled={!isEditing} />,
            специальность: <input type="text" value={edu.specialty} onChange={(e) => handleEducationChange(index, 'specialty', e.target.value)} disabled={!isEditing} />,
            год: <input type="number" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)} disabled={!isEditing} />,
            диплом №: <input type="text" value={edu.diplomaNum} onChange={(e) => handleEducationChange(index, 'diplomaNum', e.target.value)} disabled={!isEditing} />
          </li>
        ))}
      </ul>
    </div>
  );

  const renderWorkTab = () => (
    <div>
      <h2>Трудовая деятельность</h2>
      <p>Текущее место работы: <input type="text" value={citizenData.work.currentJob} onChange={(e) => handleNestedChange(e, 'work', 'currentJob')} disabled={!isEditing} /></p>
      <p>Должность: <input type="text" value={citizenData.work.position} onChange={(e) => handleNestedChange(e, 'work', 'position')} disabled={!isEditing} /></p>
      <p>Дата начала: <input type="date" value={citizenData.work.startDate} onChange={(e) => handleNestedChange(e, 'work', 'startDate')} disabled={!isEditing} /></p>
    </div>
  );

  const renderBenefitsTab = () => (
    <div>
      <h2>Социальные льготы</h2>
      <label>Инвалид: <input type="checkbox" value="инвалид" checked={citizenData.benefits.includes('инвалид')} onChange={handleBenefitsChange} disabled={!isEditing} /></label><br />
      <label>Многодетный: <input type="checkbox" value="многодетный" checked={citizenData.benefits.includes('многодетный')} onChange={handleBenefitsChange} disabled={!isEditing} /></label><br />
      <label>Ветеран: <input type="checkbox" value="ветеран" checked={citizenData.benefits.includes('ветеран')} onChange={handleBenefitsChange} disabled={!isEditing} /></label>
    </div>
  );

  const renderAppealsTab = () => (
    <div>
      <h2>Обращения граждан (из ППК РЭО)</h2>
      <ul>
        {['Тема - Экология, дата - 2025-01-01, статус - В обработке', 'Тема - Льготы, дата - 2025-02-01, статус - Закрыто', 'Тема - Жилье, дата - 2025-03-01, статус - Отклонено'].map((appeal, index) => (
          <li key={index}>{appeal}</li>
        ))}
      </ul>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return renderPersonalTab();
      case 'family': return renderFamilyTab();
      case 'education': return renderEducationTab();
      case 'work': return renderWorkTab();
      case 'benefits': return renderBenefitsTab();
      case 'appeals': return renderAppealsTab();
      default: return null;
    }
  };

  const saveChanges = () => {
    localStorage.setItem(`citizen_${id}`, JSON.stringify(citizenData));
    setIsEditing(false);
    alert('Изменения сохранены!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Карточка гражданина: {citizenData.fullName}</h1>
      <img src={citizenData.photo || 'https://via.placeholder.com/100'} alt="Фото" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <button onClick={() => setIsEditing(!isEditing)} style={{ marginBottom: '20px' }}>
        {isEditing ? 'Отменить редактирование' : 'Редактировать'}
      </button>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ background: activeTab === tab.key ? '#1976d2' : '#ddd', color: activeTab === tab.key ? 'white' : 'black' }}>
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
      {isEditing && <button onClick={saveChanges} style={{ marginTop: '20px' }}>Сохранить изменения</button>}
    </div>
  );
}

export default CitizenCard;