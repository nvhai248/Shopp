import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import * as React from "react";

import RatingInput from "./components/ratingInput";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title",
  }),
  content: z.string().min(1, {
    message: "Content must be valid",
  }),
});

export default function CreateReview() {
  const [rating, setRating] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [notification, setNotification] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);
      console.log("Form data:", data);
      // Submit form data to backend
      // Assuming successful submission, reset form and show success notification
      form.reset();
      setNotification("Review submitted successfully!");
    } catch (error) {
      setNotification("Error submitting review. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full h-auto ml-10 rounded-none text-start">
      <CardHeader className="text-start">
        <CardTitle className="text-3xl">Write A Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                {...form.register("title")}
                id="title"
                className="rounded-none h-12"
                placeholder="Enter title"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea
                {...form.register("content")}
                id="content"
                className="rounded-none h-48"
                placeholder="Enter your content"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.content?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel>Rating</FormLabel>
            <FormControl>
              <RatingInput onChange={handleRatingChange} />
            </FormControl>
          </FormItem>

          <p className="mt-2 text-red-500 text-sm">{notification}</p>

          {isLoading ? (
            <Spinner size={30} />
          ) : (
            <Button
              type="submit"
              className="w-full mb-3 h-12 rounded-none mt-2"
            >
              Review
            </Button>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
