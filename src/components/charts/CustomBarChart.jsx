import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import PropTypes from "prop-types";
import DashboardCards from "../DashboardCards";
export const description = "A multiple bar chart";
const chartData = [
  { month: "January", desktop: 120, mobile: 123 },
  { month: "February", desktop: 255, mobile: 2 },
  { month: "March", desktop: 26, mobile: 123 },
  { month: "April", desktop: 76, mobile: 522 },
  { month: "May", desktop: 234, mobile: 123 },
  { month: "June", desktop: 68, mobile: 232 },
  { month: "July", desktop: 23, mobile: 21 },
  { month: "August", desktop: 123, mobile: 123 },
  { month: "September", desktop: 22, mobile: 323 },
  { month: "October", desktop: 12, mobile: 23 },
  { month: "November", desktop: 77, mobile: 23 },
  { month: "December", desktop: 222, mobile: 77 },
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

export default function CustomBarChart({ date }) {
  return (
    <>
      <DashboardCards
        onClick={() => {}}
        title={
          <p className="stat-title flex-1 font-bold text-black">
            Bar Chart - Multiple
          </p>
        }
        description={
          <span className="stat-desc">
            {" "}
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
          <span className="stat-value">
            {
              <ChartContainer className="h-[10rem] w-full" config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            }
          </span>
        }
        footer={
          <span className="stat-desc">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </span>
        }
      />
    </>
  );
}
CustomBarChart.propTypes = {
  date: PropTypes.object,
};
