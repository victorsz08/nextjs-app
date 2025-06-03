import { DataOrderTable } from "@/components/data-table/data-order-table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { DataOrderType } from "@/types";
import { Metadata } from "next";

const orders: DataOrderType[] = [
  {
    id: "1",
    number: 123,
    local: "Local A",
    schedulingDate: "2023-10-01",
    schedulingTime: "10:00",
    status: "PENDENTE",
    price: 100.0,
    contact: "+55 11 91234-5678",
    userId: "user1",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-02T10:00:00Z",
  },
  {
    id: "2",
    number: 124,
    local: "Local B",
    schedulingDate: "2023-10-02",
    schedulingTime: "11:00",
    status: "CONECTADO",
    price: 150.0,
    contact: "+55 11 91234-5679",
    userId: "user2",
    createdAt: "2023-09-01T11:00:00Z",
    updatedAt: "2023-09-02T11:00:00Z",
  },
];

const data = {
  orders: orders,
  pages: 1,
  total: 2,
  page: 1,
  limit: 10,
};

export const metadata: Metadata = {
  title: "Meus Pedidos",
}

export default function Orders() {
  return (
    <section>
      <section className="p-[24px]">
        <h1 className="text-foreground text-[24px] font-bold">Pedidos</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Gerencie os pedidos e agendamentos.
        </p>
        <Card className="w-full shadow-none">
          <CardContent>
            <DataOrderTable 
              orders={data.orders} 
              page={data.page} 
              pages={data.pages} 
              limit={data.limit} 
              total={data.total}
            />
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
