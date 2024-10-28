import BarChartComp from "@/components/charts/BarChartComp";
import DashboardCards from "@/components/DashboardCards";
import PieChart from "@/components/PieChart";
import DashboardCalendar from "@/components/DashboardCalendar";
import { Shirt, PhilippinePeso } from "lucide-react";
export default function Dashboard() {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  };

  const pieData = {
    type: "pie",
    labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    width: 200,
    height: 500,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-14 overflow-auto p-5 lg:flex-col">
        <div className="flex flex-1 gap-2">
          <h1 className="flex-1 text-2xl font-bold text-accent">Dashboard</h1>
          <DashboardCalendar />
        </div>
        <section className="flex h-auto w-full flex-col justify-between gap-2 lg:h-44 lg:flex-row">
          <DashboardCards
            title={
              <>
                <p className="stat-title flex-1">Total Orders</p>
                <Shirt />
              </>
            }
            description={<span className="stat-desc">Orders Total</span>}
            content={<span className="stat-value">12</span>}
            footer={<span className="stat-desc">Last 7 days</span>}
          />

          <DashboardCards
            title={
              <>
                <p className="stat-title flex-1">Total Revenue</p>
                <PhilippinePeso />
              </>
            }
            description={<span className="stat-desc">Revenue Total</span>}
            content={<span className="stat-value">12</span>}
            footer={<span className="stat-desc">Last 7 days</span>}
          />
          <DashboardCards
            title={
              <>
                <p className="stat-title flex-1">Total Revenue</p>
                <PhilippinePeso />
              </>
            }
            description={<span className="stat-desc">Revenue Total</span>}
            content={<span className="stat-value">12</span>}
            footer={<span className="stat-desc">Last 7 days</span>}
          />
          <DashboardCards
            title={
              <>
                <p className="stat-title flex-1">Total Revenue</p>
                <PhilippinePeso />
              </>
            }
            description={<span className="stat-desc">Revenue Total</span>}
            content={<span className="stat-value">12</span>}
            footer={<span className="stat-desc">Last 7 days</span>}
          />
        </section>
        <section className="flex flex-1 flex-col justify-between gap-2 lg:flex-row">
          <DashboardCards
            content={<BarChartComp config={chartConfig} data={chartData} />}
          />
          <DashboardCards
            content={<BarChartComp config={chartConfig} data={chartData} />}
          />
        </section>
      </section>
    </>
  );
}
