import Rating from "@/components/ui/rating";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GetCategoryQuery, GetPublisherQuery } from "@/+core/definegql";
import { Category } from "@/+core/interfaces";
import { Publisher } from "@/+core/interfaces/publisher";

interface ExpandedCategories {
  [key: string]: boolean;
}

export function NavFilter() {
  const [expandedCategories, setExpandedCategories] =
    useState<ExpandedCategories>({});

  const [rating, setRating] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [onSale, setOnSale] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const { data: session } = useSession();

  const cData = useQuery(GetCategoryQuery);
  const pData = useQuery(GetPublisherQuery);

  const categories: Category[] = cData?.data?.categories || [];
  const publishers: Publisher[] = pData?.data?.publishers || [];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prevExpandedCategories) => ({
      ...prevExpandedCategories,
      [categoryId]: !prevExpandedCategories[categoryId],
    }));
  };

  return (
    <div className="w-1/4 pr-5 py-5 border-r border-gray-300">
      <div className="border">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2 text-left p-4">
          ALL CATEGORIES
        </h2>

        <ul className="mb-8">
          {categories.map((category) => (
            <li key={category.id} className="mb-2 text-left px-4 py-1">
              <div
                onClick={() => toggleCategory(category.id)}
                className={`flex justify-between items-center cursor-pointer ${
                  expandedCategories[category.id] ? "font-bold" : ""
                }`}
              >
                <span>{category.name}</span>
                <span className="text-gray-500">
                  ({category.childs?.length || 0})
                </span>
              </div>
              {category.childs && expandedCategories[category.id] && (
                <ul className="pl-4">
                  {category.childs.map((child) => (
                    <li key={child.id} className="mt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={child.id} />
                        <label htmlFor={child.id} className="leading-none">
                          {child.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2 text-left p-4">
          SHOP BY
        </h2>
        <div className="flex items-center space-x-2 mt-2 ml-4">
          <Checkbox id="isFilterOnSale" />
          <label
            htmlFor="isFilterOnSale"
            className="text-sm font-medium leading-none"
          >
            Is On Sale
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-start p-4">Price</label>
          <div className="flex px-4 flex-col">
            <Input
              type="number"
              placeholder="From"
              className="w-full p-2 border border-gray-300 rounded-none"
            />
            <Input
              type="number"
              placeholder="To"
              className="w-full p-2 border mt-4 border-gray-300 rounded-none"
            />
          </div>
        </div>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2 text-left p-4">
          RATING
        </h2>

        <RadioGroup defaultValue="5" className="ml-4 mb-4">
          {[5, 4, 3, 2, 1].map((score) => (
            <div key={score} className="flex items-center space-x-2">
              <RadioGroupItem value={String(score)} id={`r${score}`} />
              <Rating score={score} />
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="border mt-5">
        <h2 className="text-xl mb-4 font-bold bg-gradient-to-t text-white from-blue-600 to-blue-700 py-2 text-left p-4">
          PUBLISHER
        </h2>

        <ul className="mb-8">
          {publishers.map((publisher) => (
            <li className="pl-4 mb-4" key={publisher.id}>
              <div className="flex items-center space-x-2">
                <Checkbox id={publisher.id} />
                <label htmlFor={publisher.id} className="leading-none">
                  {publisher.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
