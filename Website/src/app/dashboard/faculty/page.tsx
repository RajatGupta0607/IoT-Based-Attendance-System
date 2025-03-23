import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Page() {
  return (
    <div className="max-h-screen w-full p-[50px]">
      <div className="h-[847px] overflow-y-auto rounded-lg border border-[#000] px-[25px] py-[33px]">
        <h1 className="text-[32px] font-bold text-[#800080]">Faculty List</h1>
        <Table className="mt-[45px]">
          <TableHeader>
            <TableRow>
              <TableHead>Faculty Id</TableHead>
              <TableHead>Faculty Name</TableHead>
              <TableHead>Email Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;

const data = [
  {
    id: "23030124078",
    name: "Rajat Gupta",
    email: "rag2324078@sicsr.ac.in",
  },
  {
    id: "23030124078",
    name: "Rajat Gupta",
    email: "rag2324078@sicsr.ac.in",
  },
  {
    id: "23030124078",
    name: "Rajat Gupta",
    email: "rag2324078@sicsr.ac.in",
  },
  {
    id: "23030124078",
    name: "Rajat Gupta",
    email: "rag2324078@sicsr.ac.in",
  },
];
