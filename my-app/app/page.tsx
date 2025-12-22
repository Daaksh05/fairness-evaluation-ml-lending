"use client";

import Link from "next/link";
import { ASMRBackground } from "@/components/ui/asmr-background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center">
      <ASMRBackground />
      <Card className="z-10 w-full max-w-md border-neutral-700 bg-black/60">
        <CardHeader className="text-center">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-8 text-4xl font-bold text-transparent">
            FairLend AI
          </h1>
        </CardHeader>
        <CardContent>
          <p className="mx-auto max-w-lg text-center text-neutral-400">
            An AI-Driven Fairness Evaluation System for Financial Lending.
            Promoting ethical and transparent lending decisions.
          </p>
        </CardContent>
        <CardFooter className="flex w-full justify-end">
          <Link href="/submit">
            <Button className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
