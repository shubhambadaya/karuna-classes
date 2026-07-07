import { supabase } from '../supabaseClient';
import { getUTMParams, getCurrentPage } from './tracking';

export async function submitLead(data) {
  const { name, phone, email, interest, source, message } = data;

  const utm = getUTMParams() || {};

  const payload = {
    name,
    phone: phone || null,
    email: email || null,
    interest: interest || null,
    source: source || 'website',
    page: getCurrentPage(),
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
    notes: message || null,
  };

  const { error } = await supabase.from('leads').insert([payload]);

  if (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
