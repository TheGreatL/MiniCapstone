import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import CustomSelect from "@/components/customs/CustomSelect";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";
import CustomTable from "./CustomTable";
import { useUpdate } from "@/hooks/useUpdate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { format } from "date-fns";
import { getCurrentDate } from "@/lib/functions";
import TableToPrint from "../TablePrint";
export default function OrdersTable({
  data,
  columns,
  input_search = "s_name",
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const {
    data: updateData,
    loading,
    error,
    updateValue,
  } = useUpdate([], "http://localhost:3000/api/orders/update/status/");

  return (
    <div className="flex flex-1 flex-col">
      <div className="m-4 flex items-center gap-5">
        <div className="flex flex-1 gap-5">
          <Input
            placeholder="Filter Order"
            value={table.getColumn(input_search)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(input_search)?.setFilterValue(event.target.value)
            }
            className="flex-1"
          />
          <div className="flex-1">
            <CustomSelect
              label="Order Status"
              options={[
                { value: "All", id: "all" },
                { value: "Completed", id: "ORDER_200" },
                { value: "On Going", id: "ORDER_600" },
                { value: "Failed", id: "ORDER_400" },
              ]}
              onItemSelected={(value) => {
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? "" : value);
              }}
            />
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={table.getSelectedRowModel().rows.length === 0}
                variant="outline"
                className="flex-1"
              >
                Mark Success
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently mark
                  orders as complete.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const rowSelected = table.getSelectedRowModel().rows;
                    const rowSelectedMap = rowSelected.map((row) => {
                      rowSelected.forEach((row) => {
                        console.log(row.id);
                        console.log(data[row.id]);
                        data[row.id].status = "ORDER_200";
                      });
                      return row.original;
                    });
                    await updateValue(rowSelectedMap, "ORDER_200");
                    console.log(error);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={table.getSelectedRowModel().rows.length === 0}
                variant="outline"
                className="flex-1"
              >
                Mark Failed
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently mark
                  orders as complete.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const rowSelected = table.getSelectedRowModel().rows;
                    const rowSelectedMap = rowSelected.map(
                      (row) => row.original,
                    );
                    updateValue(rowSelectedMap, "ORDER_400");
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <PDFDownloadLink
            document={
              <TableToPrint
                data={data}
                currentDate={format(getCurrentDate(), "MMMM dd, y")}
              />
            }
            fileName={`Orders of ${format(getCurrentDate(), "MMMM dd, y")}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading} className="ml-auto">
                {loading ? "Loading document..." : "Order Report"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex h-[36rem] overflow-hidden rounded-md bg-white 2xl:h-[48rem]">
        <CustomTable columns={columns} table={table} flexRender={flexRender} />
      </div>
    </div>
  );
}
OrdersTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  input_search: PropTypes.string,
};
