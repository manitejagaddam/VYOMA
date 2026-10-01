"use server";

import { createClient } from "@supabase/supabase-js";

export async function submitContactForm(formData: FormData, turnstileToken: string | null) {
  // Validate Turnstile if keys are configured
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && secretKey && turnstileToken) {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${turnstileToken}`,
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error("Turnstile validation failed. Please try again.");
    }
  }

  // Insert into Supabase
  // We use the service key because RLS might prevent anonymous inserts if configured strictly
  const supabaseUrl = process.env.VYOMA_DB_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VYOMA_DB_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Database configuration missing.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const lead = {
    name:        formData.get("name"),
    email:       formData.get("email"),
    company:     formData.get("company") || null,
    need:        formData.get("need"),
    stage:       formData.get("stage"),
    timeline:    formData.get("timeline"),
    budget:      formData.get("budget") || null,
    description: formData.get("description"),
    source:      formData.get("source") || null,
  };

  const { error } = await supabase.from("leads").insert([lead]);
  
  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("Failed to submit inquiry.");
  }
  
  return { success: true };
}
