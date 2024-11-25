export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jokes: {
        Row: {
          id: number
          original: string
          status: 'pending' | 'completed' | 'deleted'
          rating: number
          likes: number
          dislikes: number
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: number
          original: string
          status?: 'pending' | 'completed' | 'deleted'
          rating?: number
          likes?: number
          dislikes?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          original?: string
          status?: 'pending' | 'completed' | 'deleted'
          rating?: number
          likes?: number
          dislikes?: number
          tags?: string[]
          updated_at?: string
        }
      }
      joke_versions: {
        Row: {
          id: number
          joke_id: number
          text: string
          type: string
          timestamp: string
          created_at?: string
        }
        Insert: {
          id?: number
          joke_id: number
          text: string
          type: string
          timestamp: string
          created_at?: string
        }
        Update: {
          joke_id?: number
          text?: string
          type?: string
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 