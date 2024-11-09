import { useState } from "react";
import { MoreVertical } from "lucide-react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/functions";
import CustomStatusBadge from "./CustomStatusBadge";
import CustomSelect from "./CustomSelect";
const CustomTable = ({ columns, data, columnWidths }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase()),
    ),
  );

  // Column width configurations
  const renderCellContent = (row, column) => {
    switch (column.toUpperCase()) {
      case "OR DATE":
        return new Date(row.or_date).toLocaleDateString();
      case "STUDENT NO":
        return row.s_no;
      case "STUDENT NAME":
        return <span className="text-sm">{row.s_name}</span>;
      case "PROGRAM":
        return row.s_program;
      case "OR NO/REFERENCE":
        return row.or_no;
      case "STATUS":
        return (
          <div className="flex justify-center">
            <CustomStatusBadge status={row.status} />
          </div>
        );
      case "SALES":
        return formatCurrency(row.sales);
      case "TOTAL":
        return formatCurrency(row.total);
      case "ACTIONS":
        return (
          <Button variant="ghost" size="icon" className="float-right">
            <MoreVertical className="h-4 w-4" />
          </Button>
        );
      default:
        return "";
    }
  };

  return (
    <section className="m-2 flex-1 rounded-xl bg-white">
      <header className="flex items-center space-x-2 p-4 outline">
        <Input
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="w-44">
          <CustomSelect
            onItemSelected={() => {}}
            label="Status"
            options={[
              { value: "Completed", id: "ORDER_200" },
              { value: "On Going", id: "ORDER_600" },
              { value: "Failed", id: "ORDER_400" },
            ]}
          />
        </div>
        <Button variant="ghost" size="icon" className="flex-1">
          Complete
        </Button>
      </header>

      <main className="flex h-[30rem] flex-1">
        <div className="w-full">
          <div className="sticky top-0 z-10 border-b bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRows(
                            filteredData.map((item) => item.or_no),
                          );
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                    />
                  </TableHead>
                  {columns.map((column) => (
                    <TableHead
                      key={column}
                      className={`${columnWidths[column.toUpperCase()]} text-left font-medium outline`}
                    >
                      {column.toUpperCase()}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          <ScrollArea className="h-[calc(30rem-56px)]">
            <Table>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.or_no} className="hover:bg-gray-50">
                    <TableCell className="w-[50px]">
                      <Checkbox
                        checked={selectedRows.includes(row.or_no)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRows([...selectedRows, row.or_no]);
                          } else {
                            setSelectedRows(
                              selectedRows.filter((id) => id !== row.or_no),
                            );
                          }
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.or_no}-${column}`}
                        className={`${columnWidths[column.toUpperCase()]} text-left`}
                      >
                        {renderCellContent(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </main>

      <footer className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-500">
          {selectedRows.length} of {filteredData.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rows per page: 10</span>
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              {"<<"}
            </Button>
            <Button variant="outline" size="icon">
              {"<"}
            </Button>
            <Button variant="outline" size="icon">
              {">"}
            </Button>
            <Button variant="outline">{">>"}</Button>
          </div>
        </div>
      </footer>
    </section>
  );
};
CustomTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  columnWidths: PropTypes.object,
};

export default CustomTable;
