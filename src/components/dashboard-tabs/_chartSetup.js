// регистрируем общие компоненты chart.js один раз
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  BubbleController,
  Tooltip,
  Legend,
  BarController,
  PieController,
  PolarAreaController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  BubbleController,
  Tooltip,
  Legend,
  BarController,
  PieController,
  PolarAreaController
);

export default ChartJS;
