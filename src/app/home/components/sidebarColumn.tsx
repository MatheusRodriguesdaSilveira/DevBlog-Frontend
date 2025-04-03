"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChartNoAxesColumnIncreasing,
  CircleChevronDown,
  CircleChevronUp,
  RotateCw,
  UserPlus2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { UserTemplate } from "@/components/ui/userExample";

export const SideBarColumn = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex relative">
        <div className="fixed 2xl:w-[300px] xl:w-[300px] lg:w-[300px] md:w-[250px] h-full right-0 border-l-2">
          <div className="mx-4 border-x-2 border-b-2 rounded-b-2xl p-5 h-[300px] mb-10">
            <div className="flex justify-center gap-1.5 pb-5">
              <ChartNoAxesColumnIncreasing className="2xl:size-6 xl:size-5 text-red-500" />
              <h1 className="font-bold 2xl:text-xl xl:text-sm">Em destaque</h1>
            </div>
            <div className="flex flex-col gap-2 xl:text-sm">
              <div className="flex gap-1">
                <p className="p-2 bg-zinc-200 dark:bg-zinc-900 w-full rounded">
                  <span className="text-red-500">#</span> Tech
                </p>
              </div>
              <div className="flex gap-1">
                <p className="p-2 bg-zinc-200 dark:bg-zinc-900 w-full rounded">
                  <span className="text-red-500">#</span> Dúvidas da Semana
                </p>
              </div>
              <div className="flex gap-1">
                <p className="p-2 bg-zinc-200 dark:bg-zinc-900 w-full rounded">
                  <span className="text-red-500">#</span> Vagas
                </p>
              </div>
              <div className="flex gap-1">
                <p className="p-2 bg-zinc-200 dark:bg-zinc-900 w-full rounded">
                  <span className="text-red-500">#</span> Estudos
                </p>
              </div>
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="mx-4 border-2 rounded-2xl 2xl:p-5 xl:p-2 md:p-1 h-full">
              <div className="right-7 absolute flex gap-1">
                <button onClick={handleRefresh}>
                  <RotateCw className="2xl:size-5 xl:size-4 text-red-500" />
                </button>
              </div>
              <div className="flex justify-center gap-1 pb-5 items-center">
                <h1 className="font-bold 2xl:text-lg xl:text-xs md:text-xs">
                  Sugestões Para Você
                </h1>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="2xl:w-9 p-0">
                    {isOpen ? (
                      <CircleChevronDown className="2xl:size-5 text-red-500" />
                    ) : (
                      <CircleChevronUp className="2xl:size-5" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="flex flex-col gap-3">
                {isOpen ? (
                  ""
                ) : (
                  <div className="flex gap-2 border rounded-lg py-1.5 px-1.5 items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <Skeleton className="lg:h-10 lg:w-10 md:h-6 md:w-6 rounded-full" />
                      <Skeleton className="lg:h-4 lg:w-[70px] md:h-2 md:w-[60px]" />
                    </div>
                    <div>
                      <Skeleton className="lg:h-[30px] lg:w-[80px] md:h-2 md:w-[40px]" />
                    </div>
                  </div>
                )}
                <CollapsibleContent>
                  <UserTemplate />
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>
      </div>
    </>
  );
};
