import { PieChart } from "../../charts/Pie";

const pieData = [
  {
    country: "Lithuania",
    litres: 501.9
  },
  {
    country: "Czech Republic",
    litres: 301.9
  },
  {
    country: "Ireland",
    litres: 201.1
  },
  {
    country: "Germany",
    litres: 165.8
  },
  {
    country: "Australia",
    litres: 139.9
  },
  {
    country: "Austria",
    litres: 1280.3
  }
];
export const DashboardPage = () => {

  return (
    <section>
      <p>Dashboard Page</p>
      <PieChart data={pieData}></PieChart>
    </section>
  )
}