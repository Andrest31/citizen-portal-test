import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ citizens }) {
  const total = citizens.length;
  const avgAge = citizens.reduce((sum, c) => sum + new Date().getFullYear() - new Date(c.birthDate).getFullYear(), 0) / total;
  const regionCounts = citizens.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(regionCounts),
    datasets: [{
      data: Object.values(regionCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Всего граждан: {total}</p>
      <p>Средний возраст: {avgAge.toFixed(1)} лет</p>
      <p>Пример: {citizens[0]?.fullName || 'Нет данных'}</p>
      <div style={{ width: '400px', height: '400px' }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
export default Dashboard;