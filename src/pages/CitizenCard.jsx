import { useState } from "react";
import { useParams } from "react-router-dom";

function CitizenCard({ citizens }) {
  const { id } = useParams();
  const citizen = citizens.find((c) => c.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("personal");

  if (!citizen) return <div>Гражданин не найден</div>;

  const tabs = [
    { key: "personal", label: "Основные сведения" },
    { key: "family", label: "Семья" },
    { key: "education", label: "Образование" },
    { key: "work", label: "Работа" },
    { key: "benefits", label: "Льготы" },
    { key: "appeals", label: "Обращения" },
  ];

  const renderPersonalTab = () => (
    <div>
      <h2>Личные данные</h2>
      <label>
        ФИО: <input type="text" defaultValue={citizen.fullName} />
      </label>
      <br />
      <label>
        Дата рождения: <input type="date" defaultValue={citizen.birthDate} />
      </label>
      <br />
      <label>
        Пол:{" "}
        <select defaultValue={citizen.gender}>
          <option>М</option>
          <option>Ж</option>
        </select>
      </label>
      <br />
      <label>
        СНИЛС: <input type="text" defaultValue={citizen.snils} />
      </label>
      <br />
      <label>
        ИНН: <input type="text" defaultValue={citizen.inn || ""} />
      </label>
      <br />
      <label>
        Паспорт серия:{" "}
        <input type="text" defaultValue={citizen.passport?.series || ""} />
      </label>
      <br />
      <label>
        Паспорт номер:{" "}
        <input type="text" defaultValue={citizen.passport?.number || ""} />
      </label>
      <br />
      <label>
        Кем выдан:{" "}
        <input type="text" defaultValue={citizen.passport?.issuedBy || ""} />
      </label>
      <br />
      <label>
        Дата выдачи:{" "}
        <input type="date" defaultValue={citizen.passport?.issueDate || ""} />
      </label>
      <br />
      <label>
        Гражданство:{" "}
        <input type="text" defaultValue={citizen.citizenship || ""} />
      </label>
      <br />
      <label>
        Email: <input type="email" defaultValue={citizen.email || ""} />
      </label>
      <br />
      <label>
        Телефон: <input type="tel" defaultValue={citizen.phone || ""} />
      </label>
      <br />
      <label>
        Адрес регистрации: <textarea defaultValue={citizen.regAddress || ""} />
      </label>
      <br />
      <label>
        Адрес проживания: <textarea defaultValue={citizen.factAddress || ""} />
      </label>
      <br />
      <label>
        Семейное положение:{" "}
        <select defaultValue={citizen.maritalStatus || "холост"}>
          <option>женат</option>
          <option>холост</option>
          <option>разведен</option>
        </select>
      </label>
      <br />
      <label>
        Уровень образования:{" "}
        <select defaultValue={citizen.educationLevel || "среднее"}>
          <option>среднее</option>
          <option>высшее</option>
          <option>научное</option>
        </select>
      </label>
      <br />
      <label>
        Сумма пенсии:{" "}
        <input type="number" defaultValue={citizen.pensionAmount || 0} />
      </label>
      <br />
      <label>
        Группа инвалидности:{" "}
        <input type="number" defaultValue={citizen.disabilityGroup || ""} />
      </label>
      <br />
      <label>
        Статус гражданства:{" "}
        <input
          type="text"
          defaultValue={citizen.citizenshipStatus || "Гражданин"}
        />
      </label>
      <br />
      <label>
        Регион: <input type="text" defaultValue={citizen.region} />
      </label>
    </div>
  );

  const renderFamilyTab = () => (
    <div>
      <h2>Члены семьи</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Родство</th>
            <th>Дата рождения</th>
            <th>СНИЛС</th>
          </tr>
        </thead>
        <tbody>
          {citizen.family?.map((member, index) => (
            <tr key={index}>
              <td>{member.fullName || "Не указано"}</td>
              <td>{member.relation || "Не указано"}</td>
              <td>{member.birthDate || "Не указано"}</td>
              <td>{member.snils || "Не указано"}</td>
            </tr>
          )) || (
            <tr>
              <td colSpan="4">Нет данных</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderEducationTab = () => (
    <div>
      <h2>Образование</h2>
      <ul>
        {citizen.education?.map((edu, index) => (
          <li key={index}>
            <strong>{edu.institution || "Не указано"}</strong>, специальность:{" "}
            {edu.specialty || "Не указано"}, год:{" "}
            {edu.graduationYear || "Не указано"}, диплом №:{" "}
            {edu.diplomaNum || "Не указано"}
          </li>
        )) || <li>Нет данных</li>}
      </ul>
    </div>
  );

  const renderWorkTab = () => (
    <div>
      <h2>Трудовая деятельность</h2>
      <p>Текущее место работы: {citizen.work?.currentJob || "Не указано"}</p>
      <p>Должность: {citizen.work?.position || "Не указано"}</p>
      <p>Дата начала: {citizen.work?.startDate || "Не указано"}</p>
    </div>
  );

  const renderBenefitsTab = () => (
    <div>
      <h2>Социальные льготы</h2>
      <ul>
        {citizen.benefits?.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        )) || <li>Нет данных</li>}
      </ul>
      <label>
        Инвалид:{" "}
        <input
          type="checkbox"
          defaultChecked={citizen.benefits?.includes("инвалид") || false}
        />
      </label>
      <br />
      <label>
        Многодетный:{" "}
        <input
          type="checkbox"
          defaultChecked={citizen.benefits?.includes("многодетный") || false}
        />
      </label>
      <br />
      <label>
        Ветеран:{" "}
        <input
          type="checkbox"
          defaultChecked={citizen.benefits?.includes("ветеран") || false}
        />
      </label>
    </div>
  );

  const renderAppealsTab = () => (
    <div>
      <h2>Обращения граждан (из ППК РЭО)</h2>
      <ul>
        {[
          "Тема - Экология, дата - 2025-01-01, статус - В обработке",
          "Тема - Льготы, дата - 2025-02-01, статус - Закрыто",
          "Тема - Жилье, дата - 2025-03-01, статус - Отклонено",
        ].map((appeal, index) => (
          <li key={index}>{appeal}</li>
        ))}
      </ul>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalTab();
      case "family":
        return renderFamilyTab();
      case "education":
        return renderEducationTab();
      case "work":
        return renderWorkTab();
      case "benefits":
        return renderBenefitsTab();
      case "appeals":
        return renderAppealsTab();
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Карточка гражданина: {citizen.fullName}</h1>
      <img
        src={citizen.photo || "https://via.placeholder.com/100"}
        alt="Фото"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key ? "#1976d2" : "#ddd",
              color: activeTab === tab.key ? "white" : "black",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderTabContent()}
      <button style={{ marginTop: "20px" }}>Сохранить изменения</button>
    </div>
  );
}

export default CitizenCard;
