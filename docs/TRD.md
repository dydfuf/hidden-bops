완벽합니다! MelodyVision의 상세한 TRD (Technical Requirements Document)를 작성해드리겠습니다.

***

# Technical Requirements Document (TRD)

## AI 뮤직비디오 제작 플랫폼 "MelodyVision"

**버전:** 1.0  
**작성일:** 2025년 11월 23일  
**담당자:** Engineering Team  
**상태:** Draft for Review

***

## 1. Executive Summary

### 1.1 문서 개요

이 문서는 MelodyVision의 기술적 구현 요구사항을 정의합니다. 시스템 아키텍처, 기술 스택, API 설계, 데이터 모델, 성능 요구사항, 보안 및 인프라 구성을 포함합니다.

### 1.2 기술 목표

- **확장성**: 10,000 동시 사용자 지원 (Phase 3)
- **성능**: 페이지 로드 < 2초, API 응답 < 500ms
- **안정성**: 99.9% 가동률
- **보안**: SOC 2 Type II 준수 수준
- **비용 효율성**: 사용자당 인프라 비용 < $5/월

***

## 2. 시스템 아키텍처

### 2.1 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js 14 (App Router) + React 18                 │   │
│  │  - Client Components (Interactive UI)               │   │
│  │  - Server Components (SSR, Data Fetching)           │   │
│  │  - React Query (State Management, Caching)          │   │
│  │  - Zustand (Global State)                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                   Edge/CDN Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Vercel Edge Network / Cloudflare CDN               │   │
│  │  - Static Assets Caching                            │   │
│  │  - Image Optimization                               │   │
│  │  - DDoS Protection                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (Serverless Functions)          │   │
│  │  - Authentication Middleware (NextAuth.js)          │   │
│  │  - Rate Limiting (Upstash Redis)                    │   │
│  │  - Request Validation (Zod)                         │   │
│  │  - Error Handling                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                Application Services Layer                   │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │   User       │   Project    │   Character  │            │
│  │   Service    │   Service    │   Service    │            │
│  └──────────────┴──────────────┴──────────────┘            │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │   Video      │   AI Image   │   Payment    │            │
│  │   Service    │   Service    │   Service    │            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Background Jobs Layer                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  BullMQ + Redis (Job Queue)                         │   │
│  │  - Video Generation Jobs                            │   │
│  │  - Image Generation Jobs                            │   │
│  │  - Email Notifications                              │   │
│  │  - Analytics Processing                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │ PostgreSQL   │  Supabase    │  Redis       │            │
│  │ (Supabase)   │  Storage     │  (Upstash)   │            │
│  │ - Relational │  - Files     │  - Cache     │            │
│  │ - JSONB      │  - Images    │  - Sessions  │            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                External Services Layer                      │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │ Nano Banana  │ Qwen Image   │ Kling Video  │            │
│  │ (Google)     │ (Together AI)│ (Together AI)│            │
│  └──────────────┴──────────────┴──────────────┘            │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │  Stripe      │  Cloudflare  │   Sentry     │            │
│  │  (Payment)   │  (CDN/R2)    │  (Monitoring)│            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 아키텍처 설계 원칙

**1. Serverless-First**
- 비용 효율성 (사용한 만큼만 지불)
- 자동 확장성
- 인프라 관리 부담 최소화

**2. Edge Computing**
- 정적 자산 CDN 배포
- 글로벌 저지연
- 이미지 최적화

**3. Event-Driven**
- 비동기 작업 큐 (BullMQ)
- 느슨한 결합
- 높은 확장성

**4. API-First**
- RESTful API 설계
- 명확한 계약 (OpenAPI)
- 버전 관리

**5. Security by Design**
- 인증/권한 분리
- 데이터 암호화
- Rate Limiting

***

## 3. 기술 스택

### 3.1 프론트엔드

#### 핵심 프레임워크
```yaml
Framework: Next.js 14.2+
  - App Router (서버 컴포넌트 + 클라이언트 컴포넌트)
  - React Server Components
  - Streaming SSR
  - Incremental Static Regeneration

UI Library: React 18.3+
  - Concurrent Features
  - Suspense
  - Server Components

Language: TypeScript 5.5+
  - Strict Mode
  - Type-safe APIs
```

#### 스타일링
```yaml
CSS Framework: Tailwind CSS 3.4+
  - JIT Compiler
  - Custom Design Tokens
  - Dark Mode Support

UI Components: shadcn/ui
  - Accessible Components (Radix UI)
  - Customizable
  - TypeScript Native

Icons: Lucide React
  - Tree-shakeable
  - Consistent Design
```

#### 상태 관리
```yaml
Server State: TanStack Query (React Query) v5
  - Data Fetching
  - Caching
  - Optimistic Updates
  - Background Refetching

Client State: Zustand 4.5+
  - Minimal Boilerplate
  - TypeScript Support
  - Middleware Support

Forms: React Hook Form 7.5+
  - Performance
  - Validation (Zod Integration)
  - TypeScript Support
```

#### 추가 라이브러리
```yaml
Validation: Zod 3.23+
Date/Time: date-fns 3.0+
Animation: Framer Motion 11+
Audio: Tone.js (audio analysis)
Video Player: Video.js 8+
File Upload: Uppy 3.0+
Charts: Recharts 2.12+
```

### 3.2 백엔드

#### 런타임 & 프레임워크
```yaml
Runtime: Node.js 20 LTS
Framework: Next.js 14 API Routes
  - Serverless Functions
  - Edge Runtime (where applicable)
  - Middleware

Language: TypeScript 5.5+
```

#### 인증 & 권한
```yaml
Authentication: NextAuth.js 5
  - JWT Strategy
  - OAuth Providers (Google, GitHub)
  - Email/Password
  - Session Management

Authorization: CASL 6
  - Role-Based Access Control (RBAC)
  - Permission System
  - Resource-Level Permissions
```

#### 데이터베이스 & ORM
```yaml
Database: PostgreSQL 16
  - JSONB for flexible data
  - Full-text search
  - Row-level security

ORM: Drizzle ORM 0.30+
  - TypeScript-first
  - SQL-like queries
  - Migrations
  - Type-safe

Alternative considered: Prisma 5.x
  - Chose Drizzle for performance & edge compatibility
```

#### 작업 큐
```yaml
Queue: BullMQ 5.0+
Cache/Broker: Redis (Upstash)
  - Job scheduling
  - Retry logic
  - Priority queues
  - Job monitoring
```

### 3.3 인프라 & DevOps

#### 호스팅
```yaml
Application: Vercel
  - Serverless Functions
  - Edge Network
  - Preview Deployments
  - Analytics

Database: Supabase
  - Managed PostgreSQL
  - Storage (S3-compatible)
  - Real-time subscriptions
  - Auth (alternative to NextAuth)

Cache: Upstash Redis
  - Serverless Redis
  - Global Replication
  - Pay-per-request

CDN: Cloudflare
  - R2 Object Storage (video files)
  - CDN
  - DDoS Protection
```

#### CI/CD
```yaml
VCS: GitHub
  - Monorepo structure
  - Branch protection

CI/CD: GitHub Actions
  - Automated testing
  - Linting & type checking
  - Build & deploy
  - Playwright E2E tests

Preview: Vercel Preview Deployments
  - PR-based previews
  - Environment variables
```

#### 모니터링 & 로깅
```yaml
Error Tracking: Sentry
  - Error monitoring
  - Performance tracking
  - User feedback

Analytics: Vercel Analytics + PostHog
  - Web vitals
  - User behavior
  - Funnel analysis
  - Feature flags

Logging: Axiom
  - Structured logs
  - Serverless-friendly
  - Real-time search

Uptime: Better Uptime
  - Status page
  - Incident management
```

### 3.4 외부 서비스

#### AI 서비스
```yaml
Image Generation:
  - Nano Banana 2 (Google Gemini API)
  - Qwen Image Edit (Together AI / CometAPI)

Video Generation:
  - Kling 2.1 Standard/Master (Together AI)
  - Runway Gen-3 (Runway API) - Phase 2
  - Pika 1.5 (Pika API) - Phase 3

Audio Analysis:
  - Essentia.js (client-side)
  - Spotify Web API (optional)
```

#### 결제
```yaml
Payment Gateway: Stripe
  - Subscriptions
  - One-time payments
  - Invoicing
  - Webhooks

Tax: Stripe Tax
  - Automatic tax calculation
  - Global compliance
```

#### 이메일
```yaml
Transactional: Resend
  - Email API
  - React Email templates
  - Analytics

Marketing: Loops (Phase 2)
  - Newsletter
  - Drip campaigns
```

#### 비디오 처리
```yaml
Transcoding: Cloudflare Stream (Phase 2)
  - Adaptive bitrate streaming
  - Thumbnail generation
  - Analytics

Alternative: FFmpeg (self-hosted)
  - Video concatenation
  - Audio sync
  - Transitions
```

***

## 4. 데이터베이스 설계

### 4.1 스키마 상세 설계

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  name VARCHAR(255),
  avatar_url TEXT,
  
  -- Subscription
  subscription_plan VARCHAR(50) DEFAULT 'free' 
    CHECK (subscription_plan IN ('free', 'indie', 'pro', 'team')),
  subscription_status VARCHAR(50) DEFAULT 'active'
    CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'trialing')),
  subscription_current_period_end TIMESTAMP,
  
  -- Stripe
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255),
  
  -- Credits (종량제)
  credits_remaining INTEGER DEFAULT 0,
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT FALSE,
  locale VARCHAR(10) DEFAULT 'ko',
  timezone VARCHAR(50) DEFAULT 'Asia/Seoul',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  
  -- Soft delete
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_subscription_plan ON users(subscription_plan);
```

#### Character Profiles Table
```sql
CREATE TABLE character_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Reference Images
  reference_images TEXT[] DEFAULT '{}', -- Array of Storage URLs
  
  -- AI Analysis Data
  analysis_data JSONB DEFAULT '{}'::JSONB,
  -- Example structure:
  -- {
  --   "face_embedding": [...512-dim vector],
  --   "key_features": ["sharp brown eyes", "short black hair"],
  --   "style_preference": "realistic",
  --   "nano_banana_profile_id": "abc123",
  --   "confidence_score": 0.95
  -- }
  
  -- Test Images
  test_images TEXT[] DEFAULT '{}',
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'approved', 'rejected', 'failed')),
  error_message TEXT,
  
  -- Usage Stats
  projects_count INTEGER DEFAULT 0,
  images_generated INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  approved_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_characters_user_id ON character_profiles(user_id);
CREATE INDEX idx_characters_status ON character_profiles(status);
CREATE INDEX idx_characters_created_at ON character_profiles(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE character_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own characters"
  ON character_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own characters"
  ON character_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_profile_id UUID REFERENCES character_profiles(id) ON DELETE SET NULL,
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Audio
  audio_url TEXT NOT NULL, -- Supabase Storage URL
  audio_filename VARCHAR(255),
  audio_size_bytes INTEGER,
  audio_duration_seconds DECIMAL(10, 2),
  
  -- Audio Analysis
  audio_analysis JSONB DEFAULT '{}'::JSONB,
  -- Example structure:
  -- {
  --   "tempo": 120,
  --   "key": "A Minor",
  --   "time_signature": "4/4",
  --   "energy": 0.75,
  --   "valence": 0.60,
  --   "sections": [
  --     {"type": "intro", "start": 0, "end": 15, "energy": 0.5},
  --     {"type": "verse", "start": 15, "end": 45, "energy": 0.6},
  --     {"type": "chorus", "start": 45, "end": 75, "energy": 0.9}
  --   ],
  --   "beats": [0.5, 1.0, 1.5, 2.0, ...]
  -- }
  
  -- Template
  template_id VARCHAR(100), -- 'urban-night', 'nature-journey', etc.
  template_config JSONB DEFAULT '{}'::JSONB,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft'
    CHECK (status IN ('draft', 'editing', 'generating', 'complete', 'failed', 'archived')),
  
  -- Video Output
  final_video_url TEXT,
  final_video_duration_seconds DECIMAL(10, 2),
  final_video_resolution VARCHAR(20), -- '720p', '1080p', '4k'
  
  -- Costs
  total_cost_usd DECIMAL(10, 4) DEFAULT 0,
  cost_breakdown JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "images": 0.03,
  --   "videos": 7.32,
  --   "total": 7.35
  -- }
  
  -- Collaboration (Phase 3)
  is_public BOOLEAN DEFAULT FALSE,
  collaborators UUID[] DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  archived_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_character_id ON projects(character_profile_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_updated_at ON projects(updated_at DESC);

-- Full-text search
CREATE INDEX idx_projects_title_search ON projects 
  USING GIN (to_tsvector('english', title));
```

#### Scenes Table
```sql
CREATE TABLE scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Scene Info
  scene_number INTEGER NOT NULL,
  
  -- Timing
  timestamp_start DECIMAL(10, 2) NOT NULL,
  timestamp_end DECIMAL(10, 2) NOT NULL,
  duration_seconds DECIMAL(10, 2) GENERATED ALWAYS AS 
    (timestamp_end - timestamp_start) STORED,
  
  -- Audio Section
  section_type VARCHAR(50), -- 'intro', 'verse', 'chorus', 'bridge', 'outro'
  
  -- Description & Config
  description TEXT NOT NULL,
  config JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "background": "urban",
  --   "time_of_day": "night",
  --   "weather": "clear",
  --   "camera_angle": "wide",
  --   "lighting": "neon",
  --   "custom_prompt": "..."
  -- }
  
  -- Generated Assets
  image_url TEXT,
  image_generation_model VARCHAR(50), -- 'nano-banana', 'qwen'
  image_generation_time_ms INTEGER,
  
  video_url TEXT,
  video_generation_model VARCHAR(50), -- 'kling-standard', 'kling-master', 'runway'
  video_generation_time_ms INTEGER,
  video_resolution VARCHAR(20),
  video_duration_seconds DECIMAL(10, 2),
  
  -- Costs
  image_cost_usd DECIMAL(10, 4) DEFAULT 0,
  video_cost_usd DECIMAL(10, 4) DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending'
    CHECK (status IN ('pending', 'generating_image', 'image_ready', 
                      'generating_video', 'video_ready', 'error')),
  error_message TEXT,
  
  -- Regeneration
  generation_attempts INTEGER DEFAULT 0,
  previous_versions JSONB DEFAULT '[]'::JSONB,
  -- [
  --   {"image_url": "...", "video_url": "...", "created_at": "..."},
  --   ...
  -- ]
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT positive_duration CHECK (timestamp_end > timestamp_start),
  CONSTRAINT unique_scene_number UNIQUE (project_id, scene_number)
);

-- Indexes
CREATE INDEX idx_scenes_project_id ON scenes(project_id);
CREATE INDEX idx_scenes_status ON scenes(status);
CREATE INDEX idx_scenes_scene_number ON scenes(project_id, scene_number);
```

#### Video Generation Jobs Table
```sql
CREATE TABLE video_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Job Info
  job_type VARCHAR(50) DEFAULT 'full_video'
    CHECK (job_type IN ('full_video', 'single_scene', 'test')),
  
  -- Configuration
  config JSONB NOT NULL,
  -- {
  --   "quality_tier": "standard" | "pro" | "premium",
  --   "resolution": "720p" | "1080p" | "4k",
  --   "fps": 24 | 30,
  --   "model_selections": {
  --     "1": "kling-standard",
  --     "2": "kling-standard",
  --     "3": "kling-master"
  --   }
  -- }
  
  -- Progress
  status VARCHAR(50) DEFAULT 'queued'
    CHECK (status IN ('queued', 'processing', 'complete', 'failed', 'canceled')),
  progress JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "current_stage": "image" | "video" | "postprocessing",
  --   "completed_scenes": 3,
  --   "total_scenes": 8,
  --   "estimated_time_remaining_seconds": 180
  -- }
  
  -- Results
  output_url TEXT,
  output_metadata JSONB,
  -- {
  --   "duration": 165,
  --   "resolution": "1080p",
  --   "file_size_bytes": 50000000,
  --   "format": "mp4"
  -- }
  
  -- Costs
  costs JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "images": 0.03,
  --   "videos": 7.32,
  --   "processing": 0.05,
  --   "total": 7.40
  -- }
  
  -- Error Handling
  error_message TEXT,
  error_details JSONB,
  retry_count INTEGER DEFAULT 0,
  
  -- Priority
  priority INTEGER DEFAULT 0, -- Higher = more urgent
  
  -- BullMQ Job ID
  bullmq_job_id VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  failed_at TIMESTAMP,
  canceled_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_video_jobs_project_id ON video_jobs(project_id);
CREATE INDEX idx_video_jobs_user_id ON video_jobs(user_id);
CREATE INDEX idx_video_jobs_status ON video_jobs(status);
CREATE INDEX idx_video_jobs_created_at ON video_jobs(created_at DESC);
CREATE INDEX idx_video_jobs_priority ON video_jobs(priority DESC, created_at ASC);
```

#### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Plan Info
  plan VARCHAR(50) NOT NULL
    CHECK (plan IN ('free', 'indie', 'pro', 'team')),
  status VARCHAR(50) NOT NULL
    CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  
  -- Stripe
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  
  -- Billing Period
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP,
  
  -- Trial
  trial_start TIMESTAMP,
  trial_end TIMESTAMP,
  
  -- Usage Tracking
  usage JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "videos_created_this_period": 3,
  --   "credits_used_this_period": 150,
  --   "total_videos_created": 45,
  --   "last_video_created_at": "2025-11-20T10:30:00Z"
  -- }
  
  -- Limits (based on plan)
  limits JSONB DEFAULT '{}'::JSONB,
  -- {
  --   "max_video_length_seconds": 180,
  --   "max_videos_per_month": null, // null = unlimited
  --   "max_character_profiles": 3,
  --   "max_concurrent_projects": 5
  -- }
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Constraint
  CONSTRAINT one_subscription_per_user UNIQUE (user_id)
);

-- Indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_end);
```

### 4.2 데이터베이스 최적화

#### 인덱싱 전략
```sql
-- Composite indexes for common queries
CREATE INDEX idx_projects_user_status ON projects(user_id, status);
CREATE INDEX idx_scenes_project_status ON scenes(project_id, status);
CREATE INDEX idx_video_jobs_user_status ON video_jobs(user_id, status);

-- Partial indexes for active records
CREATE INDEX idx_active_projects ON projects(user_id, updated_at DESC)
  WHERE deleted_at IS NULL AND status != 'archived';

CREATE INDEX idx_processing_jobs ON video_jobs(created_at ASC)
  WHERE status IN ('queued', 'processing');
```

#### 파티셔닝 (Phase 3)
```sql
-- Partition video_jobs by created_at (monthly)
CREATE TABLE video_jobs_partitioned (
  LIKE video_jobs INCLUDING ALL
) PARTITION BY RANGE (created_at);

CREATE TABLE video_jobs_2025_11 PARTITION OF video_jobs_partitioned
  FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

CREATE TABLE video_jobs_2025_12 PARTITION OF video_jobs_partitioned
  FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');
```

#### 데이터베이스 설정
```sql
-- Connection pooling
-- Supabase provides PgBouncer built-in

-- Prepared statements
SET plan_cache_mode = force_generic_plan;

-- Query timeout
SET statement_timeout = '30s';

-- Work mem for complex queries
SET work_mem = '256MB';
```

***

## 5. API 설계

### 5.1 RESTful API 엔드포인트

#### Authentication
```typescript
POST /api/auth/signup
Request:
{
  email: string;
  password: string;
  name?: string;
}
Response: 201
{
  user: User;
  session: Session;
}

POST /api/auth/login
Request:
{
  email: string;
  password: string;
}
Response: 200
{
  user: User;
  session: Session;
}

POST /api/auth/logout
Response: 204

GET /api/auth/session
Response: 200
{
  user: User;
  session: Session;
}

POST /api/auth/forgot-password
Request:
{
  email: string;
}
Response: 200
{
  message: "Password reset email sent";
}
```

#### Users
```typescript
GET /api/users/me
Response: 200
{
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  subscription_plan: 'free' | 'indie' | 'pro' | 'team';
  subscription_status: string;
  credits_remaining: number;
  created_at: string;
}

PATCH /api/users/me
Request:
{
  name?: string;
  avatar_url?: string;
  locale?: string;
  timezone?: string;
}
Response: 200
{
  user: User;
}

DELETE /api/users/me
Response: 204
```

#### Character Profiles
```typescript
GET /api/characters
Query Params:
  - limit: number (default: 20)
  - offset: number (default: 0)
  - status: 'pending' | 'approved' | 'rejected'
Response: 200
{
  data: CharacterProfile[];
  total: number;
  limit: number;
  offset: number;
}

POST /api/characters
Request:
{
  name: string;
  description?: string;
  reference_images: string[]; // Uploaded file URLs
}
Response: 201
{
  character: CharacterProfile;
}

GET /api/characters/:id
Response: 200
{
  character: CharacterProfile;
}

PATCH /api/characters/:id
Request:
{
  name?: string;
  description?: string;
  status?: 'approved' | 'rejected';
}
Response: 200
{
  character: CharacterProfile;
}

DELETE /api/characters/:id
Response: 204

POST /api/characters/:id/regenerate-tests
Response: 200
{
  test_images: string[];
}
```

#### Projects
```typescript
GET /api/projects
Query Params:
  - limit: number
  - offset: number
  - status: string
  - character_id: string
  - sort: 'updated_desc' | 'created_desc' | 'title_asc'
  - q: string (search)
Response: 200
{
  data: Project[];
  total: number;
  limit: number;
  offset: number;
}

POST /api/projects
Request:
{
  title: string;
  audio_file: File; // Multipart form data
  character_profile_id: string;
  template_id?: string;
}
Response: 201
{
  project: Project;
}

GET /api/projects/:id
Response: 200
{
  project: Project;
  scenes: Scene[];
}

PATCH /api/projects/:id
Request:
{
  title?: string;
  description?: string;
  status?: string;
  template_id?: string;
}
Response: 200
{
  project: Project;
}

DELETE /api/projects/:id
Response: 204

POST /api/projects/:id/analyze-audio
Response: 200
{
  analysis: AudioAnalysis;
  suggested_scenes: SceneSuggestion[];
}

POST /api/projects/:id/generate-video
Request:
{
  config: {
    quality_tier: 'standard' | 'pro' | 'premium';
    resolution: '720p' | '1080p' | '4k';
    model_selections?: Record<number, string>;
  };
}
Response: 202
{
  job_id: string;
  estimated_time_seconds: number;
  estimated_cost_usd: number;
}
```

#### Scenes
```typescript
GET /api/projects/:projectId/scenes
Response: 200
{
  scenes: Scene[];
}

POST /api/projects/:projectId/scenes
Request:
{
  scene_number: number;
  timestamp_start: number;
  timestamp_end: number;
  description: string;
  config?: SceneConfig;
}
Response: 201
{
  scene: Scene;
}

GET /api/scenes/:id
Response: 200
{
  scene: Scene;
}

PATCH /api/scenes/:id
Request:
{
  description?: string;
  config?: SceneConfig;
}
Response: 200
{
  scene: Scene;
}

DELETE /api/scenes/:id
Response: 204

POST /api/scenes/:id/regenerate
Request:
{
  type: 'image' | 'video' | 'both';
  config?: SceneConfig;
}
Response: 202
{
  job_id: string;
  estimated_time_seconds: number;
}
```

#### Video Generation
```typescript
POST /api/video/generate
Request:
{
  project_id: string;
  config: VideoGenerationConfig;
}
Response: 202
{
  job_id: string;
  estimated_time_seconds: number;
  estimated_cost_usd: number;
}

GET /api/video/jobs/:jobId
Response: 200
{
  job: VideoJob;
}

GET /api/video/jobs/:jobId/progress
Response: 200
{
  job_id: string;
  status: string;
  progress: {
    current_stage: string;
    completed_scenes: number;
    total_scenes: number;
    estimated_time_remaining: number;
  };
  current_cost: number;
}

POST /api/video/jobs/:jobId/cancel
Response: 200
{
  message: "Job canceled successfully";
}
```

#### Billing
```typescript
GET /api/billing/plans
Response: 200
{
  plans: Plan[];
}

POST /api/billing/create-checkout-session
Request:
{
  plan_id: 'indie' | 'pro' | 'team';
  billing_cycle: 'monthly' | 'yearly';
}
Response: 200
{
  checkout_url: string;
  session_id: string;
}

POST /api/billing/create-portal-session
Response: 200
{
  portal_url: string;
}

GET /api/billing/subscription
Response: 200
{
  subscription: Subscription;
  usage: Usage;
}

POST /api/billing/credits/purchase
Request:
{
  amount: number; // e.g., 100 credits
}
Response: 200
{
  checkout_url: string;
}

GET /api/billing/invoices
Response: 200
{
  invoices: Invoice[];
}

POST /api/billing/webhook
// Stripe webhook endpoint
Request: Stripe Event
Response: 200
```

### 5.2 WebSocket API (실시간 업데이트)

```typescript
// Connection
const ws = new WebSocket('wss://melodyvision.ai/ws');

// Authentication
ws.send(JSON.stringify({
  type: 'auth',
  token: 'jwt_token'
}));

// Subscribe to job updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: `video_job:${jobId}`
}));

// Receive updates
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  /*
  {
    type: 'job_progress',
    job_id: 'abc123',
    data: {
      status: 'processing',
      progress: {
        completed_scenes: 3,
        total_scenes: 8
      }
    }
  }
  */
};

// Unsubscribe
ws.send(JSON.stringify({
  type: 'unsubscribe',
  channel: `video_job:${jobId}`
}));
```

### 5.3 API 인증 & 권한

#### JWT 구조
```typescript
interface JWTPayload {
  sub: string; // user_id
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'indie' | 'pro' | 'team';
  iat: number;
  exp: number;
}
```

#### Rate Limiting
```typescript
// Rate limits by plan
const rateLimits = {
  free: {
    api_requests: '100/hour',
    video_generation: '2/day',
    image_generation: '50/day'
  },
  indie: {
    api_requests: '1000/hour',
    video_generation: 'unlimited',
    image_generation: 'unlimited'
  },
  pro: {
    api_requests: '5000/hour',
    video_generation: 'unlimited',
    image_generation: 'unlimited',
    priority_queue: true
  }
};

// Implementation with Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
  analytics: true
});
```

***

## 6. AI 서비스 통합

### 6.1 Nano Banana 2 통합

#### API Client
```typescript
// lib/ai/nanoBananaClient.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

interface NanoBananaConfig {
  apiKey: string;
  model: 'gemini-2.5-flash';
}

interface CharacterProfileData {
  referenceImages: string[];
  keyFeatures: string[];
}

interface ImageGenerationParams {
  characterProfile: CharacterProfileData;
  prompt: string;
  resolution: '2K' | '4K';
  aspectRatio: '16:9' | '9:16' | '1:1';
  style?: string;
}

export class NanoBananaClient {
  private client: GoogleGenerativeAI;
  private model: string;
  
  constructor(config: NanoBananaConfig) {
    this.client = new GoogleGenerativeAI(config.apiKey);
    this.model = config.model;
  }
  
  /**
   * Create character profile from reference images
   */
  async createCharacter(params: {
    images: Buffer[];
    features: string[];
  }): Promise<CharacterProfileData> {
    try {
      // 1. Upload images to Gemini
      const uploadedFiles = await Promise.all(
        params.images.map(img => this.uploadImage(img))
      );
      
      // 2. Extract character features
      const prompt = `Analyze these images and extract key facial features.
        Focus on: face shape, eyes, nose, mouth, hair, unique characteristics.
        Provided features: ${params.features.join(', ')}
        Return JSON: { "face_embedding": [...], "key_features": [...] }`;
      
      const model = this.client.getGenerativeModel({ model: this.model });
      const result = await model.generateContent([
        prompt,
        ...uploadedFiles.map(f => ({ fileData: f }))
      ]);
      
      const response = await result.response;
      const analysisData = JSON.parse(response.text());
      
      return {
        referenceImages: uploadedFiles.map(f => f.uri),
        keyFeatures: analysisData.key_features
      };
      
    } catch (error) {
      console.error('Nano Banana character creation failed:', error);
      throw new Error('Failed to create character profile');
    }
  }
  
  /**
   * Generate scene image with character consistency
   */
  async generateImage(params: ImageGenerationParams): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95
        }
      });
      
      // Build prompt with character features
      const fullPrompt = this.buildPrompt(params);
      
      // Include reference images for consistency
      const referenceFiles = await Promise.all(
        params.characterProfile.referenceImages.map(url => 
          this.fetchImage(url)
        )
      );
      
      const result = await model.generateContent([
        fullPrompt,
        ...referenceFiles.map(f => ({ inlineData: f }))
      ]);
      
      const response = await result.response;
      const imageData = response.candidates[0].content.parts[0].inlineData;
      
      // Upload to Supabase Storage
      const imageUrl = await this.uploadToStorage(imageData);
      
      return imageUrl;
      
    } catch (error) {
      console.error('Nano Banana image generation failed:', error);
      throw new Error('Failed to generate image');
    }
  }
  
  /**
   * Edit existing image (local editing)
   */
  async editImage(params: {
    baseImage: string;
    editPrompt: string;
    characterProfile: CharacterProfileData;
    preserveCharacter: boolean;
  }): Promise<string> {
    try {
      const model = this.client.getGenerativeModel({ model: this.model });
      
      const baseImageData = await this.fetchImage(params.baseImage);
      
      const prompt = `${params.editPrompt}
        ${params.preserveCharacter ? 
          `Maintain these character features: ${params.characterProfile.keyFeatures.join(', ')}` 
          : ''}
        Use partial denoising for local editing only.`;
      
      const result = await model.generateContent([
        prompt,
        { inlineData: baseImageData }
      ]);
      
      const response = await result.response;
      const editedImageData = response.candidates[0].content.parts[0].inlineData;
      
      const imageUrl = await this.uploadToStorage(editedImageData);
      
      return imageUrl;
      
    } catch (error) {
      console.error('Nano Banana image edit failed:', error);
      throw new Error('Failed to edit image');
    }
  }
  
  private buildPrompt(params: ImageGenerationParams): string {
    let prompt = params.prompt;
    
    // Add character features
    prompt += `\n\nCharacter features to maintain: ${params.characterProfile.keyFeatures.join(', ')}`;
    
    // Add technical specs
    prompt += `\nResolution: ${params.resolution}`;
    prompt += `\nAspect Ratio: ${params.aspectRatio}`;
    
    if (params.style) {
      prompt += `\nStyle: ${params.style}`;
    }
    
    // Quality hints
    prompt += `\nCinematic quality, high detail, professional lighting`;
    
    return prompt;
  }
  
  private async uploadImage(buffer: Buffer) {
    // Implementation
  }
  
  private async fetchImage(url: string) {
    // Implementation
  }
  
  private async uploadToStorage(imageData: any): Promise<string> {
    // Upload to Supabase Storage
    // Return public URL
  }
}

// Usage
const nanoBanana = new NanoBananaClient({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
  model: 'gemini-2.5-flash'
});

// Create character
const character = await nanoBanana.createCharacter({
  images: [image1Buffer, image2Buffer],
  features: ['short black hair', 'brown eyes']
});

// Generate scene
const imageUrl = await nanoBanana.generateImage({
  characterProfile: character,
  prompt: 'Character walking in urban street at night, neon lights',
  resolution: '2K',
  aspectRatio: '16:9'
});
```

### 6.2 Qwen Image Edit 통합

```typescript
// lib/ai/qwenClient.ts

interface QwenConfig {
  apiKey: string;
  baseUrl: string;
}

interface QwenEditParams {
  baseImage: string;
  instruction: string;
  mode: 'semantic' | 'appearance' | 'dual';
  preserveLayout?: boolean;
  mask?: string; // Optional mask for targeted editing
  region?: { x: number; y: number; width: number; height: number };
}

export class QwenClient {
  private apiKey: string;
  private baseUrl: string;
  
  constructor(config: QwenConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl; // Together AI or CometAPI
  }
  
  /**
   * Edit image with dual-track architecture
   */
  async editImage(params: QwenEditParams): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/images/edit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen-Image-Edit',
          image: params.baseImage,
          instruction: params.instruction,
          mode: params.mode,
          preserve_layout: params.preserveLayout,
          mask: params.mask,
          region: params.region,
          num_inference_steps: 50,
          guidance_scale: 7.5
        })
      });
      
      if (!response.ok) {
        throw new Error(`Qwen API error: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Upload to storage
      const imageUrl = await this.uploadToStorage(result.image);
      
      return imageUrl;
      
    } catch (error) {
      console.error('Qwen edit failed:', error);
      throw new Error('Failed to edit image with Qwen');
    }
  }
  
  /**
   * Text editing (specialized for Qwen's strength)
   */
  async editText(params: {
    baseImage: string;
    textEdits: Array<{
      originalText: string;
      newText: string;
      preserveFont?: boolean;
    }>;
  }): Promise<string> {
    const instruction = params.textEdits.map(edit => 
      `Replace "${edit.originalText}" with "${edit.newText}"${
        edit.preserveFont ? ', maintaining font style and layout' : ''
      }`
    ).join('. ');
    
    return this.editImage({
      baseImage: params.baseImage,
      instruction: instruction,
      mode: 'appearance', // Precise pixel-level editing
      preserveLayout: true
    });
  }
  
  /**
   * Chain editing (multiple sequential edits)
   */
  async chainEdit(params: {
    baseImage: string;
    edits: Array<{
      instruction: string;
      mode: 'semantic' | 'appearance' | 'dual';
      mask?: string;
    }>;
  }): Promise<string> {
    let currentImage = params.baseImage;
    
    for (const edit of params.edits) {
      currentImage = await this.editImage({
        baseImage: currentImage,
        instruction: edit.instruction,
        mode: edit.mode,
        mask: edit.mask
      });
    }
    
    return currentImage;
  }
  
  private async uploadToStorage(imageData: string): Promise<string> {
    // Implementation
  }
}

// Usage
const qwen = new QwenClient({
  apiKey: process.env.TOGETHER_AI_API_KEY!,
  baseUrl: 'https://api.together.xyz'
});

// Precise object editing
const editedImage = await qwen.editImage({
  baseImage: sceneImageUrl,
  instruction: 'Change jacket to red, keep face unchanged',
  mode: 'appearance',
  preserveLayout: true
});

// Text editing
const textEditedImage = await qwen.editText({
  baseImage: signImageUrl,
  textEdits: [
    { originalText: 'OPEN', newText: 'HOPE', preserveFont: true }
  ]
});
```

### 6.3 Kling Video Generation 통합

```typescript
// lib/ai/klingClient.ts

interface KlingConfig {
  apiKey: string;
  baseUrl: string;
}

interface VideoGenerationParams {
  imageUrl: string;
  prompt: string;
  duration: 5 | 10; // seconds
  model: 'kling-2.1-standard' | 'kling-2.1-master';
  cameraMovement?: {
    type: 'zoom_in' | 'zoom_out' | 'pan_left' | 'pan_right' | 'static';
    speed?: 'slow' | 'medium' | 'fast';
  };
  motionStrength?: number; // 0-1
}

interface VideoJob {
  id: string;
  status: 'queued' | 'processing' | 'succeeded' | 'failed';
  videoUrl?: string;
  error?: string;
}

export class KlingClient {
  private apiKey: string;
  private baseUrl: string;
  
  constructor(config: KlingConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl; // Together AI
  }
  
  /**
   * Start video generation job
   */
  async generateVideo(params: VideoGenerationParams): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/v2/videos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.getModelName(params.model),
          frame_images: [{
            input_image: params.imageUrl
          }],
          duration: params.duration,
          prompt: this.buildVideoPrompt(params),
          camera_movement: params.cameraMovement,
          motion_strength: params.motionStrength || 0.7
        })
      });
      
      if (!response.ok) {
        throw new Error(`Kling API error: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result.id; // Job ID for polling
      
    } catch (error) {
      console.error('Kling video generation failed:', error);
      throw new Error('Failed to start video generation');
    }
  }
  
  /**
   * Poll job status
   */
  async getJobStatus(jobId: string): Promise<VideoJob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v2/videos/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Kling API error: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      return {
        id: result.id,
        status: result.status,
        videoUrl: result.output?.video_url,
        error: result.error?.message
      };
      
    } catch (error) {
      console.error('Kling job status check failed:', error);
      throw new Error('Failed to check job status');
    }
  }
  
  /**
   * Wait for job completion with polling
   */
  async waitForCompletion(
    jobId: string,
    options: {
      maxAttempts?: number;
      pollInterval?: number; // ms
      onProgress?: (attempt: number) => void;
    } = {}
  ): Promise<string> {
    const maxAttempts = options.maxAttempts || 60; // 5 minutes max
    const pollInterval = options.pollInterval || 5000; // 5 seconds
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const job = await this.getJobStatus(jobId);
      
      if (job.status === 'succeeded' && job.videoUrl) {
        return job.videoUrl;
      }
      
      if (job.status === 'failed') {
        throw new Error(`Video generation failed: ${job.error}`);
      }
      
      if (options.onProgress) {
        options.onProgress(attempt + 1);
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    
    throw new Error('Video generation timeout');
  }
  
  /**
   * Calculate cost based on duration and model
   */
  calculateCost(duration: number, model: string): number {
    const isMaster = model.includes('master');
    return duration === 5 
      ? (isMaster ? 1.20 : 0.21)
      : (isMaster ? 2.40 : 0.42);
  }
  
  private getModelName(model: string): string {
    return model === 'kling-2.1-master'
      ? 'kwaivgI/kling-2.1-master'
      : 'kwaivgI/kling-2.1-standard';
  }
  
  private buildVideoPrompt(params: VideoGenerationParams): string {
    let prompt = params.prompt;
    
    // Add character consistency hint
    prompt += ', maintain character identity and features';
    
    // Add camera movement hint
    if (params.cameraMovement) {
      const { type, speed = 'medium' } = params.cameraMovement;
      prompt += `, ${type} camera movement at ${speed} speed`;
    }
    
    // Add quality hints
    prompt += ', cinematic quality, smooth motion, high detail';
    
    return prompt;
  }
}

// Usage
const kling = new KlingClient({
  apiKey: process.env.TOGETHER_AI_API_KEY!,
  baseUrl: 'https://api.together.xyz'
});

// Start generation
const jobId = await kling.generateVideo({
  imageUrl: sceneImageUrl,
  prompt: 'Character walking forward in urban night scene',
  duration: 10,
  model: 'kling-2.1-standard',
  cameraMovement: {
    type: 'zoom_in',
    speed: 'slow'
  },
  motionStrength: 0.7
});

// Wait for completion
const videoUrl = await kling.waitForCompletion(jobId, {
  onProgress: (attempt) => {
    console.log(`Polling attempt ${attempt}...`);
  }
});
```

계속해서 TRD의 비디오 처리와 작업 큐 시스템을 상세히 작성하겠습니다.

***

## 7. 비디오 처리 시스템 (FFmpeg 통합)

### 7.1 FFmpeg 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                Video Processing Pipeline                │
│                                                         │
│  Individual Scene Videos (Kling Output)                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │
│  │Scene 1 │ │Scene 2 │ │Scene 3 │ │Scene N │         │
│  │ 10sec  │ │ 10sec  │ │ 15sec  │ │ 10sec  │         │
│  └────────┘ └────────┘ └────────┘ └────────┘         │
│       ↓          ↓          ↓          ↓              │
│  ┌─────────────────────────────────────────────┐      │
│  │       FFmpeg Processing Steps               │      │
│  │                                             │      │
│  │  1. Video Normalization                    │      │
│  │     - Consistent codec (H.264)             │      │
│  │     - Same resolution                      │      │
│  │     - Same FPS                             │      │
│  │     - Same pixel format                    │      │
│  │                                             │      │
│  │  2. Trim to Exact Duration                 │      │
│  │     - Match timestamp requirements         │      │
│  │                                             │      │
│  │  3. Apply Transitions                      │      │
│  │     - Crossfade (default)                  │      │
│  │     - Flash (strong beats)                 │      │
│  │     - Dissolve (weak beats)                │      │
│  │                                             │      │
│  │  4. Concatenate Scenes                     │      │
│  │     - Sequential ordering                  │      │
│  │     - Seamless transitions                 │      │
│  │                                             │      │
│  │  5. Audio Sync                             │      │
│  │     - Mix original music                   │      │
│  │     - Beat alignment                       │      │
│  │     - Volume normalization                 │      │
│  │                                             │      │
│  │  6. Final Encoding                         │      │
│  │     - Target resolution                    │      │
│  │     - Bitrate optimization                 │      │
│  │     - Codec settings                       │      │
│  └─────────────────────────────────────────────┘      │
│       ↓                                                │
│  ┌─────────────────────────────────────┐              │
│  │    Final Music Video Output         │              │
│  │    - Single MP4 file                │              │
│  │    - H.264 + AAC                    │              │
│  │    - Optimized for web              │              │
│  └─────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

### 7.2 FFmpeg Service Implementation

```typescript
// lib/video/ffmpegService.ts

import ffmpeg from 'fluent-ffmpeg';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import { path as ffprobePath } from '@ffprobe-installer/ffprobe';
import { createReadStream, createWriteStream } from 'fs';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

// Set FFmpeg paths
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

interface VideoClip {
  url: string;
  sceneNumber: number;
  timestamp: { start: number; end: number };
  duration: number;
}

interface TransitionConfig {
  type: 'crossfade' | 'flash' | 'dissolve' | 'none';
  duration: number; // seconds
}

interface AudioSyncConfig {
  audioUrl: string;
  beats?: number[]; // Beat timestamps for sync
  volume?: number; // 0-1
}

interface EncodingConfig {
  resolution: '480p' | '720p' | '1080p' | '4k';
  fps: 24 | 30 | 60;
  videoBitrate: string; // e.g., '5000k'
  audioBitrate: string; // e.g., '192k'
  preset: 'ultrafast' | 'fast' | 'medium' | 'slow' | 'veryslow';
  crf: number; // 18-28, lower = better quality
}

export class FFmpegService {
  private tempDir: string;
  
  constructor() {
    this.tempDir = join(tmpdir(), 'melodyvision');
  }
  
  /**
   * Main entry point: Assemble complete music video
   */
  async assembleMusicVideo(
    clips: VideoClip[],
    audio: AudioSyncConfig,
    transitions: Map<number, TransitionConfig>,
    encoding: EncodingConfig
  ): Promise<string> {
    try {
      // 1. Setup temp directory
      await this.setupTempDir();
      
      // 2. Download all video clips
      console.log('Downloading video clips...');
      const localClips = await this.downloadClips(clips);
      
      // 3. Normalize all clips (same codec, resolution, fps)
      console.log('Normalizing video clips...');
      const normalizedClips = await this.normalizeClips(localClips, encoding);
      
      // 4. Apply transitions and concatenate
      console.log('Applying transitions and concatenating...');
      const concatenatedVideo = await this.concatenateWithTransitions(
        normalizedClips,
        transitions
      );
      
      // 5. Sync with audio
      console.log('Syncing with audio...');
      const finalVideo = await this.syncAudio(
        concatenatedVideo,
        audio,
        encoding
      );
      
      // 6. Upload to storage
      console.log('Uploading final video...');
      const finalUrl = await this.uploadToStorage(finalVideo);
      
      // 7. Cleanup temp files
      await this.cleanup();
      
      return finalUrl;
      
    } catch (error) {
      console.error('Video assembly failed:', error);
      await this.cleanup();
      throw error;
    }
  }
  
  /**
   * Download video clips from URLs to local temp storage
   */
  private async downloadClips(clips: VideoClip[]): Promise<string[]> {
    const downloads = clips.map(async (clip, index) => {
      const localPath = join(this.tempDir, `clip_${index}.mp4`);
      
      const response = await fetch(clip.url);
      if (!response.ok) {
        throw new Error(`Failed to download clip ${clip.sceneNumber}`);
      }
      
      const buffer = await response.arrayBuffer();
      await fs.writeFile(localPath, Buffer.from(buffer));
      
      return localPath;
    });
    
    return Promise.all(downloads);
  }
  
  /**
   * Normalize all clips to same specs
   */
  private async normalizeClips(
    clips: string[],
    encoding: EncodingConfig
  ): Promise<string[]> {
    const resolution = this.getResolutionDimensions(encoding.resolution);
    
    const normalized = clips.map(async (clipPath, index) => {
      const outputPath = join(this.tempDir, `normalized_${index}.mp4`);
      
      await new Promise<void>((resolve, reject) => {
        ffmpeg(clipPath)
          .videoCodec('libx264')
          .audioCodec('aac')
          .size(resolution)
          .fps(encoding.fps)
          .outputOptions([
            '-pix_fmt yuv420p', // Compatibility
            '-preset ultrafast', // Speed for normalization
            '-crf 23' // Good quality
          ])
          .output(outputPath)
          .on('end', () => resolve())
          .on('error', (err) => reject(err))
          .run();
      });
      
      return outputPath;
    });
    
    return Promise.all(normalized);
  }
  
  /**
   * Concatenate clips with transitions
   */
  private async concatenateWithTransitions(
    clips: string[],
    transitions: Map<number, TransitionConfig>
  ): Promise<string> {
    const outputPath = join(this.tempDir, 'concatenated.mp4');
    
    // Build complex filter for transitions
    const filterComplex = this.buildTransitionFilter(clips, transitions);
    
    return new Promise((resolve, reject) => {
      const command = ffmpeg();
      
      // Add all input clips
      clips.forEach(clip => command.input(clip));
      
      // Apply complex filter
      command
        .complexFilter(filterComplex)
        .outputOptions([
          '-map [final]', // Map the final output from filter
          '-c:v libx264',
          '-preset medium',
          '-crf 23'
        ])
        .output(outputPath)
        .on('start', (cmd) => {
          console.log('FFmpeg command:', cmd);
        })
        .on('progress', (progress) => {
          console.log(`Processing: ${progress.percent?.toFixed(2)}% done`);
        })
        .on('end', () => {
          console.log('Concatenation complete');
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Concatenation error:', err);
          reject(err);
        })
        .run();
    });
  }
  
  /**
   * Build FFmpeg filter for transitions
   */
  private buildTransitionFilter(
    clips: string[],
    transitions: Map<number, TransitionConfig>
  ): string {
    const filters: string[] = [];
    let currentLabel = '[0:v]';
    
    for (let i = 0; i < clips.length - 1; i++) {
      const transition = transitions.get(i) || { 
        type: 'crossfade', 
        duration: 0.5 
      };
      
      const nextInput = `[${i + 1}:v]`;
      const outputLabel = i === clips.length - 2 ? '[final]' : `[v${i}]`;
      
      switch (transition.type) {
        case 'crossfade':
          filters.push(
            `${currentLabel}${nextInput}xfade=transition=fade:duration=${transition.duration}:offset=0${outputLabel}`
          );
          break;
          
        case 'flash':
          // White flash transition
          filters.push(
            `${currentLabel}${nextInput}xfade=transition=fadewhite:duration=${transition.duration}:offset=0${outputLabel}`
          );
          break;
          
        case 'dissolve':
          filters.push(
            `${currentLabel}${nextInput}xfade=transition=dissolve:duration=${transition.duration}:offset=0${outputLabel}`
          );
          break;
          
        case 'none':
          // Direct concat without transition
          filters.push(
            `${currentLabel}${nextInput}concat=n=2:v=1:a=0${outputLabel}`
          );
          break;
      }
      
      currentLabel = outputLabel;
    }
    
    return filters.join(';');
  }
  
  /**
   * Sync final video with audio
   */
  private async syncAudio(
    videoPath: string,
    audio: AudioSyncConfig,
    encoding: EncodingConfig
  ): Promise<string> {
    const outputPath = join(this.tempDir, 'final.mp4');
    
    // Download audio
    const audioPath = await this.downloadFile(audio.audioUrl, 'audio.mp3');
    
    return new Promise((resolve, reject) => {
      const command = ffmpeg()
        .input(videoPath)
        .input(audioPath);
      
      // If beats provided, apply beat sync (advanced)
      if (audio.beats && audio.beats.length > 0) {
        // TODO: Implement beat-precise sync
        // This requires analyzing video frame timestamps
        // and aligning scene transitions to beat timestamps
      }
      
      command
        .outputOptions([
          // Video settings
          `-c:v libx264`,
          `-preset ${encoding.preset}`,
          `-crf ${encoding.crf}`,
          `-b:v ${encoding.videoBitrate}`,
          
          // Audio settings
          `-c:a aac`,
          `-b:a ${encoding.audioBitrate}`,
          `-ar 48000`, // Sample rate
          
          // Audio volume
          `-filter:a volume=${audio.volume || 1.0}`,
          
          // Sync settings
          `-shortest`, // End when shortest stream ends
          `-vsync cfr`, // Constant frame rate
          
          // Metadata
          `-metadata title="MelodyVision Music Video"`,
          `-metadata artist="MelodyVision User"`,
          
          // Compatibility
          `-movflags +faststart`, // Web optimization
          `-pix_fmt yuv420p`
        ])
        .output(outputPath)
        .on('progress', (progress) => {
          console.log(`Audio sync: ${progress.percent?.toFixed(2)}% done`);
        })
        .on('end', () => {
          console.log('Audio sync complete');
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Audio sync error:', err);
          reject(err);
        })
        .run();
    });
  }
  
  /**
   * Beat-precise transition alignment
   */
  private async alignToBeat(
    videoPath: string,
    beats: number[],
    transitionPoints: number[]
  ): Promise<string> {
    // Get video frame timestamps
    const frameTimes = await this.getFrameTimestamps(videoPath);
    
    // For each transition point, find nearest beat
    const alignedTransitions = transitionPoints.map(point => {
      const nearestBeat = this.findNearestBeat(point, beats);
      const nearestFrame = this.findNearestFrame(nearestBeat, frameTimes);
      return nearestFrame;
    });
    
    // Rebuild video with aligned transitions
    // This would involve cutting and re-stitching at precise frames
    // TODO: Implement frame-precise cutting
    
    return videoPath;
  }
  
  /**
   * Get frame timestamps from video
   */
  private async getFrameTimestamps(videoPath: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const timestamps: number[] = [];
      
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) return reject(err);
        
        const fps = eval(metadata.streams[0].r_frame_rate); // e.g., "24/1" = 24
        const duration = metadata.format.duration!;
        const frameCount = Math.floor(duration * fps);
        
        for (let i = 0; i < frameCount; i++) {
          timestamps.push(i / fps);
        }
        
        resolve(timestamps);
      });
    });
  }
  
  /**
   * Find nearest beat to timestamp
   */
  private findNearestBeat(timestamp: number, beats: number[]): number {
    return beats.reduce((nearest, beat) => {
      return Math.abs(beat - timestamp) < Math.abs(nearest - timestamp)
        ? beat
        : nearest;
    });
  }
  
  /**
   * Find nearest frame to timestamp
   */
  private findNearestFrame(timestamp: number, frameTimes: number[]): number {
    return frameTimes.reduce((nearest, time) => {
      return Math.abs(time - timestamp) < Math.abs(nearest - timestamp)
        ? time
        : nearest;
    });
  }
  
  /**
   * Generate video thumbnail
   */
  async generateThumbnail(
    videoPath: string,
    timestamp: number = 1
  ): Promise<string> {
    const outputPath = join(this.tempDir, `thumbnail_${Date.now()}.jpg`);
    
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [timestamp],
          filename: 'thumbnail.jpg',
          folder: this.tempDir,
          size: '1280x720'
        })
        .on('end', () => resolve(outputPath))
        .on('error', (err) => reject(err));
    });
  }
  
  /**
   * Get video metadata
   */
  async getMetadata(videoPath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) return reject(err);
        resolve({
          duration: metadata.format.duration,
          size: metadata.format.size,
          bitrate: metadata.format.bit_rate,
          format: metadata.format.format_name,
          videoCodec: metadata.streams[0].codec_name,
          audioCodec: metadata.streams[1]?.codec_name,
          width: metadata.streams[0].width,
          height: metadata.streams[0].height,
          fps: eval(metadata.streams[0].r_frame_rate)
        });
      });
    });
  }
  
  /**
   * Utility: Get resolution dimensions
   */
  private getResolutionDimensions(resolution: string): string {
    const resolutions = {
      '480p': '854x480',
      '720p': '1280x720',
      '1080p': '1920x1080',
      '4k': '3840x2160'
    };
    return resolutions[resolution] || resolutions['1080p'];
  }
  
  /**
   * Utility: Setup temp directory
   */
  private async setupTempDir(): Promise<void> {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }
  
  /**
   * Utility: Download file
   */
  private async downloadFile(url: string, filename: string): Promise<string> {
    const localPath = join(this.tempDir, filename);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to download ${filename}`);
    }
    
    const buffer = await response.arrayBuffer();
    await fs.writeFile(localPath, Buffer.from(buffer));
    
    return localPath;
  }
  
  /**
   * Utility: Upload to Supabase/Cloudflare R2
   */
  private async uploadToStorage(filePath: string): Promise<string> {
    // Implementation depends on storage provider
    // For Cloudflare R2:
    const fileBuffer = await fs.readFile(filePath);
    const fileName = `videos/${Date.now()}_final.mp4`;
    
    // Upload to R2
    const uploadUrl = await uploadToR2(fileName, fileBuffer);
    
    return uploadUrl;
  }
  
  /**
   * Utility: Cleanup temp files
   */
  private async cleanup(): Promise<void> {
    try {
      const files = await fs.readdir(this.tempDir);
      await Promise.all(
        files.map(file => fs.unlink(join(this.tempDir, file)))
      );
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

// Helper function for R2 upload
async function uploadToR2(key: string, buffer: Buffer): Promise<string> {
  // Use AWS S3 SDK with R2 endpoint
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
  
  const s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
  });
  
  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: 'video/mp4'
  }));
  
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

// Usage Example
const ffmpegService = new FFmpegService();

const finalVideoUrl = await ffmpegService.assembleMusicVideo(
  videoClips, // Downloaded from Kling
  {
    audioUrl: project.audio_url,
    beats: audioAnalysis.beats,
    volume: 1.0
  },
  transitionMap, // Transition configs
  {
    resolution: '1080p',
    fps: 24,
    videoBitrate: '5000k',
    audioBitrate: '192k',
    preset: 'medium',
    crf: 23
  }
);
```

### 7.3 Advanced Video Processing Features

```typescript
// lib/video/advancedProcessing.ts

/**
 * Add text overlays (lyrics, credits)
 */
export async function addTextOverlay(
  videoPath: string,
  overlays: Array<{
    text: string;
    start: number;
    end: number;
    position: 'top' | 'center' | 'bottom';
    style: {
      fontSize: number;
      fontColor: string;
      backgroundColor?: string;
    };
  }>
): Promise<string> {
  const outputPath = join(tmpdir(), `overlay_${Date.now()}.mp4`);
  
  // Build drawtext filters
  const filters = overlays.map((overlay, index) => {
    const y = overlay.position === 'top' ? 100 
              : overlay.position === 'bottom' ? 'h-100'
              : 'h/2';
    
    return `drawtext=text='${overlay.text}':` +
           `fontsize=${overlay.style.fontSize}:` +
           `fontcolor=${overlay.style.fontColor}:` +
           `x=(w-text_w)/2:y=${y}:` +
           `enable='between(t,${overlay.start},${overlay.end})'`;
  }).join(',');
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilters(filters)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

/**
 * Apply color grading
 */
export async function applyColorGrade(
  videoPath: string,
  preset: 'warm' | 'cool' | 'vintage' | 'vibrant'
): Promise<string> {
  const outputPath = join(tmpdir(), `graded_${Date.now()}.mp4`);
  
  const colorFilters = {
    warm: 'eq=brightness=0.05:saturation=1.2,hue=h=10',
    cool: 'eq=brightness=-0.05:saturation=1.1,hue=h=-10',
    vintage: 'eq=contrast=0.9:saturation=0.8,curves=vintage',
    vibrant: 'eq=saturation=1.5:contrast=1.1'
  };
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilters(colorFilters[preset])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

/**
 * Add watermark
 */
export async function addWatermark(
  videoPath: string,
  watermarkPath: string,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  opacity: number = 0.5
): Promise<string> {
  const outputPath = join(tmpdir(), `watermarked_${Date.now()}.mp4`);
  
  const positions = {
    'top-left': 'overlay=10:10',
    'top-right': 'overlay=W-w-10:10',
    'bottom-left': 'overlay=10:H-h-10',
    'bottom-right': 'overlay=W-w-10:H-h-10'
  };
  
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .input(watermarkPath)
      .complexFilter([
        `[1:v]format=rgba,colorchannelmixer=aa=${opacity}[wm]`,
        `[0:v][wm]${positions[position]}`
      ])
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}
```

***

## 8. 작업 큐 시스템 (BullMQ)

### 8.1 BullMQ 아키텍처

```
┌────────────────────────────────────────────────────────┐
│                  Job Queue System                      │
│                                                        │
│  ┌──────────────┐      ┌──────────────┐              │
│  │   API Route  │──┬──▶│  Job Queue   │              │
│  │   Endpoint   │  │   │   (Redis)    │              │
│  └──────────────┘  │   └──────────────┘              │
│                    │          │                       │
│                    │          │                       │
│                    │          ▼                       │
│  ┌──────────────┐  │   ┌──────────────┐              │
│  │ Direct Sync  │  │   │   Workers    │              │
│  │ (Fast jobs)  │  │   │  (Async)     │              │
│  └──────────────┘  │   └──────────────┘              │
│         │          │          │                       │
│         │          │          │                       │
│         ▼          │          ▼                       │
│  ┌──────────────────────────────────┐                │
│  │     Job Types & Priorities       │                │
│  │                                  │                │
│  │  ┌────────────────────────┐     │                │
│  │  │ video-generation       │     │                │
│  │  │ Priority: High         │     │                │
│  │  │ Concurrency: 3         │     │                │
│  │  └────────────────────────┘     │                │
│  │                                  │                │
│  │  ┌────────────────────────┐     │                │
│  │  │ image-generation       │     │                │
│  │  │ Priority: Medium       │     │                │
│  │  │ Concurrency: 10        │     │                │
│  │  └────────────────────────┘     │                │
│  │                                  │                │
│  │  ┌────────────────────────┐     │                │
│  │  │ email-notification     │     │                │
│  │  │ Priority: Low          │     │                │
│  │  │ Concurrency: 5         │     │                │
│  │  └────────────────────────┘     │                │
│  └──────────────────────────────────┘                │
│                    │                                  │
│                    ▼                                  │
│  ┌────────────────────────────────────┐              │
│  │     Progress Tracking              │              │
│  │  - WebSocket updates               │              │
│  │  - Database status updates         │              │
│  │  - Error handling & retries        │              │
│  └────────────────────────────────────┘              │
└────────────────────────────────────────────────────────┘
```

### 8.2 Queue 설정 및 초기화

```typescript
// lib/queue/config.ts

import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

// Redis connection
const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required for BullMQ
  enableReadyCheck: false
});

// Queue options
const queueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential' as const,
      delay: 5000 // Start with 5 seconds
    },
    removeOnComplete: {
      age: 24 * 3600, // Keep completed jobs for 24 hours
      count: 1000 // Keep last 1000 completed jobs
    },
    removeOnFail: {
      age: 7 * 24 * 3600 // Keep failed jobs for 7 days
    }
  }
};

// Define job types
export enum JobType {
  VIDEO_GENERATION = 'video-generation',
  IMAGE_GENERATION = 'image-generation',
  SCENE_REGENERATION = 'scene-regeneration',
  EMAIL_NOTIFICATION = 'email-notification',
  ANALYTICS_PROCESSING = 'analytics-processing',
  CLEANUP = 'cleanup'
}

// Create queues
export const videoQueue = new Queue(JobType.VIDEO_GENERATION, queueOptions);
export const imageQueue = new Queue(JobType.IMAGE_GENERATION, queueOptions);
export const emailQueue = new Queue(JobType.EMAIL_NOTIFICATION, queueOptions);
export const analyticsQueue = new Queue(JobType.ANALYTICS_PROCESSING, queueOptions);

// Queue events for monitoring
export const videoQueueEvents = new QueueEvents(JobType.VIDEO_GENERATION, { connection });
export const imageQueueEvents = new QueueEvents(JobType.IMAGE_GENERATION, { connection });

// Listen to global events
videoQueueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`Video job ${jobId} completed:`, returnvalue);
});

videoQueueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`Video job ${jobId} failed:`, failedReason);
});

videoQueueEvents.on('progress', ({ jobId, data }) => {
  console.log(`Video job ${jobId} progress:`, data);
});
```

### 8.3 Job 정의 및 타입

```typescript
// lib/queue/jobs/types.ts

import { Job } from 'bullmq';

// Video Generation Job Data
export interface VideoGenerationJobData {
  jobId: string;
  projectId: string;
  userId: string;
  scenes: Array<{
    id: string;
    sceneNumber: number;
    imageUrl: string;
    videoConfig: {
      model: string;
      duration: number;
      prompt: string;
      cameraMovement?: any;
    };
  }>;
  audioUrl: string;
  audioAnalysis: {
    beats: number[];
    sections: any[];
  };
  config: {
    qualityTier: string;
    resolution: string;
    fps: number;
  };
  transitionConfig: Record<number, any>;
}

export interface VideoGenerationJobResult {
  finalVideoUrl: string;
  duration: number;
  resolution: string;
  fileSize: number;
  costs: {
    images: number;
    videos: number;
    processing: number;
    total: number;
  };
}

// Image Generation Job Data
export interface ImageGenerationJobData {
  sceneId: string;
  projectId: string;
  characterProfileId: string;
  prompt: string;
  config: {
    model: 'nano-banana' | 'qwen';
    resolution: string;
    style?: string;
  };
}

export interface ImageGenerationJobResult {
  imageUrl: string;
  generationTime: number;
  model: string;
  cost: number;
}

// Scene Regeneration Job Data
export interface SceneRegenerationJobData {
  sceneId: string;
  projectId: string;
  type: 'image' | 'video' | 'both';
  newConfig?: any;
}

// Email Notification Job Data
export interface EmailNotificationJobData {
  userId: string;
  type: 'video_complete' | 'video_failed' | 'payment_success' | 'welcome';
  data: Record<string, any>;
}
```

### 8.4 Video Generation Worker

```typescript
// lib/queue/workers/videoGenerationWorker.ts

import { Worker, Job } from 'bullmq';
import { VideoGenerationJobData, VideoGenerationJobResult } from '../jobs/types';
import { KlingClient } from '../../ai/klingClient';
import { FFmpegService } from '../../video/ffmpegService';
import { db } from '../../db';
import { videoJobs, projects } from '../../db/schema';
import { eq } from 'drizzle-orm';

const connection = new Redis(process.env.REDIS_URL!);

export const videoGenerationWorker = new Worker<
  VideoGenerationJobData,
  VideoGenerationJobResult
>(
  JobType.VIDEO_GENERATION,
  async (job: Job<VideoGenerationJobData>) => {
    const { jobId, projectId, userId, scenes, audioUrl, audioAnalysis, config, transitionConfig } = job.data;
    
    try {
      // Update job status to processing
      await db.update(videoJobs)
        .set({ 
          status: 'processing',
          started_at: new Date()
        })
        .where(eq(videoJobs.id, jobId));
      
      // Step 1: Generate videos for each scene
      console.log(`[${job.id}] Starting video generation for ${scenes.length} scenes`);
      
      const kling = new KlingClient({
        apiKey: process.env.TOGETHER_AI_API_KEY!,
        baseUrl: 'https://api.together.xyz'
      });
      
      const videoClips: any[] = [];
      
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        
        // Update progress
        await job.updateProgress({
          stage: 'video_generation',
          current: i + 1,
          total: scenes.length,
          message: `Generating video for scene ${scene.sceneNumber}`
        });
        
        // Generate video
        const klingJobId = await kling.generateVideo({
          imageUrl: scene.imageUrl,
          prompt: scene.videoConfig.prompt,
          duration: scene.videoConfig.duration,
          model: scene.videoConfig.model,
          cameraMovement: scene.videoConfig.cameraMovement
        });
        
        // Wait for completion
        const videoUrl = await kling.waitForCompletion(klingJobId, {
          onProgress: (attempt) => {
            console.log(`[${job.id}] Scene ${i + 1} - Poll attempt ${attempt}`);
          }
        });
        
        videoClips.push({
          url: videoUrl,
          sceneNumber: scene.sceneNumber,
          timestamp: { start: 0, end: scene.videoConfig.duration },
          duration: scene.videoConfig.duration
        });
        
        // Update scene record
        await db.update(scenes)
          .set({
            video_url: videoUrl,
            status: 'video_ready',
            video_generation_model: scene.videoConfig.model
          })
          .where(eq(scenes.id, scene.id));
      }
      
      // Step 2: Assemble final video with FFmpeg
      console.log(`[${job.id}] Assembling final video`);
      
      await job.updateProgress({
        stage: 'postprocessing',
        current: 0,
        total: 1,
        message: 'Assembling final video'
      });
      
      const ffmpeg = new FFmpegService();
      
      const finalVideoUrl = await ffmpeg.assembleMusicVideo(
        videoClips,
        {
          audioUrl,
          beats: audioAnalysis.beats,
          volume: 1.0
        },
        new Map(Object.entries(transitionConfig)),
        {
          resolution: config.resolution,
          fps: config.fps,
          videoBitrate: '5000k',
          audioBitrate: '192k',
          preset: 'medium',
          crf: 23
        }
      );
      
      // Step 3: Get final video metadata
      const metadata = await ffmpeg.getMetadata(finalVideoUrl);
      
      // Step 4: Calculate costs
      const costs = {
        images: scenes.length * 0.003, // Estimated
        videos: scenes.reduce((sum, s) => {
          const isMaster = s.videoConfig.model.includes('master');
          const cost = s.videoConfig.duration === 5 
            ? (isMaster ? 1.20 : 0.21)
            : (isMaster ? 2.40 : 0.42);
          return sum + cost;
        }, 0),
        processing: 0.05,
        total: 0
      };
      costs.total = costs.images + costs.videos + costs.processing;
      
      // Step 5: Update database
      await db.update(videoJobs)
        .set({
          status: 'complete',
          output_url: finalVideoUrl,
          output_metadata: metadata,
          costs: costs,
          completed_at: new Date()
        })
        .where(eq(videoJobs.id, jobId));
      
      await db.update(projects)
        .set({
          status: 'complete',
          final_video_url: finalVideoUrl,
          final_video_duration_seconds: metadata.duration,
          final_video_resolution: config.resolution,
          total_cost_usd: costs.total,
          completed_at: new Date()
        })
        .where(eq(projects.id, projectId));
      
      // Step 6: Send completion notification
      await emailQueue.add('video-complete-notification', {
        userId,
        type: 'video_complete',
        data: {
          projectId,
          videoUrl: finalVideoUrl
        }
      });
      
      console.log(`[${job.id}] Video generation completed successfully`);
      
      return {
        finalVideoUrl,
        duration: metadata.duration,
        resolution: config.resolution,
        fileSize: metadata.size,
        costs
      };
      
    } catch (error) {
      console.error(`[${job.id}] Video generation failed:`, error);
      
      // Update job status to failed
      await db.update(videoJobs)
        .set({
          status: 'failed',
          error_message: error.message,
          error_details: { stack: error.stack },
          failed_at: new Date()
        })
        .where(eq(videoJobs.id, jobId));
      
      await db.update(projects)
        .set({ status: 'failed' })
        .where(eq(projects.id, projectId));
      
      // Send failure notification
      await emailQueue.add('video-failed-notification', {
        userId,
        type: 'video_failed',
        data: {
          projectId,
          error: error.message
        }
      });
      
      throw error;
    }
  },
  {
    connection,
    concurrency: 3, // Process 3 video jobs simultaneously
    limiter: {
      max: 10, // Max 10 jobs
      duration: 60000 // per minute
    }
  }
);

// Worker event listeners
videoGenerationWorker.on('completed', (job) => {
  console.log(`✅ Video job ${job.id} completed`);
});

videoGenerationWorker.on('failed', (job, err) => {
  console.error(`❌ Video job ${job?.id} failed:`, err.message);
});

videoGenerationWorker.on('progress', (job, progress) => {
  console.log(`⏳ Video job ${job.id} progress:`, progress);
});
```

### 8.5 Image Generation Worker

```typescript
// lib/queue/workers/imageGenerationWorker.ts

import { Worker, Job } from 'bullmq';
import { ImageGenerationJobData, ImageGenerationJobResult } from '../jobs/types';
import { NanoBananaClient } from '../../ai/nanoBananaClient';
import { QwenClient } from '../../ai/qwenClient';
import { db } from '../../db';
import { scenes } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const imageGenerationWorker = new Worker<
  ImageGenerationJobData,
  ImageGenerationJobResult
>(
  JobType.IMAGE_GENERATION,
  async (job: Job<ImageGenerationJobData>) => {
    const { sceneId, projectId, characterProfileId, prompt, config } = job.data;
    
    try {
      console.log(`[${job.id}] Generating image for scene ${sceneId}`);
      
      // Get character profile
      const characterProfile = await db.query.characterProfiles.findFirst({
        where: eq(characterProfiles.id, characterProfileId)
      });
      
      if (!characterProfile) {
        throw new Error('Character profile not found');
      }
      
      const startTime = Date.now();
      let imageUrl: string;
      let cost: number;
      
      // Select model
      if (config.model === 'nano-banana') {
        const nanoBanana = new NanoBananaClient({
          apiKey: process.env.GOOGLE_AI_API_KEY!,
          model: 'gemini-2.5-flash'
        });
        
        imageUrl = await nanoBanana.generateImage({
          characterProfile: characterProfile.analysis_data,
          prompt,
          resolution: config.resolution,
          aspectRatio: '16:9',
          style: config.style
        });
        
        cost = 0.003; // Estimated cost
        
      } else if (config.model === 'qwen') {
        const qwen = new QwenClient({
          apiKey: process.env.TOGETHER_AI_API_KEY!,
          baseUrl: 'https://api.together.xyz'
        });
        
        // For Qwen, we might use it for editing rather than generation
        // If used for generation, implement accordingly
        throw new Error('Qwen used primarily for editing');
        
      } else {
        throw new Error(`Unknown model: ${config.model}`);
      }
      
      const generationTime = Date.now() - startTime;
      
      // Update scene record
      await db.update(scenes)
        .set({
          image_url: imageUrl,
          image_generation_model: config.model,
          image_generation_time_ms: generationTime,
          image_cost_usd: cost,
          status: 'image_ready',
          updated_at: new Date()
        })
        .where(eq(scenes.id, sceneId));
      
      console.log(`[${job.id}] Image generated successfully in ${generationTime}ms`);
      
      return {
        imageUrl,
        generationTime,
        model: config.model,
        cost
      };
      
    } catch (error) {
      console.error(`[${job.id}] Image generation failed:`, error);
      
      // Update scene status
      await db.update(scenes)
        .set({
          status: 'error',
          error_message: error.message
        })
        .where(eq(scenes.id, sceneId));
      
      throw error;
    }
  },
  {
    connection,
    concurrency: 10, // Process 10 image jobs simultaneously (faster than video)
    limiter: {
      max: 50,
      duration: 60000
    }
  }
);
```

### 8.6 Job 추가 및 관리 API

```typescript
// lib/queue/jobManager.ts

import { videoQueue, imageQueue, emailQueue } from './config';
import { 
  VideoGenerationJobData, 
  ImageGenerationJobData,
  EmailNotificationJobData 
} from './jobs/types';

export class JobManager {
  /**
   * Add video generation job
   */
  static async addVideoGenerationJob(
    data: VideoGenerationJobData,
    options?: {
      priority?: number;
      delay?: number;
    }
  ): Promise<string> {
    const job = await videoQueue.add(
      'generate-video',
      data,
      {
        priority: options?.priority || 0,
        delay: options?.delay || 0,
        jobId: data.jobId // Use our database job ID
      }
    );
    
    return job.id!;
  }
  
  /**
   * Add image generation job
   */
  static async addImageGenerationJob(
    data: ImageGenerationJobData
  ): Promise<string> {
    const job = await imageQueue.add(
      'generate-image',
      data,
      {
        priority: 1 // Higher priority than video
      }
    );
    
    return job.id!;
  }
  
  /**
   * Add batch image generation jobs
   */
  static async addBatchImageJobs(
    jobs: ImageGenerationJobData[]
  ): Promise<string[]> {
    const bulkJobs = jobs.map(data => ({
      name: 'generate-image',
      data,
      opts: { priority: 1 }
    }));
    
    const addedJobs = await imageQueue.addBulk(bulkJobs);
    return addedJobs.map(j => j.id!);
  }
  
  /**
   * Get job status
   */
  static async getJobStatus(jobId: string) {
    const job = await videoQueue.getJob(jobId);
    
    if (!job) {
      return null;
    }
    
    const state = await job.getState();
    const progress = job.progress;
    
    return {
      id: job.id,
      state,
      progress,
      data: job.data,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn
    };
  }
  
  /**
   * Cancel job
   */
  static async cancelJob(jobId: string): Promise<boolean> {
    const job = await videoQueue.getJob(jobId);
    
    if (!job) {
      return false;
    }
    
    await job.remove();
    return true;
  }
  
  /**
   * Retry failed job
   */
  static async retryJob(jobId: string): Promise<boolean> {
    const job = await videoQueue.getJob(jobId);
    
    if (!job) {
      return false;
    }
    
    await job.retry();
    return true;
  }
  
  /**
   * Get queue metrics
   */
  static async getQueueMetrics() {
    const [
      videoWaiting,
      videoActive,
      videoCompleted,
      videoFailed,
      imageWaiting,
      imageActive
    ] = await Promise.all([
      videoQueue.getWaitingCount(),
      videoQueue.getActiveCount(),
      videoQueue.getCompletedCount(),
      videoQueue.getFailedCount(),
      imageQueue.getWaitingCount(),
      imageQueue.getActiveCount()
    ]);
    
    return {
      video: {
        waiting: videoWaiting,
        active: videoActive,
        completed: videoCompleted,
        failed: videoFailed
      },
      image: {
        waiting: imageWaiting,
        active: imageActive
      }
    };
  }
}
```

### 8.7 WebSocket 실시간 업데이트

```typescript
// lib/websocket/progressUpdater.ts

import { Server } from 'socket.io';
import { videoQueueEvents } from '../queue/config';

export function setupProgressWebSocket(io: Server) {
  // Listen to job progress events
  videoQueueEvents.on('progress', async ({ jobId, data }) => {
    // Broadcast to all clients subscribed to this job
    io.to(`job:${jobId}`).emit('job_progress', {
      jobId,
      progress: data
    });
  });
  
  videoQueueEvents.on('completed', async ({ jobId, returnvalue }) => {
    io.to(`job:${jobId}`).emit('job_complete', {
      jobId,
      result: returnvalue
    });
  });
  
  videoQueueEvents.on('failed', async ({ jobId, failedReason }) => {
    io.to(`job:${jobId}`).emit('job_failed', {
      jobId,
      error: failedReason
    });
  });
  
  // Handle client connections
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // Subscribe to job updates
    socket.on('subscribe_job', (jobId: string) => {
      socket.join(`job:${jobId}`);
      console.log(`Client ${socket.id} subscribed to job ${jobId}`);
    });
    
    // Unsubscribe from job updates
    socket.on('unsubscribe_job', (jobId: string) => {
      socket.leave(`job:${jobId}`);
      console.log(`Client ${socket.id} unsubscribed from job ${jobId}`);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
```

계속해서 TRD의 보안 및 인증 섹션을 작성하겠습니다.

***

## 9. 보안 및 인증

### 9.1 보안 아키텍처 개요

```
┌─────────────────────────────────────────────────────────┐
│                  Security Layers                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Layer 1: Network Security                      │  │
│  │  - HTTPS/TLS 1.3                                │  │
│  │  - Cloudflare DDoS Protection                   │  │
│  │  - WAF (Web Application Firewall)               │  │
│  │  - Rate Limiting (IP-based)                     │  │
│  └─────────────────────────────────────────────────┘  │
│                      ↓                                  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Layer 2: Authentication & Authorization        │  │
│  │  - JWT Token (HttpOnly cookies)                 │  │
│  │  - OAuth 2.0 (Google, GitHub)                   │  │
│  │  - Session Management                           │  │
│  │  - RBAC (Role-Based Access Control)             │  │
│  └─────────────────────────────────────────────────┘  │
│                      ↓                                  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Layer 3: Application Security                  │  │
│  │  - Input Validation (Zod)                       │  │
│  │  - SQL Injection Prevention (ORM)               │  │
│  │  - XSS Protection                               │  │
│  │  - CSRF Protection                              │  │
│  └─────────────────────────────────────────────────┘  │
│                      ↓                                  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Layer 4: Data Security                         │  │
│  │  - Encryption at Rest (AES-256)                 │  │
│  │  - Encryption in Transit (TLS)                  │  │
│  │  - Database RLS (Row Level Security)            │  │
│  │  - PII Handling                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                      ↓                                  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Layer 5: Monitoring & Compliance               │  │
│  │  - Audit Logs                                   │  │
│  │  - Security Scanning (Snyk)                     │  │
│  │  - GDPR Compliance                              │  │
│  │  - SOC 2 準備                                   │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 9.2 인증 시스템 (NextAuth.js v5)

#### 인증 설정
```typescript
// lib/auth/config.ts

import NextAuth, { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { users, accounts, sessions, verificationTokens } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  
  // Session strategy
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  // Pages
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/onboarding'
  },
  
  // Providers
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    
    // Email/Password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // Validate input
          const validatedFields = loginSchema.safeParse(credentials);
          
          if (!validatedFields.success) {
            throw new Error('Invalid credentials');
          }
          
          const { email, password } = validatedFields.data;
          
          // Find user
          const user = await db.query.users.findFirst({
            where: eq(users.email, email)
          });
          
          if (!user || !user.password_hash) {
            throw new Error('Invalid credentials');
          }
          
          // Verify password
          const isValidPassword = await bcrypt.compare(
            password,
            user.password_hash
          );
          
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }
          
          // Check if email is verified
          if (!user.email_verified) {
            throw new Error('Please verify your email first');
          }
          
          // Update last login
          await db.update(users)
            .set({ last_login_at: new Date() })
            .where(eq(users.id, user.id));
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatar_url,
            role: user.role || 'user'
          };
          
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  
  // Callbacks
  callbacks: {
    // JWT callback - runs when token is created or updated
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.subscriptionPlan = user.subscription_plan || 'free';
      }
      
      // Update session trigger (from client)
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.image = session.image;
      }
      
      // Refresh subscription data periodically
      if (token.id) {
        const userData = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
          columns: {
            subscription_plan: true,
            subscription_status: true,
            role: true
          }
        });
        
        if (userData) {
          token.subscriptionPlan = userData.subscription_plan;
          token.subscriptionStatus = userData.subscription_status;
          token.role = userData.role;
        }
      }
      
      return token;
    },
    
    // Session callback - runs when session is checked
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.subscriptionPlan = token.subscriptionPlan as string;
        session.user.subscriptionStatus = token.subscriptionStatus as string;
      }
      
      return session;
    },
    
    // Sign in callback - control who can sign in
    async signIn({ user, account, profile, email, credentials }) {
      // OAuth sign in
      if (account?.provider !== 'credentials') {
        // Check if account exists
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email!)
        });
        
        // Auto-verify OAuth users
        if (existingUser && !existingUser.email_verified) {
          await db.update(users)
            .set({ 
              email_verified: true,
              email_verified_at: new Date()
            })
            .where(eq(users.id, existingUser.id));
        }
        
        return true;
      }
      
      // Credentials sign in (handled in authorize)
      return true;
    }
  },
  
  // Events
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`);
      
      // Log sign in event
      await logSecurityEvent({
        type: 'sign_in',
        userId: user.id,
        metadata: {
          provider: account?.provider,
          isNewUser
        }
      });
      
      // Send welcome email for new users
      if (isNewUser) {
        await emailQueue.add('welcome-email', {
          userId: user.id,
          type: 'welcome',
          data: { name: user.name, email: user.email }
        });
      }
    },
    
    async signOut({ token }) {
      console.log(`User signed out: ${token.email}`);
      
      await logSecurityEvent({
        type: 'sign_out',
        userId: token.id as string,
        metadata: {}
      });
    }
  },
  
  // Security
  secret: process.env.NEXTAUTH_SECRET!,
  
  // Debug (only in development)
  debug: process.env.NODE_ENV === 'development'
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
```

#### 회원가입 구현
```typescript
// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { generateVerificationToken, sendVerificationEmail } from '@/lib/auth/verification';

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedFields = signupSchema.safeParse(body);
    
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedFields.error.flatten() },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validatedFields.data;
    
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email)
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      password_hash: passwordHash,
      name,
      email_verified: false,
      subscription_plan: 'free',
      subscription_status: 'active',
      role: 'user'
    }).returning();
    
    // Generate verification token
    const verificationToken = await generateVerificationToken(newUser.id);
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    
    // Log security event
    await logSecurityEvent({
      type: 'user_signup',
      userId: newUser.id,
      metadata: { email, name }
    });
    
    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email to verify your account.',
        userId: newUser.id
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
```

#### 이메일 인증
```typescript
// lib/auth/verification.ts

import { db } from '@/lib/db';
import { verificationTokens, users } from '@/lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate verification token
 */
export async function generateVerificationToken(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  // Store token
  await db.insert(verificationTokens).values({
    identifier: userId,
    token,
    expires
  });
  
  return token;
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  
  await resend.emails.send({
    from: 'MelodyVision <noreply@melodyvision.ai>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to MelodyVision!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `
  });
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<boolean> {
  try {
    // Find valid token
    const tokenRecord = await db.query.verificationTokens.findFirst({
      where: and(
        eq(verificationTokens.token, token),
        gt(verificationTokens.expires, new Date())
      )
    });
    
    if (!tokenRecord) {
      return false;
    }
    
    // Update user
    await db.update(users)
      .set({
        email_verified: true,
        email_verified_at: new Date()
      })
      .where(eq(users.id, tokenRecord.identifier));
    
    // Delete used token
    await db.delete(verificationTokens)
      .where(eq(verificationTokens.token, token));
    
    return true;
    
  } catch (error) {
    console.error('Email verification error:', error);
    return false;
  }
}
```

### 9.3 권한 관리 (RBAC with CASL)

```typescript
// lib/auth/permissions.ts

import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

// Define action types
type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

// Define subject types
type Subjects = 
  | 'Project' 
  | 'Character' 
  | 'Scene' 
  | 'User' 
  | 'Subscription' 
  | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

// User roles
export enum Role {
  USER = 'user',
  PRO = 'pro',
  ADMIN = 'admin'
}

// Subscription plans
export enum Plan {
  FREE = 'free',
  INDIE = 'indie',
  PRO = 'pro',
  TEAM = 'team'
}

/**
 * Define abilities based on user role and subscription
 */
export function defineAbilitiesFor(user: {
  id: string;
  role: Role;
  subscriptionPlan: Plan;
}) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    Ability as AbilityClass<AppAbility>
  );
  
  // Base permissions for all authenticated users
  can('read', 'Project', { userId: user.id });
  can('create', 'Project');
  can('update', 'Project', { userId: user.id });
  can('delete', 'Project', { userId: user.id });
  
  can('read', 'Character', { userId: user.id });
  can('create', 'Character');
  can('update', 'Character', { userId: user.id });
  can('delete', 'Character', { userId: user.id });
  
  can('read', 'Scene', { project: { userId: user.id } });
  can('create', 'Scene', { project: { userId: user.id } });
  can('update', 'Scene', { project: { userId: user.id } });
  can('delete', 'Scene', { project: { userId: user.id } });
  
  // Plan-based restrictions
  if (user.subscriptionPlan === Plan.FREE) {
    // Free users have limits
    cannot('create', 'Project', { 
      condition: 'monthly_project_count >= 2' 
    });
    cannot('create', 'Character', { 
      condition: 'character_count >= 1' 
    });
  }
  
  if (user.subscriptionPlan === Plan.INDIE) {
    cannot('create', 'Character', { 
      condition: 'character_count >= 3' 
    });
  }
  
  if (user.subscriptionPlan === Plan.PRO) {
    cannot('create', 'Character', { 
      condition: 'character_count >= 10' 
    });
  }
  
  // Team plan has collaboration permissions
  if (user.subscriptionPlan === Plan.TEAM) {
    can('manage', 'Project', { 
      collaborators: { $in: [user.id] } 
    });
  }
  
  // Admin permissions
  if (user.role === Role.ADMIN) {
    can('manage', 'all');
  }
  
  return build();
}

/**
 * Authorization middleware
 */
export async function authorize(
  userId: string,
  action: Actions,
  subject: Subjects,
  resource?: any
): Promise<boolean> {
  // Get user with subscription info
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      role: true,
      subscription_plan: true
    }
  });
  
  if (!user) {
    return false;
  }
  
  const ability = defineAbilitiesFor({
    id: user.id,
    role: user.role as Role,
    subscriptionPlan: user.subscription_plan as Plan
  });
  
  return ability.can(action, subject, resource);
}
```

#### 권한 체크 미들웨어
```typescript
// lib/auth/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { authorize } from '@/lib/auth/permissions';

/**
 * Require authentication
 */
export async function requireAuth(request: NextRequest) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return session;
}

/**
 * Require specific permission
 */
export async function requirePermission(
  request: NextRequest,
  action: string,
  subject: string,
  resource?: any
) {
  const session = await requireAuth(request);
  
  if (session instanceof NextResponse) {
    return session; // Return error response
  }
  
  const hasPermission = await authorize(
    session.user.id,
    action as any,
    subject as any,
    resource
  );
  
  if (!hasPermission) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
  
  return session;
}

/**
 * Require specific subscription plan
 */
export async function requirePlan(
  request: NextRequest,
  minPlan: 'indie' | 'pro' | 'team'
) {
  const session = await requireAuth(request);
  
  if (session instanceof NextResponse) {
    return session;
  }
  
  const planHierarchy = {
    'free': 0,
    'indie': 1,
    'pro': 2,
    'team': 3
  };
  
  const userPlanLevel = planHierarchy[session.user.subscriptionPlan];
  const requiredPlanLevel = planHierarchy[minPlan];
  
  if (userPlanLevel < requiredPlanLevel) {
    return NextResponse.json(
      { 
        error: 'Upgrade required',
        message: `This feature requires ${minPlan} plan or higher`,
        currentPlan: session.user.subscriptionPlan,
        requiredPlan: minPlan
      },
      { status: 402 } // Payment Required
    );
  }
  
  return session;
}
```

### 9.4 API 보안

#### Rate Limiting
```typescript
// lib/security/rateLimit.ts

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// Different rate limits by plan
export const rateLimiters = {
  // Free users
  free: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 h'),
    analytics: true,
    prefix: 'ratelimit:free'
  }),
  
  // Indie users
  indie: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, '1 h'),
    analytics: true,
    prefix: 'ratelimit:indie'
  }),
  
  // Pro users
  pro: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5000, '1 h'),
    analytics: true,
    prefix: 'ratelimit:pro'
  }),
  
  // Specific endpoints
  videoGeneration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 d'), // 10 per day for free
    analytics: true,
    prefix: 'ratelimit:video'
  }),
  
  // Authentication endpoints
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 min
    analytics: true,
    prefix: 'ratelimit:auth'
  })
};

/**
 * Rate limit middleware
 */
export async function rateLimit(
  identifier: string,
  limiterType: keyof typeof rateLimiters = 'free'
) {
  const limiter = rateLimiters[limiterType];
  
  const { success, limit, reset, remaining } = await limiter.limit(identifier);
  
  return {
    success,
    limit,
    remaining,
    reset: new Date(reset)
  };
}

/**
 * Rate limit middleware for API routes
 */
export async function withRateLimit(
  request: NextRequest,
  session: any,
  limiterType?: keyof typeof rateLimiters
) {
  // Determine limiter based on user plan
  const plan = session?.user?.subscriptionPlan || 'free';
  const limiter = limiterType || plan;
  
  // Use user ID or IP as identifier
  const identifier = session?.user?.id || 
                     request.ip || 
                     request.headers.get('x-forwarded-for') || 
                     'anonymous';
  
  const result = await rateLimit(identifier, limiter);
  
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toISOString()
        }
      }
    );
  }
  
  return result;
}
```

#### Input Validation
```typescript
// lib/security/validation.ts

import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Common validation schemas
 */
export const schemas = {
  // Project
  createProject: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .max(255, 'Title must be less than 255 characters')
      .transform(val => DOMPurify.sanitize(val)),
    description: z.string()
      .max(1000, 'Description must be less than 1000 characters')
      .optional()
      .transform(val => val ? DOMPurify.sanitize(val) : undefined),
    character_profile_id: z.string().uuid('Invalid character ID'),
    template_id: z.string().optional()
  }),
  
  // Scene
  createScene: z.object({
    scene_number: z.number().int().positive(),
    timestamp_start: z.number().min(0),
    timestamp_end: z.number().positive(),
    description: z.string()
      .min(1, 'Description is required')
      .max(500, 'Description must be less than 500 characters')
      .transform(val => DOMPurify.sanitize(val)),
    config: z.object({
      background: z.string().optional(),
      time_of_day: z.string().optional(),
      weather: z.string().optional(),
      camera_angle: z.string().optional(),
      lighting: z.string().optional()
    }).optional()
  }).refine(
    data => data.timestamp_end > data.timestamp_start,
    { message: 'End time must be after start time' }
  ),
  
  // Character
  createCharacter: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters')
      .transform(val => DOMPurify.sanitize(val)),
    description: z.string()
      .max(500)
      .optional()
      .transform(val => val ? DOMPurify.sanitize(val) : undefined)
  }),
  
  // File upload
  fileUpload: z.object({
    filename: z.string()
      .regex(/^[a-zA-Z0-9_\-\.]+$/, 'Invalid filename'),
    size: z.number()
      .max(50 * 1024 * 1024, 'File size must be less than 50MB'),
    mimetype: z.enum([
      'audio/mpeg',
      'audio/wav',
      'audio/aac',
      'audio/flac',
      'image/jpeg',
      'image/png',
      'image/webp'
    ])
  })
};

/**
 * Validate request body
 */
export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: any }> {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: {
          message: 'Validation failed',
          details: error.flatten()
        }
      };
    }
    return { 
      success: false, 
      error: { message: 'Invalid request' }
    };
  }
}

/**
 * Sanitize HTML content
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target']
  });
}

/**
 * Sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255);
}
```

#### CSRF Protection
```typescript
// lib/security/csrf.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf-token';

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Set CSRF token in cookie
 */
export function setCsrfToken(response: NextResponse, token: string) {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  });
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get('X-CSRF-Token');
  
  if (!cookieToken || !headerToken) {
    return false;
  }
  
  return crypto.timingSafeEqual(
    Buffer.from(cookieToken),
    Buffer.from(headerToken)
  );
}

/**
 * CSRF middleware for state-changing operations
 */
export function withCsrfProtection(handler: Function) {
  return async (request: NextRequest) => {
    // Only check for state-changing methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      if (!verifyCsrfToken(request)) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        );
      }
    }
    
    return handler(request);
  };
}
```

### 9.5 데이터 보안

#### 암호화 유틸리티
```typescript
// lib/security/encryption.ts

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH;

/**
 * Derive encryption key from secret
 */
function deriveKey(secret: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(secret, salt, 100000, KEY_LENGTH, 'sha512');
}

/**
 * Encrypt sensitive data
 */
export function encrypt(plaintext: string): string {
  const secret = process.env.ENCRYPTION_SECRET!;
  
  // Generate salt and IV
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = deriveKey(secret, salt);
  
  // Encrypt
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);
  
  // Get auth tag
  const tag = cipher.getAuthTag();
  
  // Combine salt + iv + tag + encrypted
  const result = Buffer.concat([salt, iv, tag, encrypted]);
  
  return result.toString('base64');
}

/**
 * Decrypt sensitive data
 */
export function decrypt(ciphertext: string): string {
  const secret = process.env.ENCRYPTION_SECRET!;
  const buffer = Buffer.from(ciphertext, 'base64');
  
  // Extract components
  const salt = buffer.subarray(0, SALT_LENGTH);
  const iv = buffer.subarray(SALT_LENGTH, TAG_POSITION);
  const tag = buffer.subarray(TAG_POSITION, ENCRYPTED_POSITION);
  const encrypted = buffer.subarray(ENCRYPTED_POSITION);
  
  // Derive key
  const key = deriveKey(secret, salt);
  
  // Decrypt
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);
  
  return decrypted.toString('utf8');
}

/**
 * Hash password (use bcrypt instead for passwords)
 */
export function hash(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
}

/**
 * Generate secure random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
```

#### Row Level Security (RLS)
```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Character profiles
CREATE POLICY "Users can view own characters"
  ON character_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own characters"
  ON character_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own characters"
  ON character_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own characters"
  ON character_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Projects
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = ANY(collaborators));

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Scenes (through project ownership)
CREATE POLICY "Users can view scenes of own projects"
  ON scenes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = scenes.project_id
      AND (projects.user_id = auth.uid() OR auth.uid() = ANY(projects.collaborators))
    )
  );

CREATE POLICY "Users can manage scenes of own projects"
  ON scenes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = scenes.project_id
      AND projects.user_id = auth.uid()
    )
  );
```

### 9.6 감사 로깅 (Audit Logging)

```typescript
// lib/security/auditLog.ts

import { db } from '@/lib/db';
import { auditLogs } from '@/lib/db/schema';

export enum AuditEventType {
  // Authentication
  SIGN_IN = 'sign_in',
  SIGN_OUT = 'sign_out',
  SIGN_UP = 'sign_up',
  EMAIL_VERIFIED = 'email_verified',
  PASSWORD_CHANGED = 'password_changed',
  PASSWORD_RESET_REQUESTED = 'password_reset_requested',
  
  // Projects
  PROJECT_CREATED = 'project_created',
  PROJECT_UPDATED = 'project_updated',
  PROJECT_DELETED = 'project_deleted',
  VIDEO_GENERATED = 'video_generated',
  
  // Characters
  CHARACTER_CREATED = 'character_created',
  CHARACTER_UPDATED = 'character_updated',
  CHARACTER_DELETED = 'character_deleted',
  
  // Billing
  SUBSCRIPTION_CREATED = 'subscription_created',
  SUBSCRIPTION_UPDATED = 'subscription_updated',
  SUBSCRIPTION_CANCELED = 'subscription_canceled',
  PAYMENT_SUCCEEDED = 'payment_succeeded',
  PAYMENT_FAILED = 'payment_failed',
  
  // Security
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  PERMISSION_DENIED = 'permission_denied'
}

interface AuditLogData {
  type: AuditEventType;
  userId?: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log security/audit event
 */
export async function logSecurityEvent(data: AuditLogData): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      event_type: data.type,
      user_id: data.userId,
      resource_type: data.resourceType,
      resource_id: data.resourceId,
      metadata: data.metadata || {},
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      created_at: new Date()
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw - logging failures shouldn't break app flow
  }
}

/**
 * Get audit logs for a user
 */
export async function getUserAuditLogs(
  userId: string,
  options: {
    limit?: number;
    offset?: number;
    eventTypes?: AuditEventType[];
  } = {}
) {
  const { limit = 50, offset = 0, eventTypes } = options;
  
  let query = db.select()
    .from(auditLogs)
    .where(eq(auditLogs.user_id, userId))
    .orderBy(desc(auditLogs.created_at))
    .limit(limit)
    .offset(offset);
  
  if (eventTypes && eventTypes.length > 0) {
    query = query.where(
      inArray(auditLogs.event_type, eventTypes)
    );
  }
  
  return await query;
}

/**
 * Audit log middleware for API routes
 */
export function withAuditLog(eventType: AuditEventType) {
  return function (handler: Function) {
    return async (request: NextRequest, context: any) => {
      const session = await auth();
      
      // Execute handler
      const response = await handler(request, context);
      
      // Log event after successful execution
      if (response.ok || response.status === 201) {
        await logSecurityEvent({
          type: eventType,
          userId: session?.user?.id,
          ipAddress: request.ip || request.headers.get('x-forwarded-for') || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
          metadata: {
            method: request.method,
            url: request.url,
            status: response.status
          }
        });
      }
      
      return response;
    };
  };
}
```

#### Audit Logs 테이블 스키마
```sql
-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  resource_type VARCHAR(100),
  resource_id VARCHAR(255),
  metadata JSONB DEFAULT '{}'::JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for audit logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Partition by month for performance (Phase 2)
-- Similar to video_jobs partitioning
```

### 9.7 보안 체크리스트

```yaml
Network Security:
  ✅ HTTPS/TLS 1.3 enforced
  ✅ Cloudflare DDoS protection
  ✅ WAF enabled
  ✅ CORS properly configured
  ✅ Security headers set
  ✅ CSP (Content Security Policy)

Authentication:
  ✅ Strong password requirements
  ✅ Password hashing (bcrypt)
  ✅ Email verification
  ✅ JWT with HttpOnly cookies
  ✅ Session expiration
  ✅ OAuth 2.0 integration
  ✅ MFA (Phase 2)

Authorization:
  ✅ RBAC implemented
  ✅ Permission system (CASL)
  ✅ Resource-level access control
  ✅ Plan-based restrictions

API Security:
  ✅ Rate limiting
  ✅ Input validation (Zod)
  ✅ Output sanitization
  ✅ CSRF protection
  ✅ SQL injection prevention (ORM)
  ✅ XSS protection

Data Security:
  ✅ Encryption at rest (AES-256)
  ✅ Encryption in transit (TLS)
  ✅ Database RLS
  ✅ PII handling
  ✅ Secure file uploads
  ✅ Signed URLs for media

Monitoring:
  ✅ Audit logging
  ✅ Security event tracking
  ✅ Error monitoring (Sentry)
  ✅ Rate limit analytics
  ✅ Failed login attempts

Compliance:
  ✅ GDPR compliance
  ✅ Data deletion requests
  ✅ Privacy policy
  ✅ Terms of service
  ⏳ SOC 2 (Phase 3)
  ⏳ CCPA compliance (Phase 3)

Incident Response:
  ✅ Logging & alerting
  ✅ Backup & recovery
  ⏳ Incident response plan (Phase 2)
  ⏳ Security testing (Phase 2)
```

***