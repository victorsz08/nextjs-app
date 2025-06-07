import { DataOrderTable } from "@/components/data-table/data-order-table";
import { OrderTable } from "@/components/data-table/data-orders-table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Meus Pedidos",
}

export default function Orders() {
  return (
    <section>
      <OrderTable/>
    </section>
  );
}
