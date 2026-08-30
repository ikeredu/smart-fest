export type GuestStatus = 'pending' | 'confirmed' | 'declined';

export interface Guest {
  id: string;
  event_id: string;
  user_id: string;
  first_name: string;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  passes_allocated: number;
  passes_confirmed: number;
  status: GuestStatus;
  notes?: string | null;
  access_code?: string | null;
  confirmed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuestFormData {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  passesAllocated: number;
  notes?: string;
  status?: GuestStatus;
  passesConfirmed?: number;
}

export interface GuestStatsMetrics {
  totalFamilies: number;
  totalPassesAllocated: number;
  totalPassesConfirmed: number;
  totalConfirmedGuests: number;
  totalPendingPasses: number;
  totalDeclinedPasses: number;
}
