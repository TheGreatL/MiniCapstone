import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp, MoreVertical, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
const tasks = [
  {
    id: "02000309926",
    type: "Purchase",
    title: "Buy IT Uniform ",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7878",
    type: "Documentation",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-7839",
    type: "Bug",
    title: "We need to bypass the neural TCP card!",
    status: "Todo",
    priority: "High",
  },
  {
    id: "TASK-5562",
    type: "Feature",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can back",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "TASK-8686",
    type: "Feature",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "Canceled",
    priority: "Medium",
  },
  {
    id: "TASK-1280",
    type: "Bug",
    title:
      "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-7262",
    type: "Feature",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back",
    status: "Done",
    priority: "High",
  },
  {
    id: "TASK-1138",
    type: "Feature",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p S",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "TASK-7184",
    type: "Feature",
    title: "We need to program the back-end THX pixel!",
    status: "Todo",
    priority: "Low",
  },
  {
    id: "TASK-5160",
    type: "Documentation",
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end",
    status: "In Progress",
    priority: "High",
  },
];

export default function CustomTable() {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Progress":
        return "⏳";
      case "Done":
        return "✅";
      case "Todo":
        return "⭕";
      case "Backlog":
        return "📋";
      case "Canceled":
        return "❌";
      default:
        return "⭕";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <ChevronUp className="h-4 w-4" />;
      case "Low":
        return <ChevronDown className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      Bug: "text-red-700 bg-red-100",
      Feature: "text-blue-700 bg-blue-100",
      Documentation: "text-purple-700 bg-purple-100",
      Purchase: "text-purple-700 bg-purple-100",
    };

    return (
      <Badge variant="outline" className={`${colors[type]} border-none`}>
        {type}
      </Badge>
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.id.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="h-full w-full rounded-xl bg-accent">
      <div className="flex items-center space-x-2 p-4">
        <Input
          placeholder="Filter tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">Todo</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="10">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex h-[30rem] flex-1">
        {/* <div className="h-full rounded-md border"> */}
        <Table>
          <TableHeader className="sticky top-0 z-10">
            {" "}
            {/* Make header sticky */}
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedTasks.length === filteredTasks.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTasks(filteredTasks.map((task) => task.id));
                    } else {
                      setSelectedTasks([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[150px]">Priority</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTasks([...selectedTasks, task.id]);
                      } else {
                        setSelectedTasks(
                          selectedTasks.filter((id) => id !== task.id),
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {task.id}
                      </span>
                      {getTypeBadge(task.type)}
                    </div>
                    <span className="text-gray-500">{task.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>{getStatusIcon(task.status)}</span>
                    <span>{task.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {getPriorityIcon(task.priority)}
                    <span>{task.priority}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </div> */}
      </ScrollArea>

      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-500">
          {selectedTasks.length} of {filteredTasks.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Rows per page: 10</span>
          <span className="text-sm text-gray-500">Page 1 of 10</span>
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
            <Button variant="outline" size="icon">
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
