import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge";

export default function CustomStatusBadge({ status }) {
  let newStatus;
  if (status === "ORDER_200") {
    newStatus = "Complete";
  } else if (status === "ORDER_400") {
    newStatus = "Failed";
  } else if (status === "ORDER_600") {
    newStatus = "On going";
  }

  const colors = {
    failed: " bg-error text-white ",
    "on going": "bg-info text-white",
    complete: "bg-success text-white",
  };

  return (
    <Badge
      variant="outline"
      className={`${colors[newStatus.toLowerCase()]} m-0 rounded-xl border-none tracking-wider`}
    >
      {newStatus}
    </Badge>
  );
}

CustomStatusBadge.propTypes = {
  status: PropTypes.string,
};
