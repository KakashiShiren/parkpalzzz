export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          criteria: Json | null
          description: string
          icon_url: string | null
          id: string
          name: string
          rarity: string
          slug: string
        }
        Insert: {
          created_at?: string
          criteria?: Json | null
          description?: string
          icon_url?: string | null
          id?: string
          name: string
          rarity?: string
          slug: string
        }
        Update: {
          created_at?: string
          criteria?: Json | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          rarity?: string
          slug?: string
        }
        Relationships: []
      }
      checkins: {
        Row: {
          active: boolean
          checked_in_at: string
          checked_out_at: string | null
          duration_minutes: number | null
          id: string
          is_public: boolean
          member_profile_ids: string[] | null
          note: string | null
          park_id: string
          photo_url: string | null
          profile_id: string
        }
        Insert: {
          active?: boolean
          checked_in_at?: string
          checked_out_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_public?: boolean
          member_profile_ids?: string[] | null
          note?: string | null
          park_id: string
          photo_url?: string | null
          profile_id: string
        }
        Update: {
          active?: boolean
          checked_in_at?: string
          checked_out_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_public?: boolean
          member_profile_ids?: string[] | null
          note?: string | null
          park_id?: string
          photo_url?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkins_park_id_fkey"
            columns: ["park_id"]
            isOneToOne: false
            referencedRelation: "parks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkins_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          id: string
          met_at: string
          park_id: string | null
          user_one_id: string
          user_two_id: string
        }
        Insert: {
          id?: string
          met_at?: string
          park_id?: string | null
          user_one_id: string
          user_two_id: string
        }
        Update: {
          id?: string
          met_at?: string
          park_id?: string | null
          user_one_id?: string
          user_two_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_park_id_fkey"
            columns: ["park_id"]
            isOneToOne: false
            referencedRelation: "parks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_user_one_id_fkey"
            columns: ["user_one_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_user_two_id_fkey"
            columns: ["user_two_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_profiles: {
        Row: {
          age_months: number | null
          allergy_info: string | null
          breed: string | null
          created_at: string
          id: string
          interest_tags: string[] | null
          name: string
          photo_url: string | null
          profile_id: string
          size: string | null
          temperament_tags: string[] | null
          type: string
          vaccination_date: string | null
          vaccination_status: boolean | null
        }
        Insert: {
          age_months?: number | null
          allergy_info?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          interest_tags?: string[] | null
          name: string
          photo_url?: string | null
          profile_id: string
          size?: string | null
          temperament_tags?: string[] | null
          type: string
          vaccination_date?: string | null
          vaccination_status?: boolean | null
        }
        Update: {
          age_months?: number | null
          allergy_info?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          interest_tags?: string[] | null
          name?: string
          photo_url?: string | null
          profile_id?: string
          size?: string | null
          temperament_tags?: string[] | null
          type?: string
          vaccination_date?: string | null
          vaccination_status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "member_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          id: string
          photo_url: string | null
          read_at: string | null
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          content: string
          conversation_id?: string
          id?: string
          photo_url?: string | null
          read_at?: string | null
          receiver_id: string
          sender_id: string
          sent_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          id?: string
          photo_url?: string | null
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      parks: {
        Row: {
          address: string | null
          amenities: string[] | null
          average_rating: number | null
          city: string | null
          cover_photo_url: string | null
          created_at: string
          has_dog_run: boolean | null
          has_parking: boolean | null
          has_restrooms: boolean | null
          id: string
          latitude: number
          leash_required: boolean | null
          longitude: number
          name: string
          total_reviews: number | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          average_rating?: number | null
          city?: string | null
          cover_photo_url?: string | null
          created_at?: string
          has_dog_run?: boolean | null
          has_parking?: boolean | null
          has_restrooms?: boolean | null
          id?: string
          latitude: number
          leash_required?: boolean | null
          longitude: number
          name: string
          total_reviews?: number | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          average_rating?: number | null
          city?: string | null
          cover_photo_url?: string | null
          created_at?: string
          has_dog_run?: boolean | null
          has_parking?: boolean | null
          has_restrooms?: boolean | null
          id?: string
          latitude?: number
          leash_required?: boolean | null
          longitude?: number
          name?: string
          total_reviews?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          created_at: string
          current_streak: number
          display_name: string
          email: string | null
          id: string
          last_checkin_date: string | null
          latitude: number | null
          level: number
          longest_streak: number
          longitude: number | null
          park_points: number
          subscription_tier: string
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          current_streak?: number
          display_name?: string
          email?: string | null
          id?: string
          last_checkin_date?: string | null
          latitude?: number | null
          level?: number
          longest_streak?: number
          longitude?: number | null
          park_points?: number
          subscription_tier?: string
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          created_at?: string
          current_streak?: number
          display_name?: string
          email?: string | null
          id?: string
          last_checkin_date?: string | null
          latitude?: number | null
          level?: number
          longest_streak?: number
          longitude?: number | null
          park_points?: number
          subscription_tier?: string
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          profile_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_profile_owner: { Args: { profile_id_input: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
