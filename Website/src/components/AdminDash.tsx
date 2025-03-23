import { Button } from "./ui/button";

function AdminDash() {
  return (
    <div>
      <div className="flex w-full justify-end">
        <Button className="bg-[#800080] hover:bg-[#691369]">Add User</Button>
      </div>
      <div className="mt-11 flex flex-row flex-wrap justify-center gap-10">
        <DashCard text="Total No. of Students" data={40} />
        <DashCard text="No. of Students Present" data={30} />
        <DashCard text="No. of Students Absent" data={10} />
      </div>
    </div>
  );
}

function DashCard({ text, data }: { text: string; data: number }) {
  return (
    <div className="flex min-h-[250px] w-full max-w-[320px] flex-col gap-9 rounded-lg border border-[#000] p-[25px]">
      <p className="text-[32px] font-bold">{text}</p>
      <p className="w-full text-right text-[50px] font-bold text-[#800080]">
        {data}
      </p>
    </div>
  );
}

export default AdminDash;
