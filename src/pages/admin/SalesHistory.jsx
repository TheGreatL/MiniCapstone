import CustomTable from "@/components/CustomTable";
export default function SalesHistory() {
  const orderStatus = [
    {
      or_date: "2023-04-01",
      or_no: "95730102024309924",

      sales: 20000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309925",
      sales: 20000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309926",
      sales: 2000,
      total: 20000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309927",
      sales: 2000,
      total: 20000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309928",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309929",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099210",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099211",
      sales: 2000000,
      total: 20000000,
    },
    {
      or_date: "2023-04-01",
      or_no: "9573010202430992",
      sales: 200000,
      total: 200000,
    },
  ];
  const columnWidths = {
    "OR DATE": "w-[125px]",
    "OR NO": "w-[150px]",
    SALES: "w-[150px]",
    TOTAL: "w-[90px]",
    ACTIONS: "w-[80px]",
  };
  return (
    <section className="flex h-full flex-1 flex-col gap-3 p-5 lg:flex-col">
      <div className="flex gap-2">
        <h1 className="flex-1 text-2xl font-bold text-accent">Sale History</h1>
      </div>
      <div className="flex h-full flex-1">
        <CustomTable
          columnWidths={columnWidths}
          columns={["Or Date", "Or No", "Sales", "Total", "Actions"]}
          data={orderStatus}
        />
      </div>
    </section>
  );
}
