import DashboardCards from "@/components/DashboardCards";
import CustomBarChart from "@/components/charts/CustomBarChart";
import DashboardCalendar from "@/components/DashboardCalendar";
import { Shirt, PhilippinePeso, History, Divide } from "lucide-react";
import CustomAreaChart from "@/components/charts/CustomAreaChart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  calculateDifference,
  getCurrentDate,
  formatCurrency,
} from "@/lib/functions";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

export default function Dashboard() {
  const navigate = useNavigate();
  const [date, setDate] = useState();

  const dayDifference = calculateDifference(date);

  const {
    data: salesData,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/api/overall/fetch/dashboard`,
    {},
    "Error fetching Sales History",
  );
  const dashBoardCardsData = [
    {
      title: "Total Orders",
      description: "Revenue Total",
      icon: <Shirt />,
      content: "12",
      footer: `${isNaN(dayDifference) ? dayDifference : `Last ${dayDifference} Days`}  `,
      location: "/admin/orders",
    },
    {
      title: "Total Sales",
      description: "Revenue Total",
      icon: <PhilippinePeso />,
      content: 0,
      footer: `${isNaN(dayDifference) ? dayDifference : `Last ${dayDifference} Days`} `,
      location: "/admin/sales-history",
    },
    {
      title: "Out of Stock Item",
      description: "out of stock",
      icon: <Shirt />,
      content: "12",
      footer: `${isNaN(dayDifference) ? dayDifference : `Last ${dayDifference} Days`}  `,
      location: "/admin/inventory",
    },
  ];
  console.log(salesData?.data);
  if (salesData?.data) {
    dashBoardCardsData[1].content = formatCurrency(
      salesData?.data[0]?.TotalSales === undefined
        ? "0.00"
        : salesData?.data[0]?.TotalSales,
    );
    dashBoardCardsData[2].content = salesData?.data[1]?.StockOutofStock;
  }
  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-2 p-2 lg:flex-col">
        <section className="flex items-center gap-2">
          <h1 className="flex-1 text-xl font-bold text-accent">Dashboard</h1>
          <DashboardCalendar setDate={setDate} date={date} />
        </section>
        {loading && <CustomSkeleton times={50} />}
        {error && <div className="flex flex-col">{error.message}</div>}
        {!loading && !error && (
          <>
            <section className="flex max-h-56 flex-shrink-0 flex-grow flex-col justify-between gap-2 overflow-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900 dark:text-white lg:flex-row">
              {dashBoardCardsData.map((item) => (
                <DashboardCards
                  key={item.title}
                  onClick={() => navigate(item.location)}
                  title={
                    <>
                      <p className="stat-title flex-1 dark:text-white">
                        {item.title}
                      </p>
                      {item.icon}
                    </>
                  }
                  description={
                    <span className="stat-desc dark:text-white">
                      {item.description}
                    </span>
                  }
                  content={<span className="stat-value">{item.content}</span>}
                  footer={<span className="stat-desc">{item.footer}</span>}
                />
              ))}
            </section>
            <section className="flex flex-grow flex-col justify-between gap-2 outline lg:flex-row">
              <DashboardCards
                className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
                // content={<CustomBar date={date} />}
                content={<CustomBarChart date={date} />}
              />
              <DashboardCards
                className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800"
                content={<CustomAreaChart date={date} />}
              />
            </section>
          </>
        )}
      </section>
    </>
  );
}
