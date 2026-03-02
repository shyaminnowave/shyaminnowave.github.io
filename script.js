// ============================================
// Supabase Configuration
// Replace these with your actual Supabase project credentials
// ============================================
const SUPABASE_URL = 'https://kmzzfxmfoctlueaofuov.supabase.co';       // e.g. https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttenpmeG1mb2N0bHVlYW9mdW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjA2NzgsImV4cCI6MjA4NzY5NjY3OH0.f4x0V65k2BFGzlk0hSMWqpD-TXA2S4CmvfPFBCfYBug';

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helpers
const el = id => document.getElementById(id);
const n = v => Number(v) || 0;

function timeAgo(date) {
    console.log('Calculating time ago for:', date);
    const diff = (Date.now() - new Date(date).getTime()) / 60000;
    if (diff < 1) return "Just now";
    if (diff < 60) return Math.floor(diff) + " mins ago";
    if (diff < 1440) return Math.floor(diff / 60) + " hours ago";
    return Math.floor(diff / 1440) + " days ago";
}

// ============================================
// Data fetching functions
// ============================================

async function fetchActiveWeek() {
    const { data, error } = await db
        .from('weeks')
        .select('*')
        .order('week_to', { ascending: false })
        .limit(1)
        .single();
    if (error) console.error('Error fetching week:', error);
    return data;
}

async function fetchWeeklyScripts(weekId) {
    const { data, error } = await db
        .from('weekly_scripts')
        .select('scripts_created, scripts_approved, member_id, team_members(name)')
        .eq('week_id', weekId)
        .order('scripts_created', { ascending: false });
    if (error) console.error('Error fetching weekly scripts:', error);
    return data || [];
}

async function fetchTouchpoints() {
    const { data, error } = await db
        .from('touchpoints')
        .select('name, finished, assigned_to, team_members(name)');
    if (error) console.error('Error fetching touchpoints:', error);
    return data || [];
}

async function fetchActiveGoal() {
    const { data, error } = await db
        .from('goals')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
    if (error) console.error('Error fetching goals:', error);
    return data;
}

async function fetchAllMembers() {
    const { data, error } = await db
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('name');
    if (error) console.error('Error fetching members:', error);
    return data || [];
}

async function fetchAllWeeks() {
    const { data, error } = await db
        .from('weeks')
        .select('*')
        .order('week_to', { ascending: false });
    if (error) console.error('Error fetching weeks:', error);
    return data || [];
}
