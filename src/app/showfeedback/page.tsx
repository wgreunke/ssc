'use client';
//Switching to client side since having problems with params when build on Vercel. 
//Need to fix when adding auth.

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

//"feedback_table" ("id", "created_at", "feedback_to_id", "feedback_from_id", "feedback_situation", "feedback_behavior", "feedback_impact", "feedback_suggestion", "importance")

interface Feedback {
    id: number;
    created_at: string;
    feedback_to_id: string;
    feedback_from_id: string;
    feedback_situation: string;
    feedback_behavior: string;
    feedback_impact: string;
    feedback_suggestion: string;
    importance: number;
}

const current_user_id = 2;

async function getOtherUserName(other_user: string) {
    const { data: user, error } = await supabase
        .from('employees')
        .select('first_name, last_name')
        .eq('id', other_user)
        .single();

    if (error) {
        console.error('Error fetching user name:', error?.message || error || 'No user found');
        return 'Unknown User';
    }

    return user?.first_name + ' ' + user?.last_name || 'Unknown User';
}

async function getFeedbackGiven(from_id: string, to_id: string): Promise<Feedback[]> {
    const { data: feedback, error } = await supabase
        .from('feedback_table')
        .select('*')
        .eq('feedback_from_id', from_id)
        .eq('feedback_to_id', to_id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feedback given:', error);
        return [];
    }

    return feedback || [];
}

async function getFeedbackReceived(from_id: string, to_id: string): Promise<Feedback[]> {
    const { data: feedback, error } = await supabase
        .from('feedback_table')
        .select('*')
        .eq('feedback_to_id', to_id)
        .eq('feedback_from_id', from_id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feedback received:', error);
        return [];
    }

    return feedback || [];
}

function FeedbackContent() {
    const searchParams = useSearchParams();
    const other_user = searchParams.get('other_user') as string;
    const [otherUserName, setOtherUserName] = useState('Loading...');
    const [feedbackGiven, setFeedbackGiven] = useState<Feedback[]>([]);
    const [feedbackReceived, setFeedbackReceived] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!other_user) return;
            
            try {
                const [name, given, received] = await Promise.all([
                    getOtherUserName(other_user),
                    getFeedbackGiven(current_user_id.toString(), other_user),
                    getFeedbackReceived(other_user, current_user_id.toString())
                ]);
                
                setOtherUserName(name);
                setFeedbackGiven(given);
                setFeedbackReceived(received);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [other_user]);

    if (!other_user) {
        return <div>No user ID provided</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-2 sm:p-8">
            <div className="mb-4 sm:mb-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    ← Back to Home
                </Link>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">Welcome Susan</h1>
            <p className="mb-4">You are viewing interactions with {otherUserName}</p>
            <div className="space-y-4 sm:space-y-8">
                <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Feedback Given</h2>
                    <div className="space-y-3 sm:space-y-4">
                        {feedbackGiven.length > 0 ? (
                            feedbackGiven.map((feedback) => (
                                <div key={feedback.id} className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg shadow">
                                    <div>
                                        <p className="text-sm sm:text-base mb-2"> 
                                            {new Date(feedback.created_at).toLocaleDateString()}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg mb-1">Situation</h3>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-black-300">{feedback.feedback_situation}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg mb-1">Behavior</h3>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-black-300">{feedback.feedback_behavior}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg mb-1">Impact</h3>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feedback.feedback_impact}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg mb-1">Suggestion</h3>
                                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feedback.feedback_suggestion}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-xs sm:text-sm text-gray-500">
                                        <p>Importance: {feedback.importance}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No feedback given yet.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Feedback Received</h2>
                    <div className="space-y-4">
                        {feedbackReceived.length > 0 ? (
                            feedbackReceived.map((feedback) => (
                                <div key={feedback.id} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg shadow">
                                    <div>
                                        <p> {new Date(feedback.created_at).toLocaleDateString()}</p>
                                            <h3 className="font-bold text-lg">Situation</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_situation}</p>
                                            <br />
                                            <h3 className="font-bold text-lg">Behavior</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_behavior}</p>
                                            <br />
                                            <h3 className="font-bold text-lg">Impact</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_impact}</p>
                                            <br />
                                            <h3 className="font-bold text-lg">Suggestion</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_suggestion}</p>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        {feedback.importance && (
                                            <span className="ml-2">
                                                • Importance: {feedback.importance}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No feedback received yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function FeedbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedbackContent />
        </Suspense>
    );
}