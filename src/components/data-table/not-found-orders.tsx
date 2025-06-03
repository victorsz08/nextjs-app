"use client";

import { ShoppingBag } from "lucide-react";
import { CreateOrderForm } from "../forms/create-order-form";
import { Card, CardContent } from "../ui/card";

export function NotFoundOrders() {
  return (
    <Card className="w-full h-full shadow-none flex items-center justify-center">
      <CardContent>
        <section className="flex p-[32px] flex-col items-center justify-center h-full">
          <span className="bg-background p-8 rounded-full border-3 border-accent-foreground">
            <ShoppingBag className="w-[64px] h-[64px] text-primary" />
          </span>
          <div className="flex flex-col gap-4 items-center justify-center mt-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-foreground text-sm font-semibold">
                Nenhum pedido encontrato
              </p>
              <small className="text-muted-foreground text-xs">
                Nenhum pedido para hoje
              </small>
            </div>
            <CreateOrderForm />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
