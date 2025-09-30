CREATE TABLE "free_usage_quota" (
  "id" text PRIMARY KEY,
  "session_id" text NOT NULL,
  "feature" text NOT NULL,
  "user_id" text,
  "anonymous_uses" integer NOT NULL DEFAULT 0,
  "authenticated_uses" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "free_usage_quota_session_feature_idx" ON "free_usage_quota" USING btree ("session_id", "feature");
--> statement-breakpoint
CREATE INDEX "free_usage_quota_user_feature_idx" ON "free_usage_quota" USING btree ("user_id", "feature");
