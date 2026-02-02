export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1';
  };
  public: {
    Tables: {
      business_locations: {
        Row: {
          address: string;
          business_id: string;
          city: string;
          id: string;
          lat: number | null;
          lng: number | null;
        };
        Insert: {
          address: string;
          business_id: string;
          city: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
        };
        Update: {
          address?: string;
          business_id?: string;
          city?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'business_locations_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
        ];
      };
      business_schedules: {
        Row: {
          business_id: string;
          close_time: string;
          day_of_week: string;
          id: string;
          open_time: string;
        };
        Insert: {
          business_id: string;
          close_time: string;
          day_of_week: string;
          id?: string;
          open_time: string;
        };
        Update: {
          business_id?: string;
          close_time?: string;
          day_of_week?: string;
          id?: string;
          open_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'business_schedules_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
        ];
      };
      businesses: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          owner_id: string;
          phone: string | null;
          status: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          phone?: string | null;
          status?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          phone?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'businesses_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      capacity_slots: {
        Row: {
          business_id: string;
          capacity_available: number;
          capacity_total: number;
          created_at: string;
          end_time: string;
          id: string;
          slot_date: string;
          start_time: string;
          status: string;
        };
        Insert: {
          business_id: string;
          capacity_available: number;
          capacity_total: number;
          created_at?: string;
          end_time: string;
          id?: string;
          slot_date: string;
          start_time: string;
          status?: string;
        };
        Update: {
          business_id?: string;
          capacity_available?: number;
          capacity_total?: number;
          created_at?: string;
          end_time?: string;
          id?: string;
          slot_date?: string;
          start_time?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'capacity_slots_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          confirmed_at: string | null;
          created_at: string;
          currency: string;
          id: string;
          provider: string;
          qr_reference: string | null;
          reservation_id: string;
          status: string;
        };
        Insert: {
          amount: number;
          confirmed_at?: string | null;
          created_at?: string;
          currency?: string;
          id?: string;
          provider: string;
          qr_reference?: string | null;
          reservation_id: string;
          status?: string;
        };
        Update: {
          amount?: number;
          confirmed_at?: string | null;
          created_at?: string;
          currency?: string;
          id?: string;
          provider?: string;
          qr_reference?: string | null;
          reservation_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_reservation_id_fkey';
            columns: ['reservation_id'];
            isOneToOne: false;
            referencedRelation: 'reservations';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          phone: string | null;
          role: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id: string;
          phone?: string | null;
          role?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          phone?: string | null;
          role?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          business_id: string;
          created_at: string;
          expires_at: string | null;
          id: string;
          people_count: number;
          slot_id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          business_id: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          people_count: number;
          slot_id: string;
          status?: string;
          user_id: string;
        };
        Update: {
          business_id?: string;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          people_count?: number;
          slot_id?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reservations_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_slot_id_fkey';
            columns: ['slot_id'];
            isOneToOne: false;
            referencedRelation: 'capacity_slots';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reservations_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          business_id: string;
          comment: string | null;
          created_at: string;
          id: string;
          rating: number;
          status: string;
          user_id: string;
        };
        Insert: {
          business_id: string;
          comment?: string | null;
          created_at?: string;
          id?: string;
          rating: number;
          status?: string;
          user_id: string;
        };
        Update: {
          business_id?: string;
          comment?: string | null;
          created_at?: string;
          id?: string;
          rating?: number;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_business_id_fkey';
            columns: ['business_id'];
            isOneToOne: false;
            referencedRelation: 'businesses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
