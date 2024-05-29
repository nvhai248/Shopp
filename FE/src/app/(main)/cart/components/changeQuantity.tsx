"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

interface QuantityProps {
  current: number;
}
export default function UpdateQuantity({ current = 1}) {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="mt-6 flex items-center space-x-4">
      <div className="flex">
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <Input
          id="quantity"
          name="quantity"
          min="1"
          value={current || quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value, 10)))
          }
          className="border-t border-b border-gray-300 p-2 h-12 w-16 text-center rounded-none"
        />
        <button
          className="px-4 py-2 bg-white text-black rounded-none border border-gray-300 transition-all hover:bg-black hover:text-white"
          onClick={() => setQuantity((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
