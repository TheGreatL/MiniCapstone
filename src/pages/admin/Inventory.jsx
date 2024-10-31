import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Inventory() {
  const [selectedFruit, setSelectedFruit] = useState("");
  const sampledata = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const numSelect = [1, 2, 3, 4, 5];
  return (
    <section className="h flex flex-1 flex-col gap-3 overflow-hidden p-5 text-accent lg:flex-col">
      <div className="flex gap-2">
        <h1 className="flex-1 text-2xl font-bold">Inventory</h1>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex h-[3rem] w-full items-center gap-2 text-black">
          <Input placeholder="Search..." className="max-w-72 flex-1" />
          <div className="flex flex-1 items-center gap-5">
            {numSelect.map((item) => (
              <Select
                key={item}
                onValueChange={(value) => setSelectedFruit(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem className="cursor-pointer" value="apple">
                      Apple
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="banana">
                      Banana
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="blueberry">
                      Blueberry
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="grapes">
                      Grapes
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="pineapple">
                      Pineapple
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
            <button className="btn btn-accent">Make Order</button>
          </div>
        </div>

        <ScrollArea className="h-[50rem] pr-0.5 lg:h-[34rem] 2xl:h-[45rem]">
          <div className="flex flex-wrap justify-evenly gap-5 text-black">
            {sampledata.map((item, index) => (
              <div className="card w-64 bg-base-100 shadow-xl" key={index}>
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="self-end">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {/* </div> */}
      </div>
    </section>
  );
}
