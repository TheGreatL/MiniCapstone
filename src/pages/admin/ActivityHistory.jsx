import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import ActivityHistoryTable from "@/components/table/ActivityHistoryTable";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
export default function ActivityHistory() {
  const {
    data: ActivityHistoryData,
    loading,
    error,
  } = useFetch(
    "http://localhost:3000/api/activity/fetch",
    [],
    "Error fetching Activity History",
  );
  console.log(ActivityHistoryData);
  const SalesHistoryColumns = [
    {
      accessorKey: "ActivityActor",
      header: <div className="text-center">Actor ID</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("ActivityActor")}</div>
        );
      },
    },
    {
      accessorKey: "ActivityDateTime",
      header: <div className="text-center">Activity Date</div>,
      cell: ({ row }) => {
        const formattedDate = format(
          row.getValue("ActivityDateTime"),
          "MMMM dd, y",
        );
        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "ActivityTitle",
      header: <div className="text-center">Activity Title</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("ActivityTitle")}</div>
        );
      },
    },
    {
      accessorKey: "ActivityContent",
      header: <div className="text-center">Activity Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left">{row.getValue("ActivityContent")}</div>
        );
      },
    },
  ];
  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1">
        {loading && <CustomSkeleton times={100} />}
        {error && (
          <div className="m-auto text-2xl text-white">
            Error: {error.message}
          </div>
        )}
        {!loading && !error && (
          <Tabs defaultValue="sales-activity" className="flex-1">
            <TabsList className="flex w-full">
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                value="sales-activity"
              >
                Sales Activity
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                value="stock-activity"
              >
                Stock
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                value="user-activity"
              >
                Users Activity
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
                value="orders-activity"
              >
                Orders Activity
              </TabsTrigger>

              {/* <Button onClick={handleAddTab}>Add Tab</Button> */}
            </TabsList>
            <TabsContent value="sales-activity">
              <ActivityHistoryTable
                data={ActivityHistoryData.data.filter(
                  (activity) => activity.ActivityType === "SALES",
                )}
                columns={SalesHistoryColumns}
                input_search="ActivityDateTime"
              />
            </TabsContent>
            <TabsContent value="stock-activity">
              <span>Stock</span>
            </TabsContent>
            <TabsContent value="user-activity">
              <span>User</span>
            </TabsContent>
            <TabsContent value="orders-activity">
              <ActivityHistoryTable
                data={ActivityHistoryData.data.filter(
                  (activity) => activity.ActivityType === "ORDER",
                )}
                columns={SalesHistoryColumns}
                input_search="ActivityDateTime"
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}
