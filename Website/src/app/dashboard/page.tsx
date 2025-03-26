import AdminDash from "@/components/AdminDash";
import StudentDash from "@/components/StudentDash";
import { auth } from "@/server/auth";

async function Page() {
  const session = await auth();
  return (
    <div className="max-h-screen w-full overflow-auto p-[50px]">
      {session?.user.role === "ADMIN" && <AdminDash />}
      {session?.user.role === "USER" && (
        <StudentDash name={session.user.name ?? ""} />
      )}
    </div>
  );
}

export default Page;
