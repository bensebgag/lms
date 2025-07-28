// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signUp(
    email: string,
    password: string,
    name?: string,
    avatarUrl?: string,
  ) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signUp({
          email,
          password,
          options: {
            data: { name, avatarUrl },
          },
        });

      if (error) {
        console.error('Supabase signup error:', error);
        throw new Error(`Database error saving new user: ${error.message}`);
      }

      return data;
    } catch (err) {
      console.error('Auth service error:', err);
      throw err;
    }
  }
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email,
        password,
      });
    if (error) throw new Error(error.message);
    return data.session;
  }
}
