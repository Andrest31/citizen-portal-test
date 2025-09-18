function Dashboard({ citizens }) {
  const total = citizens.length;
  const avgAge = citizens.reduce((sum, c) => sum + new Date().getFullYear() - new Date(c.birthDate).getFullYear(), 0) / total;
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Всего граждан: {total}</p>
      <p>Средний возраст: {avgAge.toFixed(1)} лет</p>
      <p>Пример: {citizens[0]?.fullName || 'Нет данных'}</p>
    </div>
  );
}
export default Dashboard;