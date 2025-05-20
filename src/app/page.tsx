//import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

//This page is the dashboard for a manager to see all of their employees.


async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('first_name, last_name, emp_department,emp_title,id')
    .limit(10)
    .order('first_name', { ascending: true })
    .eq('manager_id', '2');

  if (error) {
    console.error('Error fetching employees:', error);
    return [];
  }

  return data;
}

export default async function Home() {
  const employees = await getEmployees();
  //const user_id=  '2';  //This is defualt for Susan, need to change when have auth.

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[24px] sm:gap-[32px] row-start-2 items-center w-full max-w-[100%] sm:max-w-4xl">
        <h1 className="text-xl sm:text-2xl font-bold">Hello Susan,</h1>
        <h2 className="text-xl sm:text-2xl font-bold">Your team members:</h2>
        <div className="w-full">
          {employees.length > 0 ? (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                      Name
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                      Title
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Feedback Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        {employee.first_name} {employee.last_name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        {employee.emp_title}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <Link href={`/givefeedback?to_id=${employee.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          Give Feedback
                        </Link>  
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <Link href={`/showfeedback?other_user=${employee.id}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          Review Feedback
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No employees found</p>
          )}
        </div>
      </main>
    </div>
  );
}
