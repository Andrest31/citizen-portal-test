import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard({ citizens }) {
  const total = citizens.length;
  const avgAge = citizens.reduce((sum, c) => sum + (new Date().getFullYear() - new Date(c.birthDate).getFullYear()), 0) / total;
  const genderCounts = citizens.reduce((acc, c) => {
    acc[c.gender] = (acc[c.gender] || 0) + 1;
    return acc;
  }, {});
  const regionCounts = citizens.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});
  const ageDistribution = citizens.reduce((acc, c) => {
    const age = new Date().getFullYear() - new Date(c.birthDate).getFullYear();
    acc[Math.floor(age / 10) * 10] = (acc[Math.floor(age / 10) * 10] || 0) + 1;
    return acc;
  }, {});
  const avgAgeByRegion = Object.fromEntries(
    Object.keys(regionCounts).map(region => [
      region,
      citizens.filter(c => c.region === region).reduce((sum, c) => sum + (new Date().getFullYear() - new Date(c.birthDate).getFullYear()), 0) / regionCounts[region]
    ])
  );

  const pieData = {
    labels: Object.keys(genderCounts),
    datasets: [{
      data: Object.values(genderCounts),
      backgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };

  const barData = {
    labels: Object.keys(ageDistribution),
    datasets: [{
      label: 'Возрастное распределение',
      data: Object.values(ageDistribution),
      backgroundColor: '#4BC0C0',
    }],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: '1 1 200px' }}>
          <p>Всего граждан: {total} (симуляция 100k+)</p>
          <p>Средний возраст: {avgAge.toFixed(1)} лет</p>
        </div>
        <div style={{ width: '300px', height: '300px', flex: '1 1 300px' }}>
          <Pie data={pieData} />
        </div>
        <div style={{ width: '400px', height: '300px', flex: '1 1 400px' }}>
          <Bar data={barData} />
        </div>
        <div style={{ flex: '1 1 300px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Средний возраст по регионам:</h3>
          <ul>
            {Object.entries(avgAgeByRegion).map(([region, age]) => (
              <li key={region}>{region}: {age.toFixed(1)} лет</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;