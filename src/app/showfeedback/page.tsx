//This is the history page for a user. It shows all of the feedback that has been given to them and all of the feedback you have given.

import { supabase } from "@/lib/supabase";
import Link from "next/link";

//"feedback_table" ("id", "created_at", "feedback_to_id", "feedback_from_id", "feedback_situation", "feedback_behavior", "feedback_impact", "feedback_suggestion", "importance")

const user_id = 2;

async function getFeedbackGiven() {
    const { data: feedback, error } = await supabase
        .from('feedback_table')
        .select('*')
        .eq('feedback_from_id', '2')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feedback given:', error);
        return [];
    }

    return feedback || [];
}

async function getFeedbackReceived() {
    const { data: feedback, error } = await supabase
        .from('feedback_table')
        .select('*')
        .eq('feedback_to_id', user_id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feedback received:', error);
        return [];
    }

    return feedback || [];
}

export default async function FeedbackPage() {
    const feedbackGiven = await getFeedbackGiven();
    const feedbackReceived = await getFeedbackReceived();

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    ← Back to Home
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-8">Welcome Susan</h1>
            
            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Feedback Given</h2>
                    <div className="space-y-4">
                        {feedbackGiven.length > 0 ? (
                            feedbackGiven.map((feedback) => (
                                <div key={feedback.id} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg shadow">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p>  {new Date(feedback.created_at).toLocaleDateString()}
                                            
                                            </p>
                                            <h3 className="font-bold text-lg">Situation</h3>
                                            <p className="text-gray-600 dark:text-black-300">{feedback.feedback_situation}</p>
                                        <br />
                                            <h3 className="font-bold text-lg">Behavior</h3>
                                            <p className="text-gray-600 dark:text-black-300">{feedback.feedback_behavior}</p>
                                        <br />
                                            <h3 className="font-bold text-lg">Impact</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_impact}</p>
                                        <br />
                                            <h3 className="font-bold text-lg">Suggestion</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{feedback.feedback_suggestion}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <p> Importance: {feedback.importance} </p>
                                    
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
