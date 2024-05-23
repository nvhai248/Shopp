"use client";

import Rating from "@/components/ui/rating";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

export function NavFilter() {
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRating(e.target.value);
  const handlePublisherChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPublisher(e.target.value);
  const handleSaleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOnSale(e.target.checked);

  return (
    <div className="w-1/4 pr-5 py-5  border-r border-gray-300">
      <div className="border">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2">
          ALL CATEGORIES
        </h2>

        <ul className="mb-8">
          {[
            "Accessories",
            "Camera",
            "Collection - Full Width",
            "Collection - Left Sidebar",
            "Collection - Right Sidebar",
            "Laptop",
            "Printer",
            "Smartphone",
            "Speaker",
            "Tablet",
            "Television",
          ].map((item, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => setCategory(item.toLowerCase())}
                className={`${
                  category === item.toLowerCase() ? "font-bold" : ""
                }`}
              >
                {item} <span className="text-gray-500">(8)</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2">
          SHOP BY
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Sort by</label>
          <select className="w-98 p-2 border border-gray-300 rounded">
            <option>Best selling</option>
            {/* Add more sorting options if needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="From"
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="To"
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2">
          RATING
        </h2>

        <RadioGroup defaultValue="5" className="ml-2 mb-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5" id="r5" />
            <Rating score={5} />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="r4" />
            <Rating score={4} />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="r3" />
            <Rating score={3} />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="r2" />
            <Rating score={2} />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="r1" />
            <Rating score={1} />
          </div>
        </RadioGroup>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2">
          PUBLISHER
        </h2>

        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={publisher}
          onChange={handlePublisherChange}
        >
          <option value="">All Publishers</option>
          <option value="publisher1">Publisher 1</option>
          <option value="publisher2">Publisher 2</option>
        </select>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={onSale}
              onChange={handleSaleChange}
            />
            <span>On Sale</span>
          </label>
        </div>
      </div>

      <button onClick={() => setShowMore(!showMore)} className="text-blue-500">
        {showMore ? "Show Less" : "Show More"}
      </button>

      {showMore && (
        <div className="mt-4">
          {/* Additional filter options can be added here */}
          <div className="mb-4">
            <label className="block mb-2">More Filters</label>
            {/* More filter inputs can be added here */}
          </div>
        </div>
      )}
    </div>
  );
}
