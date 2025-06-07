"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { DataOrderTable } from "./data-order-table";
import { getOrders } from "@/services/orders/list-orders";
import { useSession } from "@/hooks/use-session";
import api from "@/lib/axios";
import { useState } from "react";

export function OrderTable() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const session = useSession();
  const userId = session?.id;
  const { data, isLoading } = useQuery({
    queryFn: async () => getOrders({ userId, page, limit }),
    queryKey: ["orders", page],
    enabled: !!session,
  });

  if (!data && isLoading && !session) {
    return <p>Caregando...</p>;
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
              prevPage={() => setPage(page - 1)}
              nextPage={() => setPage(page + 1)}
              lastPage={() => setPage(data.pages)}
              firstPage={() => setPage(1)}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
