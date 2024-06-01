import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerReviews() {
  const [sortOrder, setSortOrder] = useState("newest");
  const [commentsLimit, setCommentsLimit] = useState(10);

  return (
    <Card className="w-full h-auto rounded-none text-start">
      <CardHeader className="text-start">
        <CardTitle className="text-3xl">Customer Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center mt-2">
              <div className="text-4xl font-semibold">4.7</div>
              <div className="ml-2">
                <div className="flex items-center">
                  <div className="flex">
                    <Rating score={5} />
                  </div>
                  <div className="ml-2 text-gray-500">(897)</div>
                </div>
                <div className="flex mt-1 gap-10 justify-between">
                  <div className="flex">
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      All
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      5 ★ (808)
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      4 ★ (52)
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      3 ★ (27)
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      2 ★ (6)
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      1 ★ (30)
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Select>
                      <SelectTrigger className="w-[100px] rounded-none">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="LATEST">Latest</SelectItem>
                          <SelectItem value="OLDEST">Oldest</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className=" rounded-none">
                        <SelectValue placeholder="Limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="10">10 Reviews</SelectItem>
                          <SelectItem value="20">20 Reviews</SelectItem>
                          <SelectItem value="30">30 Reviews</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-white shadow rounded">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex flex-col w-full">
                  <span className="font-semibold w-full">John Doe</span>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex">
                      <Rating score={4} />
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      2024-05-26 00:43
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2">Chất lượng sản phẩm: Ổn</p>
              <p className="text-sm text-gray-500">Đúng với mô tả: Đúng</p>
              <p className="mt-2">
                Vỏ bọc ổn, có cái này đựng thẻ ngân hàng và CCCD không bị trầy
                xước. Mình dự tính mua cái này lâu rồi mà nay tiện mua bút bên
                shop, shop có nên rinh luôn 😅💙
              </p>
              <div className="mt-2">
                <video className="w-20 h-20" controls>
                  <source
                    src="https://via.placeholder.com/150"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
