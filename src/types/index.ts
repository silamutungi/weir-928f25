export type ContentMatch = {
  id: string
  user_id: string
  platform: string
  content_url: string
  match_type: 'image' | 'video' | 'audio' | 'text'
  risk_level: 'low' | 'medium' | 'high'
  status: 'pending' | 'taken_down' | 'monetized' | 'approved' | 'dismissed'
  estimated_cpm: number
  impressions: number
  created_at: string
  deleted_at: string | null
}

export type LicenseTemplate = {
  id: string
  user_id: string
  name: string
  type: 'restricted' | 'balanced' | 'open'
  description: string
  price_usd: number
  is_default: boolean
  created_at: string
  deleted_at: string | null
}

export type EarningsRecord = {
  id: string
  user_id: string
  match_id: string
  platform: string
  amount_usd: number
  cpm: number
  impressions: number
  period_start: string
  period_end: string
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  display_name: string
  bio: string
  creator_category: string
  monthly_reach: number
  created_at: string
  updated_at: string
}
