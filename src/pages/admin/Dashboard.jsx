import BarChartComp from "@/components/charts/BarChartComp";
import DashboardCards from "@/components/DashboardCards";
import CustomPieChart from "@/components/PieChart";
import DashboardCalendar from "@/components/DashboardCalendar";
import { Shirt, PhilippinePeso } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CustomAreaChart from "@/components/CustomAreaChart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Dashboard() {
  const navigate = useNavigate();
  const dateToday = new Date();
  const [date, setDate] = useState({
    from: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`,
    to: `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`,
  });
  const calculateDifference = () => {
    if (
      date !== undefined &&
      date.from !== undefined &&
      date.to !== undefined
    ) {
      console.log(date.from, date.to);
      const from = new Date(date.from);
      const to = new Date(date.to);
      const diff = to.getTime() - from.getTime();
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays;
    }
    return "Pick a date";
  };

  return (
    <>
      <section className="flex h-full flex-1 flex-col gap-3 p-5 lg:flex-col">
        <section className="flex items-center gap-2">
          <h1 className="flex-1 text-xl font-bold text-accent">Dashboard</h1>
          <DashboardCalendar setDate={setDate} date={date} />
        </section>
        <section className="flex max-h-56 flex-shrink-0 flex-grow flex-col justify-between gap-2 overflow-auto scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-900 lg:flex-row">
          <DashboardCards
            onClick={() => navigate("/admin/sales-history")}
            title={
              <>
                <p className="stat-title flex-1">Total Orders</p>
                <Shirt />
              </>
            }
            description={<span className="stat-desc">Revenue Total</span>}
            content={<span className="stat-value">12</span>}
            footer={
              <span className="stat-desc">{`${isNaN(calculateDifference()) ? calculateDifference() : `Last ${calculateDifference()} Days`}  `}</span>
            }
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
            footer={
              <span className="stat-desc">{`${isNaN(calculateDifference()) ? calculateDifference() : `Last ${calculateDifference()} Days`}  `}</span>
            }
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
            footer={
              <span className="stat-desc">{`${isNaN(calculateDifference()) ? calculateDifference() : `Last ${calculateDifference()} Days`}  `}</span>
            }
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
            footer={
              <span className="stat-desc">{`${isNaN(calculateDifference()) ? calculateDifference() : `Last ${calculateDifference()} Days`}  `}</span>
            }
          />
        </section>
        <section className="flex flex-grow flex-col justify-between gap-2 outline lg:flex-row">
          <Card className="flex-1 text-white ring-1 ring-black dark:ring-neutral-800">
            <CardContent className="p-2">
              <div className="m-auto self-center justify-self-center">
                <BarChartComp date={date} />
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 ring-1 ring-black dark:ring-neutral-800">
            <CardContent className="p-2">
              <CustomPieChart date={date} />
            </CardContent>
          </Card>
          <Card className="flex-1 ring-1 ring-black dark:ring-neutral-800">
            <CardContent className="p-2">
              <CustomAreaChart date={date} />
            </CardContent>
          </Card>
        </section>
      </section>
    </>
  );
}
