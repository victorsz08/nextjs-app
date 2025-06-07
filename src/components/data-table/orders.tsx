"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { DataOrderTable } from "./data-order-table";
import { getOrders } from "@/services/orders/list-orders";
import { useSession } from "@/hooks/use-session";
import { useState } from "react";
import { TypeStatusOrder } from "@/types";
import { DateRange } from "react-day-picker";
import { Skeleton } from "../ui/skeleton";

export function OrderTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<TypeStatusOrder>(TypeStatusOrder.ALL);
  const [schedulingDateFilter, setSchedulingDateFilter] = useState<DateRange>();
  const [createdDateFilter, setCreatedDateFilter] = useState<DateRange>();


  const session = useSession();
  const userId = session?.id;
  const { data, isLoading } = useQuery({
    queryFn: async () => getOrders({ 
      userId, 
      page, 
      limit,
      schedulingDateIn: schedulingDateFilter && schedulingDateFilter?.from?.toISOString(),
      schedulingDateOut: schedulingDateFilter && schedulingDateFilter?.to?.toISOString(),
      createdDateIn: createdDateFilter && createdDateFilter?.from?.toISOString(),
      createdDateOut: createdDateFilter && createdDateFilter?.to?.toISOString(),
      status: status === TypeStatusOrder.ALL ? undefined : status
    }),
    queryKey: ["orders", page, status, schedulingDateFilter, createdDateFilter],
    enabled: !!session,
  });

  if(!data && isLoading && !session) {
    return (
      <section className="p-[24px]">
        <Skeleton className="w-full h-screen bg-accent-foreground"/>
      </section>
    );
  }

  return (
    <section className="p-[24px]">
      <h1 className="text-foreground text-[24px] font-bold">Pedidos</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Gerencie os pedidos e agendamentos.
      </p>
      <Card className="w-full shadow-none">
        <CardContent>
          {data && (
            <DataOrderTable
              orders={data.orders}
              page={page}
              pages={data.pages}
              limit={data.limit}
              total={data.total}
              setPage={setPage}
              setLimit={setLimit}
              status={status}
              setStatus={setStatus}
              schedulingDateFilter={schedulingDateFilter}
              setSchedulingDateFilter={setSchedulingDateFilter}
              createdDateFilter={createdDateFilter}
              setCreatedDateFilter={setCreatedDateFilter}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
