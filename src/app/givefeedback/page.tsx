'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { handleSubmit } from '@/app/actions';

interface Employee {
    first_name: string;
    last_name: string;
}

function FeedbackForm() {
    const searchParams = useSearchParams();
    const to_id = searchParams.get('to_id');
    const from_id = searchParams.get('from_id');
    const [employee, setEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        async function getEmployee() {
            if (to_id) {
                const { data, error } = await supabase
                    .from('employees')
                    .select('first_name, last_name')
                    .eq('id', to_id)
                    .single();

                if (error) {
                    console.error('Error fetching employee:', error);
                } else {
                    setEmployee(data as Employee);
                }
            }
        }
        getEmployee();
    }, [to_id]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
                <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    ← Back to Home
                </Link>

                <h1 className="text-2xl font-bold mt-4 mb-6">
                    {employee ? `Give Feedback to ${employee.first_name} ${employee.last_name}` : 'Loading...'}
                </h1>

                <form className="space-y-4" action={handleSubmit}>
                    <input type="hidden" name="to_id" value={to_id || ''} />
                    <input type="hidden" name="from_id" value={from_id || ''} />
                    <div>
                        <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
                            Situation
                        </label>
                        <input
                            type="text"
                            id="situation"
                            name="situation"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter the situation..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="behavior" className="block text-sm font-medium text-gray-700 mb-2">
                            Behavior
                        </label>
                        <input
                            type="text"
                            id="behavior"
                            name="behavior"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="What was the person's behavior?"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
                            Impact
                        </label>
                        <input
                            type="text"
                            id="impact"
                            name="impact"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="What was the impact of the behavior?"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-2">
                            Suggestion
                        </label>
                        <input
                            type="text"
                            id="suggestion"
                            name="suggestion"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="What suggestion do you want to share?"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            Importance
                        </label>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Needs attention</span>
                            <span className="text-sm text-gray-600">Keep up the great work!</span>
                        </div>
                        <div className="flex justify-between items-center">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div key={value} className="flex flex-col items-center">
                                    <input
                                        type="radio"
                                        id={`importance-${value}`}
                                        name="importance"
                                        value={value}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        required
                                    />
                                    <label htmlFor={`importance-${value}`} className="mt-1 text-sm text-gray-700">
                                        {value}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function SBIPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedbackForm />
        </Suspense>
    );
}
    