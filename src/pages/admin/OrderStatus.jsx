import CustomTable from "@/components/CustomTable";

export default function OrderStatus() {
  const orderStatus = [
    {
      or_date: "2023-04-01",
      or_no: "95730102024309924",
      status: "Failed",
      sales: 20000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309925",
      status: "On Going",
      sales: 20000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309926",
      status: "Complete",
      sales: 2000,
      total: 20000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309927",
      status: "On Going",
      sales: 2000,
      total: 20000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309928",
      status: "On Going",
      sales: 200000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309929",
      status: "On Going",
      sales: 200000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099210",
      status: "On going",
      sales: 200000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099211",
      status: "Complete",
      sales: 2000000,
      total: 20000000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
    {
      or_date: "2023-04-01",
      or_no: "9573010202430992",
      status: "On Going",
      sales: 200000,
      total: 200000,
      s_name: "Ken Andrew Carlon",
      s_no: "02000309926",
      s_program: "BSIT",
    },
  ];
  const columnWidths = {
    "OR DATE": "w-[125px]",
    "STUDENT NO": "w-[150px]",
    "STUDENT NAME": "w-[150px]",
    PROGRAM: "w-[100px]",
    "OR NO": "w-[200px]",
    STATUS: "w-[100px]",
    SALES: "w-[150px]",
    TOTAL: "w-[90px]",
    ACTIONS: "w-[80px]",
  };

  return (
    <section className="flex h-full flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex gap-2">
        <h1 className="flex-1 text-2xl font-bold text-accent">Order Status</h1>
      </div>
      <div className="flex h-full flex-1">
        <CustomTable
          columnWidths={columnWidths}
          columns={[
            "Or Date",
            "Student No",
            "Student Name",
            "Program",
            "Or no",
            "Status",
            "Sales",
            "Total",
            "Actions",
          ]}
          data={orderStatus}
        />
      </div>
    </section>
  );
}
