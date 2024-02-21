import { columns, Payment } from "./columns";
import { DataTable } from "./dataTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "128ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "228ed52f",
      amount: 100,
      status: "success",
      email: "b@example.com",
    },
    {
      id: "328ed52f",
      amount: 100,
      status: "failed",
      email: "c@example.com",
    },
    {
      id: "428ed52f",
      amount: 100,
      status: "pending",
      email: "d@example.com",
    },
    {
      id: "528ed52f",
      amount: 100,
      status: "success",
      email: "e@example.com",
    },
    {
      id: "628ed52f",
      amount: 100,
      status: "success",
      email: "f@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "g@example.com",
    },
    {
      id: "828ed52f",
      amount: 100,
      status: "failed",
      email: "h@example.com",
    },
    {
      id: "928ed52f",
      amount: 100,
      status: "success",
      email: "i@example.com",
    },
    {
      id: "028ed52f",
      amount: 100,
      status: "success",
      email: "j@example.com",
    },
    {
      id: "138ed52f",
      amount: 100,
      status: "failed",
      email: "k@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
