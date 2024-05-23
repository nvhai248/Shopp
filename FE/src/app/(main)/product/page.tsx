import React from "react";
import { FaCheck } from "react-icons/fa";
import UpdateQuantity from "./components/changeQuantity";
import Thumbnails from "./components/thumbnails";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  return (
    <div className="bg-white rounded-lg py-10">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-shrink-0">
          <img
            className="w-64 h-auto"
            src="https://via.placeholder.com/200x400"
            alt="Product Image"
          />
          <div className="flex mt-4 space-x-4">
            <Thumbnails />
          </div>
        </div>
        <div className="mt-6 lg:mt-0 lg:ml-10 w-[30rem] flex-grow text-start">
          <h1 className="text-2xl font-bold">Name</h1>
          <h2 className="text-xl font-bold">13.166.707,84 VND</h2>
          <ul className="mt-4 space-y-2">
            <li>Technology: GSM / CDMA / HSPA / LTE</li>
            <li>Dimensions: 145.9 x 71.9 x 9 mm</li>
            <li>Weight: 161 g</li>
            <li>Display: Super LCD5 5.2 inches</li>
            <li>Resolution: 1440 x 2560</li>
            <li>OS: Android OS, v6.0.1 (Marshmallow)</li>
            <li>Chipset: Snapdragon 820</li>
            <li>CPU: Quad-core</li>
            <li>Internal: 32/64 GB, 4 GB RAM</li>
            <li>Camera: 12 MP, f/1.8 - 5 MP, f/1.8</li>
          </ul>

          <UpdateQuantity />

          <div className="mt-6">
            <Button className="w-1/2 py-3 bg-blue-600 text-white rounded-none">
              ADD TO CART
            </Button>
          </div>
        </div>
        <div className="mt-6 lg:mt-0 lg:ml-6">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 border p-4 border-gray-200 py-2">
              <FaCheck className="w-6 h-6 text-gray-600" />
              <span>Guarantee</span>
            </li>
            <li className="flex items-center space-x-2 border p-4 border-gray-200 py-2">
              <FaCheck className="w-6 h-6 text-gray-600" />
              <span>Free Shipping</span>
            </li>
            <li className="flex items-center space-x-2 border p-4 border-gray-200 py-2">
              <FaCheck className="w-6 h-6 text-gray-600" />
              <span>Special Gift Cards</span>
            </li>
            <li className="flex items-center space-x-2 border p-4 border-gray-200 py-2">
              <FaCheck className="w-6 h-6 text-gray-600" />
              <span>Free Return</span>
            </li>
            <li className="flex items-center space-x-2 border p-4 border-gray-200 py-2">
              <FaCheck className="w-6 h-6 text-gray-600" />
              <span>Consultancy</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
