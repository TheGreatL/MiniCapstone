import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardCards({
  title,
  description,
  content,
  footer,
}) {
  return (
    <Card className="h-fit w-full ring-1 ring-black dark:ring-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <section>{content}</section>
      </CardContent>
      <CardFooter>
        <section>{footer}</section>
      </CardFooter>
    </Card>
  );
}
