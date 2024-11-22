import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import format from "date-fns/format";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PropTypes from "prop-types";
import DashboardCards from "../DashboardCards";
export const description = "A linear area chart";

const chartData = [
  { month: "January", sales: 100557000 },
  { month: "February", sales: 500000 },
  { month: "March", sales: 300000 },
  { month: "April", sales: 900000 },
  { month: "May", sales: 20000007 },
  { month: "June", sales: 2000000 },
  { month: "July", sales: 5000000 },
  { month: "August", sales: 600000 },
  { month: "September", sales: 78510000 },
  { month: "October", sales: 95000031 },
  { month: "November", sales: 5646548 },
  { month: "December", sales: 16568979 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#FFD133",
  },
};

export default function CustomAreaChart({ date }) {
  return (
    <>
      <DashboardCards
        onClick={() => {}}
        title={
          <p className="stat-title flex-1 font-bold text-black">
            Sales
          </p>
        }
        description={
          <span className="stat-desc">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </span>
        }
        content={
          <span className="stat-value text-black">
            {
              <ChartContainer
                config={chartConfig}
                className="max-h-[200px] w-full"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="sales"
                    type="linear"
                    fill="#Ffff00"
                    fillOpacity={0.4}
                    stroke="#Ffff00"
                  />
                </AreaChart>
              </ChartContainer>
            }
          </span>
        }
        footer={
          <span className="stat-desc">
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </span>
        }
      />
    </>
  );
}
CustomAreaChart.propTypes = {
  date: PropTypes.object,
};
