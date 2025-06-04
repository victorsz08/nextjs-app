"use client";

import { ShoppingBag } from "lucide-react";
import { CreateOrderForm } from "../forms/create-order-form";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export function NotFoundOrders() {
  return (
    <Card className="w-full h-full shadow-none flex items-center justify-center">
      <CardContent>
        <section className="flex p-[32px] flex-col items-center justify-center gap-10 h-full">
          <Image src="no-data.svg" width={64} height={64} alt="no-data"/>
          <div className="flex flex-col gap-4 items-center justify-center mt-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-foreground text-sm font-semibold">
                Nenhum pedido
              </p>
            </div>
            <CreateOrderForm />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
