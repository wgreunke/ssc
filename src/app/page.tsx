//import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('first_name, last_name, emp_department,emp_title,id')
    .limit(10);

  if (error) {
    console.error('Error fetching employees:', error);
    return [];
  }

  return data;
}

export default async function Home() {
  const employees = await getEmployees();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">I want to provide feedback for:</h1>
        <div className="w-full max-w-md">
          {employees.length > 0 ? (
            <ul className="space-y-2">
              {employees.map((employee, index) => (
                <li key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Link href={`/mockups/sbi?id=${employee.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                    {employee.first_name} {employee.last_name}: {employee.emp_department} - {employee.emp_title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees found</p>
          )}
        </div>

        <p>
          <Link href="/mockups/sbi">SBI</Link>
        </p>
        <p>You are logged in as Susan Mills  </p>
        
      </main>

    </div>
  );
}
