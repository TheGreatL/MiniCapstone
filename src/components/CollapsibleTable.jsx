import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CollapsibleTableRow = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible>
      <TableRow>
        <TableCell>
          <CollapsibleTrigger open={open} onOpenChange={setOpen}>
            {data.name}
          </CollapsibleTrigger>
        </TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.phone}</TableCell>
      </TableRow>
      <CollapsibleContent open={open}>
        <TableRow>
          <TableCell colSpan={3}>
            <div className="p-4">
              <p>Additional details for {data.name}:</p>
              <ul>
                <li>Address: {data.address}</li>
                <li>Company: {data.company}</li>
                <li>Job Title: {data.title}</li>
              </ul>
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CollapsibleTable = () => {
  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      address: "123 Main St, Anytown USA",
      company: "Acme Inc.",
      title: "Software Engineer",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      address: "456 Oak Rd, Anytown USA",
      company: "Globex Corp.",
      title: "Product Manager",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      address: "789 Elm St, Anytown USA",
      company: "Stark Industries",
      title: "Data Analyst",
    },
  ];

  return (
    <Table className="bg-white">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Phone</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <CollapsibleTableRow key={index} data={item} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CollapsibleTable;
