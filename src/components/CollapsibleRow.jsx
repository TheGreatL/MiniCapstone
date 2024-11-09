import { useState } from "react";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TableCell, TableRow } from "@/components/ui/table";

const CollapsibleTableRow = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
    </>
  );
};
export default CollapsibleTableRow;
