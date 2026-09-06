/**
 * ARWIN RISE - Lead & Enquiry Service
 * Dispatches leads to the target email and records them in the Admin Inbox & Cloudflare backend.
 */

import { LeadRecord } from '../types/admin';

export interface LeadSubmission {
  formType: 
    | 'Private Preview VIP Pass'
    | 'Quick Advisory Callback'
    | 'Contact Concierge Desk'
    | 'NRI Wealth Advisory'
    | 'Investor ROI Dossier'
    | 'List Luxury Property'
    | 'Career Application'
    | 'Project Site Visit & Brochure'
    | string;
  fullName?: string;
  name?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  collection?: string;
  tier?: string;
  project?: string;
  budget?: string;
  date?: string;
  timeSlot?: string;
  notes?: string;
  message?: string;
  [key: string]: any;
}

export const TARGET_LEAD_EMAIL = 'kamalyellapragada@gmail.com';

/**
 * Sends form lead data to configured email and stores in Admin Inbox
 */
export async function sendLeadEmail(data: LeadSubmission): Promise<{ success: boolean; message?: string }> {
  const leadName = data.fullName || data.name || data.ownerName || 'Client';
  const leadEmail = data.email || '';
  const leadPhone = data.phone || 'Not provided';
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Get dynamic target email if saved in settings
  let destinationEmail = TARGET_LEAD_EMAIL;
  try {
    const settingsStr = localStorage.getItem('arwin_rise_dynamic_content_v1_settings');
    if (settingsStr) {
      const parsed = JSON.parse(settingsStr);
      if (parsed.leadTargetEmail) destinationEmail = parsed.leadTargetEmail;
    }
  } catch {}

  const leadRecord: LeadRecord = {
    id: 'LEAD-' + Date.now(),
    timestamp,
    formType: data.formType,
    clientName: leadName,
    phone: leadPhone,
    email: leadEmail,
    status: 'new',
    project: data.project || '',
    collection: data.collection || '',
    tier: data.tier || '',
    budget: data.budget || '',
    date: data.date || '',
    timeSlot: data.timeSlot || '',
    message: data.message || data.notes || '',
    additionalData: data
  };

  // 1. Record in localStorage for instant Admin Inbox access
  try {
    const existing: LeadRecord[] = JSON.parse(localStorage.getItem('arwin_rise_leads') || '[]');
    existing.unshift(leadRecord);
    localStorage.setItem('arwin_rise_leads', JSON.stringify(existing));
    
    // Trigger custom event so reactive components can refresh immediately
    window.dispatchEvent(new CustomEvent('arwin_lead_submitted', { detail: leadRecord }));
  } catch (err) {
    console.debug('Local lead storage error:', err);
  }

  // 2. Dispatch to Cloudflare backend function if available
  try {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadRecord)
    }).catch(() => {});
  } catch {}

  // 3. Dispatch to FormSubmit email gateway
  const payload: Record<string, any> = {
    _subject: `[ARWIN RISE LEAD] ${data.formType} — ${leadName} (${leadPhone})`,
    _template: 'table',
    _captcha: 'false',
    _autoresponse: `Thank you for connecting with ARWIN RISE Private Property Advisory. Our senior partner has received your request regarding "${data.formType}" and will be in touch with you shortly.`,
    'Lead Type': data.formType,
    'Client Name': leadName,
    'Phone Number': leadPhone,
    'Email Address': leadEmail || 'Not provided',
    'Submission Time (IST)': timestamp,
    ...data
  };

  if (leadEmail) {
    payload._replyto = leadEmail;
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✅ Lead successfully dispatched to:', destinationEmail);
      return { success: true };
    }
  } catch (error) {
    console.warn('Primary email dispatch fallback triggered:', error);
  }

  return { success: true };
}
