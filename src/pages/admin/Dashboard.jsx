
import DashboardCards from "@/components/DashboardCards";
import CustomPieChart from "@/components/charts/CustomPieChart";
import DashboardCalendar from "@/components/DashboardCalendar";
import { Shirt, PhilippinePeso } from "lucide-react";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { calculateDifference, dateToday } from "@/lib/functions";

export default function Dashboard() {
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`,
    to: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`,
  });

  const dayDifference = calculateDifference(date);
  const dashBoardCardsData = [
    {
      title: "Total Orders",
      description: "Revenue Total",
      icon: <Shirt />,
      content: "12",
      footer: `${isNaN(dayDifference) ? dayDifference : `Last ${dayDifference} Days`}  `,
    },
    {
      title: "Total Sales",
      description: "Revenue Total",
      icon: <PhilippinePeso />,
      content: "12",
      footer: `${isNaN(dayDifference) ? dayDifference : `Last ${dayDifference} Days`}  `,
    },
  ];
  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-2 p-2 lg:flex-col">
        <section className="flex items-center gap-2">
          <h1 className="flex-1 text-xl font-bold text-accent">Dashboard</h1>
          <DashboardCalendar setDate={setDate} date={date} />
        </section>
        <section className="flex max-h-56 flex-shrink-0 flex-grow flex-col justify-between gap-2 overflow-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900 lg:flex-row">
          {dashBoardCardsData.map((item) => (
            <DashboardCards
              key={item.title}
              onClick={() => navigate("/admin/sales-history")}
              title={
                <>
                  <p className="stat-title flex-1">{item.title}</p>
                  {item.icon}
                </>
              }
              description={
                <span className="stat-desc">{item.description}</span>
              }
              content={<span className="stat-value">{item.content}</span>}
              footer={<span className="stat-desc">{item.footer}</span>}
            />
          ))}
        </section>
        <section className="flex flex-grow flex-col justify-between gap-2 outline lg:flex-row">
          <DashboardCards
            className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
            content={<CustomPieChart date={date} />}
          />
          <DashboardCards
            className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
            content={<CustomAreaChart date={date} />}
          />
        </section>
      </section>
    </>
  );
}
