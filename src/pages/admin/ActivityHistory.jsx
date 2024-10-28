import CustomTable from "@/components/CustomTable";
export default function ActivityHistory() {
  return (
    <section className="flex h-full flex-1 flex-col gap-10 overflow-auto p-5 lg:flex-col">
      <div className="flex gap-2">
        <h1 className="flex-1 text-2xl font-bold text-accent">
          Activity History
        </h1>
      </div>
      <div className="flex h-fit flex-1">
        <CustomTable />
      </div>
    </section>
  );
}
