import { Metadata } from "next";



export const metadata: Metadata = {
    title: "Dashboard"
}


export default function Dashboard() {

    return (
        <section className="p-[24px]">
            <section className="flex flex-col space-x-[18px] space-y-[18px]">
                <p className="text-[20px] font-semibold text-accent-foreground">Dashboard</p>
            </section>
        </section>
    );
};