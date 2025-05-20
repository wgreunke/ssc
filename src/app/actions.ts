//This page catches the feeddback from the form

'use server'
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation'

export async function handleSubmit(formData: FormData) {
    try {
        const situation = formData.get('situation') as string;
        const behavior = formData.get('behavior') as string;
        const impact = formData.get('impact') as string;
        const suggestion = formData.get('suggestion') as string;
        const importance = formData.get('importance') as string;
        const to_id = formData.get('to_id') as string;
        const from_id = '2'; // Hardcoded for now since we don't have auth yet

        // Validate required fields
        if (!situation || !behavior || !impact || !suggestion || !importance || !to_id) {
            console.error('Missing required fields:', { situation, behavior, impact, suggestion, importance, to_id });
            throw new Error('All fields are required');
        }

        const { data, error } = await supabase
            .from('feedback_table')
            .insert([
                {
                    feedback_from_id: from_id,
                    feedback_to_id: to_id,
                    feedback_situation: situation,
                    feedback_behavior: behavior,
                    feedback_impact: impact,
                    feedback_suggestion: suggestion,
                    importance: parseInt(importance)
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error(`Failed to submit feedback: ${error.message}`);
        }

        if (!data) {
            throw new Error('No data returned from insert');
        }

        redirect('/');
    } catch (error) {
        console.error('Error in handleSubmit:', error);
        throw error;
    }
}