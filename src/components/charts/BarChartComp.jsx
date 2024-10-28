import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import PropTypes from "prop-types";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";
export default function BarChartComp({ config, data }) {
  return (
    <ChartContainer config={config} className="min-h-[200px] w-full flex-1">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <YAxis dataKey="desktop" axisLine={false} tickLine={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
BarChartComp.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
};
