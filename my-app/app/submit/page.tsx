"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, BarChart } from "lucide-react";

const formSchema = z.object({
  loan_amount: z.coerce.number().int().positive(),
  term: z.coerce.number().int().positive(),
  property_value: z.coerce.number().int().positive(),
  income: z.coerce.number().int().positive(),
  credit_score: z.coerce.number().int().min(300).max(850),
  age: z.coerce.number().int().min(18),
  gender: z.string(),
  race: z.string(),
});

type PredictionResult = {
  loan_decision: string;
  fairness_metrics: {
    demographic_parity_difference: string;
    disparate_impact: string;
  };
};

export default function SubmitPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loan_amount: 10000,
      term: 36,
      property_value: 50000,
      income: 60000,
      credit_score: 700,
      age: 35,
      gender: "Male",
      race: "White",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        values
      );
      setResult(response.data);
    } catch (err) {
      setError("An error occurred while fetching the prediction.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto my-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Loan Application Form</CardTitle>
          <CardDescription>
            Fill in the details below to get a loan decision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="loan_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term (in months)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="property_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Value</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="credit_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Score</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender (Sensitive Attribute)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="race"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race (Sensitive Attribute)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a race" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="White">White</SelectItem>
                        <SelectItem value="Black">Black</SelectItem>
                        <SelectItem value="Asian">Asian</SelectItem>
                        <SelectItem value="Hispanic">Hispanic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Getting Prediction..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Alert className="mt-8">
          <BarChart className="h-4 w-4" />
          <AlertTitle>Prediction Result</AlertTitle>
          <AlertDescription>
            <strong>Loan Decision:</strong> {result.loan_decision}
          </AlertDescription>
          <div className="mt-4">
            <h4 className="font-semibold">Fairness Metrics</h4>
            <pre className="mt-2 rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(result.fairness_metrics, null, 2)}
              </code>
            </pre>
          </div>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mt-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </main>
  );
}
