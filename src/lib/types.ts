import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];

export type Profile = Tables['profiles']['Row'];
export type Business = Tables['businesses']['Row'];
export type BusinessLocation = Tables['business_locations']['Row'];
export type BusinessSchedule = Tables['business_schedules']['Row'];
export type CapacitySlot = Tables['capacity_slots']['Row'];
export type Reservation = Tables['reservations']['Row'];
export type Payment = Tables['payments']['Row'];
export type Review = Tables['reviews']['Row'];
