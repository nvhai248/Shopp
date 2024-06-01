"use client";

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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@apollo/client";
import { ReviewsByProductQuery } from "@/+core/definegql";
import { useSearchParams } from "next/navigation";
import { PagingReviewInput, ReviewPagingData } from "@/+core/interfaces";
import { REVIEW_SORT } from "@/+core/enums";
import formatter from "@/lib/formatDate";

interface CustomerReviewProps {
  productId: string;
  rate: number;
}
export default function CustomerReviews({
  productId,
  rate,
}: CustomerReviewProps) {
  const [sortOrder, setSortOrder] = useState("newest");
  const [commentsLimit, setCommentsLimit] = useState(10);
  const params = useSearchParams();

  const pagingReviewInput: PagingReviewInput = {
    limit: params.get("limit") ? Number(params.get("limit")) : 10,
    page: params.get("page") ? Number(params.get("page")) : 1,
    rate: params.get("rate") ? Number(params.get("rate")) : undefined,
    sort: params.get("sort") ? (params.get("sort") as REVIEW_SORT) : undefined,
  };

  const { data } = useQuery(ReviewsByProductQuery, {
    variables: {
      productId: productId,
      pagingReviewInput: pagingReviewInput,
    },
  });

  let reviewPagingData: ReviewPagingData = data?.reviewsByProduct || [];

  return (
    <Card className="w-full h-auto rounded-none text-start">
      <CardHeader className="text-start">
        <CardTitle className="text-3xl">Customer Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4">
          <div className="mb-6">
            <div className="flex items-center mt-2">
              <div className="text-4xl font-semibold">{rate}</div>
              <div className="ml-2">
                <div className="flex items-center">
                  <div className="flex">
                    <Rating score={rate} />
                  </div>
                  <div className="ml-2 text-gray-500">
                    ({reviewPagingData.total})
                  </div>
                </div>
                <div className="flex mt-1 gap-10 justify-between">
                  <div className="flex">
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      All
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      5 ★ ({reviewPagingData.countFiveStar})
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      4 ★ ({reviewPagingData.countFourStar})
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      3 ★ ({reviewPagingData.countThreeStar})
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      2 ★ ({reviewPagingData.countTwoStar})
                    </button>
                    <button className="px-2 py-1 bg-yellow-50 border-yellow-400 hover:scale-105 border rounded-none mx-1">
                      1 ★ ({reviewPagingData.countOneStar})
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
            {reviewPagingData ? (
              reviewPagingData.data?.map((review) => (
                <div className="p-4 bg-white shadow rounded">
                  <div className="flex items-center">
                    <img
                      src={review.owner.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col w-full">
                      <span className="font-semibold w-full">
                        {" "}
                        {review.owner.firstName && review.owner.lastName
                          ? review.owner.firstName + " " + review.owner.lastName
                          : "someone"}{" "}
                      </span>
                      <div className="w-full flex items-center justify-between">
                        <div className="flex">
                          <Rating score={4} />
                        </div>
                        <div className="ml-auto text-sm text-gray-500">
                          {formatter.format(new Date(review.createdAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2">{review.title}</p>
                  <p className="mt-2">{review.content}</p>
                  <div className="mt-2 flex flex-row gap-4">
                    {review.images.map((image) => (
                      <img className="w-20 h-20" src={image} alt="image" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No Review</p>
            )}
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
