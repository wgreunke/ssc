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
    const employeeId = formData.get('employeeId') as string;

    const { error } = await supabase
        .from('feedback_table')
        .insert([
            {
                feedback_from_id: '2',
                feedback_to_id: employeeId,
                feedback_situation: situation,
                feedback_behavior: behavior,
                feedback_impact: impact,
                feedback_suggestion: suggestion,
                importance: importance
            }
        ]);

    if (error) {
        console.error('Error submitting feedback:', error);
        throw new Error('Failed to submit feedback');
    }

    redirect('/');
}