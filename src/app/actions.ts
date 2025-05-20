//This page catches the feeddback from the form

'use server'
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation'

export async function handleSubmit(formData: FormData) {
    const situation = formData.get('situation') as string;
    const behavior = formData.get('behavior') as string;
    const impact = formData.get('impact') as string;
    const suggestion = formData.get('suggestion') as string;
    const importance = formData.get('importance') as string;
    const to_id = formData.get('to_id') as string;
    const from_id = formData.get('from_id') as string;

    const { error } = await supabase
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
        ]);

    if (error) {
        console.error('Error submitting feedback:', error);
        throw new Error('Failed to submit feedback');
    }

    redirect('/');
}