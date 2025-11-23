완벽합니다! AI 뮤직비디오 제작 서비스의 상세한 PRD(Product Requirements Document)를 작성해드리겠습니다.

***

# Product Requirements Document (PRD)

## AI 뮤직비디오 제작 플랫폼 "MelodyVision"

**버전:** 1.0  
**작성일:** 2025년 11월 23일  
**담당자:** Product Team  
**상태:** Draft for Review

***

## 1. Executive Summary

### 1.1 제품 개요

**MelodyVision**은 인디 뮤지션을 위한 AI 기반 뮤직비디오 자동 생성 플랫폼입니다. 노래는 완성했지만 뮤직비디오 제작 예산이 부족한 아티스트들이 저렴한 비용으로 전문가 수준의 뮤직비디오를 제작할 수 있도록 지원합니다.

### 1.2 핵심 가치 제안

- **예산 절감**: 전통적인 뮤직비디오 제작 비용($5,000-$50,000)의 1% 수준
- **시간 단축**: 제작 기간을 수주에서 수시간으로 단축
- **캐릭터 일관성**: AI를 활용하여 모든 씬에서 아티스트의 정체성 유지
- **인간 개입 최적화**: 핵심 지점에서만 개입하여 창의적 통제권 보장
- **접근성**: 기술 지식 없이도 직관적인 인터페이스로 제작 가능

### 1.3 타겟 시장

**Primary Target:**
- 독립 뮤지션, 인디 밴드
- SoundCloud, Bandcamp 아티스트
- YouTube 음악 크리에이터
- 신인 K-pop 아티스트

**Secondary Target:**
- 소규모 음반 레이블
- 음악 프로듀서
- 음악 교육 기관

**Market Size:**
- 글로벌 독립 음악 시장: $1.8B (2025년)
- 한국 인디 뮤지션: ~50,000명
- 연간 뮤직비디오 수요: 500,000+ (추정)

***

## 2. Product Goals & Success Metrics

### 2.1 비즈니스 목표

**Phase 1 (0-6개월): MVP 검증**
- 베타 사용자 500명 확보
- 월 200개 뮤직비디오 생성
- 유료 전환율 15%
- NPS 40+ 달성

**Phase 2 (6-12개월): 성장**
- MAU 5,000명
- 월 2,000개 뮤직비디오 생성
- MRR $50,000
- 브랜드 인지도 구축 (인디 음악 커뮤니티)

**Phase 3 (12-24개월): 스케일**
- MAU 50,000명
- 월 20,000개 뮤직비디오 생성
- MRR $500,000
- 글로벌 확장 (미국, 일본)

### 2.2 핵심 성과 지표 (KPIs)

**사용자 획득:**
- 신규 가입자 수 (주간/월간)
- 유입 채널별 전환율
- CAC (Customer Acquisition Cost)

**사용자 참여:**
- 프로젝트 생성 완료율
- 평균 프로젝트 편집 횟수
- 씬당 평균 재생성 횟수
- Time to first video (가입 → 첫 비디오 생성)

**수익:**
- 유료 전환율
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value)
- 구독 유지율 (Retention Rate)

**제품 품질:**
- 비디오 생성 성공률
- 평균 생성 시간
- 사용자 만족도 (NPS)
- 고객 지원 티켓 수

**기술 성능:**
- API 응답 시간
- 비디오 생성 실패율
- 서버 가동률 (Uptime)

***

## 3. User Personas

### 3.1 Primary Persona: "독립 뮤지션 지우"

**인구통계:**
- 나이: 27세
- 직업: 프리랜서 싱어송라이터
- 위치: 서울, 홍대 인근
- 소득: 월 200-300만원 (불규칙)

**목표:**
- SoundCloud, YouTube에서 팔로워 늘리기
- 음원 스트리밍 수익 증대
- 음악 페스티벌 공연 기회 확보
- 소규모 레이블과 계약

**고충점:**
- 뮤직비디오 제작 예산 없음 (300-500만원 이상)
- 전문 제작팀 섭외 어려움
- DIY 영상은 품질이 낮아 전문성 부족
- 편집 기술 부족

**사용 시나리오:**
1. 새 싱글 "Summer Night" 완성
2. MelodyVision에 가입 (무료 체험)
3. 노래 업로드, 본인 사진 3장 제공
4. AI 추천 컨셉 중 "Urban Night" 선택
5. 8개 씬 자동 생성 후 2-3개 씬만 수정
6. 3시간 내 뮤직비디오 완성
7. YouTube, Instagram에 업로드
8. 긍정적 반응 → 유료 구독 전환

**기대 가치:**
- 저렴한 비용 ($30-50)
- 빠른 제작 (당일 완성)
- 전문적인 퀄리티
- 본인의 얼굴/캐릭터가 계속 등장

### 3.2 Secondary Persona: "소규모 레이블 대표 민수"

**인구통계:**
- 나이: 35세
- 직업: 인디 레이블 대표
- 소속 아티스트: 5-7팀
- 위치: 서울 강남

**목표:**
- 소속 아티스트 프로모션 강화
- 제작 비용 절감
- 빠른 콘텐츠 출시
- 브랜드 이미지 통일

**고충점:**
- 아티스트별 뮤직비디오 제작 시 비용 부담
- 여러 팀 동시 관리 어려움
- 일정 지연 시 마케팅 계획 차질
- 품질 편차

**사용 시나리오:**
1. 5개 팀 신곡 동시 발매 계획
2. MelodyVision Pro 구독 (팀 플랜)
3. 팀별 캐릭터 프로필 생성
4. 템플릿으로 빠르게 제작
5. 레이블 브랜딩 일관성 유지
6. 비용 70% 절감

***

## 4. Core Features & Requirements

### 4.1 Feature Priority Matrix

| 우선순위 | 기능 | MVP | Phase 2 | Phase 3 |
|---------|------|-----|---------|---------|
| **P0** | 음악 업로드 | ✅ | | |
| **P0** | 캐릭터 생성 (사진 업로드) | ✅ | | |
| **P0** | 자동 씬 분할 (8-12개) | ✅ | | |
| **P0** | 이미지 생성 (Nano Banana) | ✅ | | |
| **P0** | 비디오 생성 (Kling Standard) | ✅ | | |
| **P0** | 최종 비디오 합성 (FFmpeg) | ✅ | | |
| **P0** | 기본 결제 시스템 | ✅ | | |
| **P1** | 씬 편집 (이미지 재생성) | ✅ | | |
| **P1** | 3개 기본 템플릿 | ✅ | | |
| **P1** | 프로젝트 저장/불러오기 | ✅ | | |
| **P1** | 진행 상태 모니터링 | ✅ | | |
| **P2** | AI 컨셉 추천 | | ✅ | |
| **P2** | Qwen 텍스트 편집 | | ✅ | |
| **P2** | 스마트 모델 선택 | | ✅ | |
| **P2** | 비트 싱크 | | ✅ | |
| **P2** | 10+ 추가 템플릿 | | ✅ | |
| **P3** | 립싱크 (Pika) | | | ✅ |
| **P3** | 가사 자막 자동 생성 | | | ✅ |
| **P3** | 협업 기능 | | | ✅ |
| **P3** | 템플릿 마켓플레이스 | | | ✅ |

### 4.2 상세 기능 명세

***

#### Feature 1: 음악 업로드 및 분석

**User Story:**
> "인디 뮤지션으로서, 내가 만든 노래를 업로드하면 자동으로 분석되어 뮤직비디오 구조가 제안되기를 원한다."

**Requirements:**

**FR-1.1 음악 파일 업로드**
- 지원 포맷: MP3, WAV, AAC, FLAC
- 최대 파일 크기: 50MB
- 최대 길이: 5분 (MVP), 10분 (Pro)
- 드래그 앤 드롭 지원
- 업로드 진행률 표시

**FR-1.2 자동 오디오 분석**
- 템포 (BPM) 추출
- 비트 타이밍 감지
- 음악 구조 분석 (인트로, 벌스, 코러스, 브릿지, 아웃트로)
- 에너지 레벨 분석 (섹션별)
- 감정 분석 (밝음/어두움, 차분함/격렬함)

**FR-1.3 분석 결과 표시**
- 웨이브폼 시각화
- 섹션 타임라인 표시
- 검출된 BPM 및 키 정보
- 사용자 수동 조정 가능

**Technical Specs:**
```typescript
interface AudioAnalysisResult {
  duration: number; // 초
  tempo: number; // BPM
  key: string; // C Major, A Minor 등
  timeSignature: string; // 4/4, 3/4 등
  energy: number; // 0-1
  valence: number; // 0-1 (밝기)
  sections: AudioSection[];
  beats: Beat[];
}

interface AudioSection {
  type: 'intro' | 'verse' | 'chorus' | 'bridge' | 'outro';
  start: number; // 초
  end: number; // 초
  energy: number;
  tempo: number;
}
```

**Acceptance Criteria:**
- [ ] 5MB MP3 파일이 3초 내 업로드 완료
- [ ] 3분 음악의 섹션 감지 정확도 85% 이상
- [ ] 모바일에서도 동일한 업로드 경험 제공
- [ ] 업로드 실패 시 명확한 에러 메시지 표시

**Dependencies:**
- Essentia.js (클라이언트 사이드 분석)
- Supabase Storage (파일 저장)

***

#### Feature 2: 캐릭터 프로필 생성

**User Story:**
> "아티스트로서, 내 얼굴이 모든 씬에서 일관되게 나오도록 캐릭터를 설정하고 싶다."

**Requirements:**

**FR-2.1 사진 업로드**
- 최소 1장, 권장 2-3장 (다양한 각도)
- 지원 포맷: JPG, PNG, WebP
- 최대 파일 크기: 10MB/장
- 자동 얼굴 감지 및 크롭
- 품질 체크 (해상도, 흐림, 조명)

**FR-2.2 캐릭터 특징 추출**
- 자동 얼굴 특징 분석 (Nano Banana 2)
- 핵심 특징 추출 (눈, 코, 입 형태, 얼굴형)
- 캐릭터 프로필 생성 및 저장
- 테스트 이미지 자동 생성 (3-5장, 다양한 각도/표정)

**FR-2.3 캐릭터 확인 및 조정**
- 테스트 이미지 미리보기
- 만족/재생성 옵션
- 특징 강조/약화 슬라이더 (옵션)
- 승인 후 프로필 저장

**FR-2.4 대체 캐릭터 옵션**
- "본인 얼굴 대신 AI 캐릭터 생성" 옵션
- 스타일 선택: 리얼리스틱, 애니메이션, 일러스트
- 성별, 나이대, 외형 설정

**Technical Specs:**
```typescript
interface CharacterProfile {
  id: string;
  userId: string;
  name: string;
  referenceImages: string[]; // Storage URLs
  analysisData: {
    faceEmbedding: number[]; // 512-dim vector
    keyFeatures: string[]; // ["sharp brown eyes", "short black hair"]
    stylePreference: 'realistic' | 'anime' | 'illustration';
  };
  testImages: string[]; // 생성된 테스트 이미지 URLs
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}
```

**Acceptance Criteria:**
- [ ] 3장 사진 업로드 후 30초 내 캐릭터 프로필 생성
- [ ] 테스트 이미지의 얼굴 유사도 85% 이상
- [ ] 모바일에서도 사진 업로드 가능 (카메라 직접 촬영 포함)
- [ ] 저품질 사진 업로드 시 경고 메시지 표시

**Dependencies:**
- Nano Banana 2 API
- Face recognition library (face-api.js)

***

#### Feature 3: 스토리보드 씬 생성

**User Story:**
> "뮤지션으로서, 내 음악에 맞는 씬들이 자동으로 생성되고, 마음에 안 드는 씬만 수정할 수 있기를 원한다."

**Requirements:**

**FR-3.1 자동 씬 분할**
- 음악 구조 기반 8-12개 씬 생성
- 각 씬에 타임스탬프 자동 할당
- 섹션 타입에 따른 기본 설명 생성
- 사용자 씬 추가/삭제/순서 변경 가능

**FR-3.2 씬 이미지 자동 생성**
- Nano Banana 2로 각 씬 이미지 생성
- 캐릭터 프로필 자동 적용
- 생성 시간: 씬당 1-2초
- 배치 생성 지원 (8개 씬 동시 처리)

**FR-3.3 씬 편집 인터페이스**
```
[씬 카드 레이아웃]
┌─────────────────────────────────┐
│ 씬 1: 인트로 (0:00-0:15)         │
│ ┌───────────────────────────┐   │
│ │   [이미지 썸네일]           │   │
│ └───────────────────────────┘   │
│ 설명: "가수가 도시 거리를 걷는..."│
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ 재생성 │ │ 편집 │ │ 삭제 │        │
│ └─────┘ └─────┘ └─────┘        │
└─────────────────────────────────┘
```

**FR-3.4 씬 설명 편집**
- 텍스트 프롬프트 직접 수정
- 사전 정의된 옵션 선택:
  - 배경: 도시/자연/실내/추상
  - 시간: 낮/밤/황혼/새벽
  - 날씨: 맑음/비/눈/안개
  - 카메라: 클로즈업/와이드/버드아이/로우앵글
  - 조명: 자연광/네온/촛불/극적
- 변경 후 즉시 재생성

**FR-3.5 템플릿 시스템**
- 3개 기본 템플릿 (MVP):
  1. "Urban Night" - 도시 밤 분위기
  2. "Nature Journey" - 자연 속 여행
  3. "Studio Performance" - 스튜디오 퍼포먼스
- 템플릿 선택 시 모든 씬 설정 자동 적용
- 개별 씬은 이후 수정 가능

**Technical Specs:**
```typescript
interface Scene {
  id: string;
  sceneNumber: number;
  projectId: string;
  
  // 타이밍
  timestamp: {
    start: number;
    end: number;
  };
  
  // 콘텐츠
  description: string;
  imageUrl?: string; // 생성된 이미지
  videoUrl?: string; // 생성된 비디오
  
  // 설정
  config: {
    background: string;
    timeOfDay: string;
    weather: string;
    cameraAngle: string;
    lighting: string;
    customPrompt?: string;
  };
  
  // 상태
  status: 'pending' | 'generating' | 'complete' | 'error';
  generationAttempts: number;
  
  // 메타데이터
  createdAt: Date;
  updatedAt: Date;
}
```

**Acceptance Criteria:**
- [ ] 3분 음악에서 8-10개 씬 자동 생성
- [ ] 전체 씬 이미지 생성 시간 15초 이내
- [ ] 씬 재생성 시 2초 내 새 이미지 표시
- [ ] 템플릿 적용 시 모든 씬 일관된 스타일 유지
- [ ] 모바일에서도 씬 편집 가능

**Dependencies:**
- Nano Banana 2 API
- Qwen Image Edit API (Phase 2)

***

#### Feature 4: 비디오 생성

**User Story:**
> "아티스트로서, 확정한 씬 이미지들이 자동으로 비디오로 변환되어 음악과 싱크되기를 원한다."

**Requirements:**

**FR-4.1 비디오 생성 설정**
- 품질 티어 선택:
  - Standard: Kling 2.1 Standard (720p)
  - Pro: 스마트 하이브리드 (Standard + Master for key scenes)
  - Premium: Kling Master + Runway (1080p)
- 예상 비용 실시간 계산
- 생성 시작 전 최종 확인

**FR-4.2 스마트 모델 선택 (Phase 2)**
- 키 씬 자동 감지 (코러스, 클라이맥스)
- 씬 특성 분석:
  - 카메라 움직임 필요 여부
  - 동작 복잡도
  - 감정적 임팩트
- 예산 고려 최적 모델 자동 할당

**FR-4.3 비디오 생성 프로세스**
```
씬 1 이미지 → Kling API → 비디오 생성 (10초)
  ↓ (병렬)
씬 2 이미지 → Kling API → 비디오 생성 (10초)
  ↓ (병렬)
...
  ↓
모든 비디오 클립 완성
  ↓
FFmpeg 합성 (음악 싱크, 트랜지션)
  ↓
최종 뮤직비디오 출력
```

**FR-4.4 진행 상태 모니터링**
```
[비디오 생성 대시보드]
┌────────────────────────────────────┐
│ 🎬 뮤직비디오 생성 중...             │
│                                    │
│ ━━━━━━━━━━━━━━━━ 62%              │
│                                    │
│ 단계: 비디오 변환                   │
│ 씬 5/8 처리 중...                  │
│ 예상 남은 시간: 3분 20초            │
│                                    │
│ [완료된 씬들 썸네일 미리보기]       │
│ [씬1] [씬2] [씬3] [씬4] [...]      │
│                                    │
│ 현재까지 비용: $5.32               │
└────────────────────────────────────┘
```

**FR-4.5 비디오 후처리**
- 음악과 자동 싱크
- 비트 동기화 (Phase 2)
- 씬 전환 트랜지션:
  - 크로스페이드 (기본)
  - 플래시 (강한 비트)
  - 디졸브 (약한 비트)
- 최종 인코딩 (H.264, AAC)

**Technical Specs:**
```typescript
interface VideoGenerationJob {
  id: string;
  projectId: string;
  status: 'queued' | 'processing' | 'complete' | 'failed';
  
  // 설정
  config: {
    qualityTier: 'standard' | 'pro' | 'premium';
    resolution: '720p' | '1080p' | '4k';
    fps: 24 | 30;
    duration: number;
  };
  
  // 진행 상태
  progress: {
    currentStage: 'image' | 'video' | 'postprocessing';
    completedScenes: number;
    totalScenes: number;
    estimatedTimeRemaining: number; // 초
  };
  
  // 비용
  costs: {
    images: number;
    videos: number;
    total: number;
  };
  
  // 결과
  outputUrl?: string;
  errorMessage?: string;
  
  // 메타데이터
  createdAt: Date;
  completedAt?: Date;
}
```

**Acceptance Criteria:**
- [ ] 8개 씬 비디오 생성 시간 5-10분 이내
- [ ] 생성 성공률 95% 이상
- [ ] 진행 상태 실시간 업데이트 (5초마다)
- [ ] 생성 실패 시 자동 재시도 (최대 3회)
- [ ] 최종 비디오 음악과 프레임 단위 동기화

**Dependencies:**
- Kling 2.1 API (Together AI)
- FFmpeg (서버 사이드)
- BullMQ (작업 큐 관리)

***

#### Feature 5: 결제 및 구독 관리

**User Story:**
> "사용자로서, 투명한 가격 정책과 유연한 결제 옵션으로 서비스를 이용하고 싶다."

**Requirements:**

**FR-5.1 가격 티어**

| 티어 | 가격 | 포함 내용 |
|-----|------|----------|
| **무료 체험** | $0 | - 30초 비디오 1개<br>- Kling Standard only<br>- 워터마크 포함<br>- 720p 출력 |
| **인디 뮤지션** | $29/월 | - 3분 비디오 무제한<br>- 스마트 하이브리드<br>- 워터마크 없음<br>- 1080p 출력<br>- 5개 프로젝트 동시 작업<br>- 3개 캐릭터 프로필 |
| **프로 아티스트** | $99/월 | - 5분 비디오 무제한<br>- 모든 모델 접근<br>- 4K 출력<br>- 무제한 프로젝트<br>- 10개 캐릭터 프로필<br>- 우선 렌더링<br>- 고급 편집 기능 |
| **레이블/팀** | $299/월 | - 무제한 비디오<br>- 최고 품질<br>- 5명 팀원 계정<br>- 브랜드 커스터마이징<br>- 전담 지원<br>- API 접근 |

**FR-5.2 종량제 옵션**
- 구독 없이 단건 구매 가능
- 크레딧 시스템:
  - 100 크레딧 = $10
  - 3분 비디오 Standard = 30 크레딧
  - 3분 비디오 Pro = 100 크레딧
  - 크레딧 유효기간: 6개월

**FR-5.3 결제 통합**
- Stripe 연동
- 지원 결제 수단:
  - 신용/체크카드
  - PayPal
  - Kakao Pay, Toss Pay (한국)
- 자동 갱신 (구독)
- 영수증 자동 발행

**FR-5.4 구독 관리**
- 플랜 업그레이드/다운그레이드
- 언제든 취소 가능
- 환불 정책: 7일 내 100% 환불
- 사용량 대시보드 (남은 크레딧, 생성 비디오 수)

**Technical Specs:**
```typescript
interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'indie' | 'pro' | 'team';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  
  // Stripe 연동
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  
  // 사용량
  usage: {
    videosCreated: number;
    creditsUsed: number;
    creditsRemaining: number;
  };
  
  // 기간
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  
  // 메타데이터
  createdAt: Date;
  updatedAt: Date;
}
```

**Acceptance Criteria:**
- [ ] 결제 완료 후 3초 내 플랜 활성화
- [ ] 구독 취소 즉시 반영 (다음 빌링 사이클까지 사용 가능)
- [ ] 사용량 실시간 추적 및 표시
- [ ] 크레딧 부족 시 자동 알림 및 충전 안내

***

### 4.3 비기능 요구사항 (Non-Functional Requirements)

#### NFR-1: 성능

**응답 시간:**
- 페이지 로드: < 2초 (FCP)
- 음악 업로드: < 5초 (5MB 파일)
- 씬 이미지 생성: < 3초/씬
- 비디오 생성 완료: < 10분 (8씬 프로젝트)

**동시 사용자:**
- MVP: 100 동시 사용자 지원
- Phase 2: 1,000 동시 사용자
- Phase 3: 10,000 동시 사용자

**처리량:**
- 시간당 50개 뮤직비디오 생성 (MVP)
- 시간당 500개 (Phase 2)

#### NFR-2: 확장성

- 마이크로서비스 아키텍처 (향후 확장 대비)
- 수평 확장 가능한 작업 큐 (BullMQ + Redis)
- CDN 활용 (정적 자산, 생성된 비디오)
- 데이터베이스 파티셔닝 준비

#### NFR-3: 가용성

- 서비스 가동률: 99.5% (MVP), 99.9% (Phase 2)
- 자동 헬스 체크 및 재시작
- 에러 모니터링 (Sentry)
- 정기 백업 (일 1회)

#### NFR-4: 보안

- HTTPS 전체 적용
- API 인증: JWT 토큰
- 사용자 데이터 암호화 (at rest)
- Rate limiting (API 남용 방지)
- CSRF, XSS 방어
- 개인정보 처리 방침 (GDPR, CCPA 준수)

#### NFR-5: 사용성

- 모바일 반응형 디자인
- 다국어 지원: 한국어, 영어 (MVP)
- 접근성: WCAG 2.1 AA 수준
- 온보딩 튜토리얼 (첫 사용자)
- 도움말 및 FAQ

#### NFR-6: 유지보수성

- 코드 커버리지: 80% 이상
- 자동화된 E2E 테스트
- CI/CD 파이프라인 (GitHub Actions)
- 명확한 에러 로깅
- API 문서화 (Swagger)

***

## 5. Technical Architecture

### 5.1 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Web App    │  │  Mobile Web  │  │  Admin Panel │     │
│  │  (Next.js)   │  │  (Responsive)│  │   (Next.js)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js API Routes + Edge Functions          │  │
│  │   (Authentication, Rate Limiting, Routing)           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   User      │  │   Project   │  │   Video     │        │
│  │   Service   │  │   Service   │  │   Service   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Payment   │  │   AI Image  │  │   AI Video  │        │
│  │   Service   │  │   Service   │  │   Service   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data & Storage Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  Supabase    │  │  Redis       │     │
│  │  (Database)  │  │  Storage     │  │  (Cache/Queue)│    │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    External Services Layer                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Nano Banana  │  │ Qwen Image   │  │ Kling Video  │     │
│  │  (Google)    │  │  (Together)  │  │  (Together)  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Stripe    │  │   Cloudflare │  │    Sentry    │     │
│  │  (Payment)   │  │  (CDN/R2)    │  │  (Monitoring)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 데이터베이스 스키마

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active',
  stripe_customer_id VARCHAR(255),
  credits_remaining INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Character Profiles
CREATE TABLE character_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  reference_images TEXT[], -- Array of Storage URLs
  analysis_data JSONB, -- Face embedding, key features
  test_images TEXT[], -- Generated test images
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  character_profile_id UUID REFERENCES character_profiles(id),
  title VARCHAR(255) NOT NULL,
  audio_url TEXT NOT NULL,
  audio_analysis JSONB, -- Tempo, beats, sections
  template_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft', -- draft, generating, complete, failed
  final_video_url TEXT,
  total_cost DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Scenes
CREATE TABLE scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  scene_number INTEGER NOT NULL,
  timestamp_start DECIMAL(10, 2) NOT NULL,
  timestamp_end DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  config JSONB, -- Background, timeOfDay, camera, etc.
  image_url TEXT,
  video_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  generation_attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Video Generation Jobs
CREATE TABLE video_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'queued',
  config JSONB, -- Quality tier, resolution, etc.
  progress JSONB, -- Current stage, completed scenes, etc.
  costs JSONB, -- Images, videos, total
  output_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  usage JSONB, -- Videos created, credits used, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_scenes_project_id ON scenes(project_id);
CREATE INDEX idx_video_jobs_project_id ON video_jobs(project_id);
CREATE INDEX idx_character_profiles_user_id ON character_profiles(user_id);
```

### 5.3 API 엔드포인트 (RESTful)

```
Authentication:
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

Users:
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/projects
GET    /api/users/:id/subscription

Character Profiles:
GET    /api/characters
POST   /api/characters
GET    /api/characters/:id
PATCH  /api/characters/:id
DELETE /api/characters/:id
POST   /api/characters/:id/test-images

Projects:
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
POST   /api/projects/:id/audio/analyze
POST   /api/projects/:id/generate-video

Scenes:
GET    /api/projects/:projectId/scenes
POST   /api/projects/:projectId/scenes
GET    /api/scenes/:id
PATCH  /api/scenes/:id
DELETE /api/scenes/:id
POST   /api/scenes/:id/regenerate

Video Generation:
POST   /api/video/generate
GET    /api/video/jobs/:jobId
GET    /api/video/jobs/:jobId/progress
POST   /api/video/jobs/:jobId/cancel

Payments:
GET    /api/billing/plans
POST   /api/billing/subscribe
POST   /api/billing/cancel
POST   /api/billing/upgrade
POST   /api/billing/credits/purchase
GET    /api/billing/invoices

Templates:
GET    /api/templates
GET    /api/templates/:id
```

***

## 6. User Experience & Design

### 6.1 핵심 사용자 플로우

#### 플로우 1: 첫 뮤직비디오 생성 (해피 패스)

```
1. 랜딩 페이지 도착
   ↓
2. "무료로 시작하기" 클릭
   ↓
3. 이메일 가입 (소셜 로그인 옵션)
   ↓
4. 온보딩 튜토리얼 (30초)
   - "3단계로 뮤직비디오 만들기"
   - "음악 업로드 → 캐릭터 설정 → 자동 생성"
   ↓
5. 프로젝트 생성 화면
   ↓
6. 음악 파일 업로드
   - 드래그 앤 드롭
   - 자동 분석 (로딩 15초)
   - 웨이브폼 및 섹션 표시
   ↓
7. 캐릭터 설정
   - 사진 2-3장 업로드
   - 자동 프로필 생성 (30초)
   - 테스트 이미지 확인 및 승인
   ↓
8. 템플릿 선택 (또는 커스텀)
   - "Urban Night" 선택
   ↓
9. 씬 자동 생성
   - 8개 씬 이미지 자동 생성 (20초)
   - 타임라인에 배치된 씬 미리보기
   ↓
10. 씬 리뷰 및 편집 (옵션)
    - 씬 2 재생성 (2초)
    - 씬 5 설명 수정 후 재생성 (2초)
    - 나머지 씬 만족
    ↓
11. "비디오 생성" 클릭
    - 예상 비용 확인: $3.36
    - 무료 크레딧으로 커버
    ↓
12. 생성 진행 모니터링
    - 진행률 표시
    - 예상 시간: 5분
    - 완료된 씬 실시간 프리뷰
    ↓
13. 생성 완료!
    - 최종 비디오 플레이어
    - 다운로드 버튼
    - YouTube/Instagram 공유 버튼
    ↓
14. 만족도 피드백
    - "이 비디오가 마음에 드시나요?"
    - NPS 질문
    ↓
15. 유료 플랜 안내
    - "더 긴 비디오, 더 높은 품질 원하세요?"
    - 인디 뮤지션 플랜 $29/월
```

#### 플로우 2: 씬 편집 및 재생성

```
사용자가 씬 3에 불만족
   ↓
씬 3 카드에서 "편집" 클릭
   ↓
편집 모달 오픈
   ┌─────────────────────────────┐
   │ 씬 3 편집                    │
   │                             │
   │ [현재 이미지 썸네일]         │
   │                             │
   │ 설명:                       │
   │ [텍스트 입력]               │
   │                             │
   │ 빠른 옵션:                  │
   │ 배경: [도시▼] [자연] [실내] │
   │ 시간: [낮] [밤▼] [황혼]     │
   │ 카메라: [와이드▼] [클로즈업] │
   │                             │
   │ [취소] [재생성]             │
   └─────────────────────────────┘
   ↓
"재생성" 클릭
   ↓
로딩 (2초)
   ↓
새 이미지 표시
   ↓
만족 시 "저장"
   ↓
씬 3 업데이트 완료
```

### 6.2 화면 설계 (주요 페이지)

#### 6.2.1 대시보드

```
┌────────────────────────────────────────────────────────────┐
│ MelodyVision                    [검색]    [알림] [프로필]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  👋 안녕하세요, 지우님!                                     │
│  오늘도 멋진 뮤직비디오를 만들어보세요.                     │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  🎵 새 프로젝트 시작하기                             │ │
│  │  음악을 업로드하고 AI로 뮤직비디오를 만들어보세요     │ │
│  │                                                      │ │
│  │  [+ 새 프로젝트 만들기]                              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  내 프로젝트                                    [모두 보기]│
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │[썸네일]     │  │[썸네일]     │  │[썸네일]     │       │
│  │Summer Night │  │Autumn Dream │  │[진행중]     │       │
│  │완성 • 2분   │  │완성 • 3분   │  │작업 중...   │       │
│  │2일 전       │  │1주 전       │  │방금         │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                            │
│  캐릭터 프로필                                  [모두 보기]│
│                                                            │
│  ┌─────────────┐  ┌─────────────┐                        │
│  │[얼굴 사진]  │  │[+]          │                        │
│  │지우         │  │새 캐릭터    │                        │
│  │프로필 1     │  │만들기       │                        │
│  └─────────────┘  └─────────────┘                        │
│                                                            │
│  사용량 (인디 뮤지션 플랜)                                 │
│  ━━━━━━━━━━━━━━━━━━━━ 60%                                │
│  이번 달 3 / 무제한 비디오 생성                           │
│  다음 갱신: 2025-12-23                                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

#### 6.2.2 프로젝트 생성 - 음악 업로드

```
┌────────────────────────────────────────────────────────────┐
│ ← 대시보드          새 프로젝트                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  1️⃣ 음악 업로드  →  2️⃣ 캐릭터  →  3️⃣ 씬 생성  →  4️⃣ 완성│
│  ━━━━━━━━━━━                                              │
│                                                            │
│  🎵 음악 파일 업로드                                       │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │              🎼                                      │ │
│  │                                                      │ │
│  │     파일을 드래그하거나 클릭하여 업로드하세요         │ │
│  │                                                      │ │
│  │     지원 포맷: MP3, WAV, AAC, FLAC                   │ │
│  │     최대 크기: 50MB                                  │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│                                     [다음 단계로 →]        │
│                                                            │
└────────────────────────────────────────────────────────────┘

(업로드 후)

┌────────────────────────────────────────────────────────────┐
│  ✅ 업로드 완료!                                            │
│                                                            │
│  Summer_Night_Final.mp3                                    │
│  [웨이브폼 시각화]                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│  0:00        1:00        2:00        2:45                  │
│                                                            │
│  📊 자동 분석 결과                                         │
│  - 길이: 2분 45초                                         │
│  - 템포: 120 BPM                                          │
│  - 키: A Minor                                            │
│  - 감지된 섹션: 인트로, 벌스1, 코러스, 벌스2, 코러스, 아웃트로│
│                                                            │
│                                     [다음 단계로 →]        │
└────────────────────────────────────────────────────────────┘
```

#### 6.2.3 씬 편집 작업 공간

```
┌────────────────────────────────────────────────────────────┐
│ ← 프로젝트    Summer Night                    [저장] [생성]│
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🎬 씬 스토리보드                                          │
│                                                            │
│  템플릿: Urban Night                          [변경하기]   │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  타임라인                                            │ │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │
│  │  [씬1][씬2][씬3][씬4][씬5][씬6][씬7][씬8]            │ │
│  │  0:00              1:30                    2:45      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  씬 목록                                       [모두 재생성]│
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 씬 1: 인트로 (0:00-0:20)               [선택됨]      │  │
│  │ ┌─────────────────────┐                            │  │
│  │ │                     │                            │  │
│  │ │   [이미지 썸네일]    │   가수가 네온 조명 거리를  │  │
│  │ │                     │   천천히 걷는 장면         │  │
│  │ │                     │                            │  │
│  │ └─────────────────────┘   배경: 도시               │  │
│  │                           시간: 밤                 │  │
│  │ [재생성] [편집] [삭제]     카메라: 와이드          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 씬 2: 벌스 (0:20-0:50)                              │  │
│  │ ┌─────────────────────┐                            │  │
│  │ │   [이미지 썸네일]    │   카페 실내에서 앉아있는  │  │
│  │ └─────────────────────┘   장면...                 │  │
│  │ [재생성] [편집] [삭제]                              │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ... (씬 3-8)                                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 6.3 디자인 시스템

**색상:**
- Primary: `#32A08D` (Teal - 브랜드 컬러)
- Secondary: `#5E5240` (Brown)
- Background: `#FCFCF9` (Cream)
- Text: `#13343B` (Dark Slate)
- Accent: `#32B8C6` (Light Teal)
- Error: `#C0152F` (Red)

**타이포그래피:**
- Headings: Pretendard Bold, 24-40px
- Body: Pretendard Regular, 14-16px
- Monospace: Berkeley Mono (코드, 숫자)

**컴포넌트:**
- 버튼: 둥근 모서리 (8px), 그림자 효과
- 카드: 흰색 배경, 미묘한 테두리, 호버 시 그림자 증가
- 입력 필드: 테두리, 포커스 시 Primary 색상 하이라이트
- 진행률 바: Gradient (Primary → Accent)

***

## 7. Go-to-Market Strategy

### 7.1 출시 전략

**Phase 1: Private Beta (Month 1-2)**
- 목표: 50명 초기 사용자
- 채널:
  - 인디 뮤지션 커뮤니티 (밴드캠프, 사운드클라우드 포럼)
  - 음악 제작 Discord 서버
  - 대학교 음악과/실용음악과
  - 개인 네트워크
- 혜택:
  - 평생 50% 할인
  - 피드백 제공 시 추가 크레딧
  - "Founding Member" 뱃지

**Phase 2: Public Beta (Month 3-4)**
- 목표: 500명
- 채널:
  - Product Hunt 런칭
  - 인디 음악 미디어 기고 (가디언, 피치포크 등)
  - YouTube 음악 제작 채널 협업
  - Instagram/TikTok 광고 (타겟: 인디 뮤지션)
- 이벤트:
  - "첫 뮤직비디오 무료" 프로모션
  - 우수 작품 소셜 미디어 피처

**Phase 3: Official Launch (Month 5-6)**
- 목표: 5,000명
- 채널:
  - 유료 광고 (Google Ads, Meta Ads)
  - 인플루언서 마케팅 (음악 유튜버)
  - 음악 페스티벌 스폰서십
  - PR 캠페인 (테크 미디어, 음악 미디어)

### 7.2 콘텐츠 마케팅

**블로그 콘텐츠:**
- "인디 뮤지션을 위한 뮤직비디오 제작 가이드"
- "AI가 음악 산업을 바꾸는 5가지 방법"
- "성공적인 뮤직비디오의 7가지 요소"
- "예산 없이 전문가 수준 뮤직비디오 만들기"

**비디오 콘텐츠 (YouTube):**
- 제품 데모 및 튜토리얼
- 사용자 성공 스토리
- 비하인드 신 (AI 기술 설명)
- Before/After 비교 (전통 vs AI)

**소셜 미디어:**
- 매주 사용자 제작 뮤직비디오 하이라이트
- 팁 & 트릭 시리즈
- AI 기술 교육 콘텐츠
- 음악 산업 트렌드 분석

### 7.3 파트너십

**음악 플랫폼:**
- SoundCloud, Bandcamp 통합 (직접 업로드)
- DistroKid, TuneCore 파트너십 (배급 서비스)

**교육 기관:**
- 음악 학교, 실용음악과 단체 라이선스
- 온라인 음악 제작 강좌 통합

**음악 레이블:**
- 소규모 인디 레이블 B2B 플랜
- 화이트라벨 솔루션 제공

***

## 8. Risk Analysis & Mitigation

### 8.1 주요 리스크

| 리스크 | 발생 확률 | 영향도 | 대응 전략 |
|-------|----------|--------|----------|
| **AI API 가격 인상** | 높음 | 높음 | - 멀티 모델 전략 (가격 경쟁)<br>- 오픈소스 모델 통합 (Wan 2.1)<br>- 로컬 배포 준비<br>- 가격 헤지 (미리 크레딧 구매) |
| **생성 품질 불만족** | 중간 | 높음 | - 사용자 피드백 루프<br>- 재생성 무제한 허용<br>- 환불 정책<br>- 지속적 모델 업그레이드 |
| **저작권 문제** | 낮음 | 높음 | - 명확한 이용약관<br>- AI 생성물 저작권 교육<br>- 상업적 사용 가이드라인<br>- 법률 자문 |
| **경쟁자 진입** | 높음 | 중간 | - 빠른 제품 개선<br>- 커뮤니티 구축<br>- 독점 기능 개발<br>- 브랜드 충성도 |
| **기술적 장애** | 중간 | 중간 | - 자동 모니터링<br>- 다중 API 제공자<br>- 백업 시스템<br>- 신속한 고객 지원 |
| **시장 수요 과대평가** | 중간 | 높음 | - 린 스타트업 방식<br>- MVP 빠른 검증<br>- 피벗 준비<br>- 다양한 고객층 타겟 |

### 8.2 법률 및 규정

**저작권:**
- AI 생성 콘텐츠의 저작권은 사용자에게 귀속
- 플랫폼은 중개자 역할 (DMCA Safe Harbor)
- 사용자는 업로드한 음악에 대한 권리 보유 확인

**개인정보 보호:**
- GDPR, CCPA 준수
- 사용자 데이터 암호화
- 명확한 데이터 사용 동의
- 데이터 삭제 요청 처리 프로세스

**이용약관:**
- AI 생성 콘텐츠 한계 명시
- 상업적 사용 가이드라인
- 플랫폼 책임 범위
- 분쟁 해결 절차

***

## 9. Success Metrics & KPIs

### 9.1 핵심 지표

**사용자 획득 (Acquisition):**
```
목표 (6개월):
- 총 가입자: 5,000명
- 월간 신규 가입: 800명
- CAC: $15 이하
- 유입 채널별 전환율: 10%+
```

**활성화 (Activation):**
```
목표:
- 첫 프로젝트 생성율: 70%
- 첫 비디오 완성율: 50%
- Time to first video: 평균 30분
- 온보딩 완료율: 80%
```

**유지 (Retention):**
```
목표:
- Day 7 Retention: 40%
- Day 30 Retention: 20%
- 월별 활성 사용자: 60%
- Churn Rate: 5% 이하
```

**수익 (Revenue):**
```
목표 (6개월):
- MRR: $10,000
- 유료 전환율: 15%
- ARPU: $35
- LTV: $420 (12개월 기준)
```

**추천 (Referral):**
```
목표:
- NPS: 40+
- 추천 유입: 20%
- 소셜 공유율: 30%
- 바이럴 계수(K): 0.5
```

### 9.2 제품 품질 지표

**성능:**
```
- 평균 비디오 생성 시간: 8분
- 생성 성공률: 95%
- API 응답 시간: <500ms
- 서버 가동률: 99.5%
```

**사용자 만족도:**
```
- 평균 평점: 4.5/5.0
- 고객 지원 응답 시간: <2시간
- 티켓 해결율: 90%
- 사용자 피드백 반영율: 60%
```

***

## 10. Development Roadmap

### 10.1 Phase 1: MVP (Month 1-3)

**Month 1: Foundation**
- [ ] Next.js 프로젝트 설정
- [ ] Supabase 통합 (Auth, Database, Storage)
- [ ] 기본 UI/UX 구현
- [ ] 음악 업로드 기능
- [ ] 오디오 분석 (Essentia.js)

**Month 2: Core Features**
- [ ] 캐릭터 프로필 생성
- [ ] Nano Banana 2 통합
- [ ] 씬 이미지 자동 생성
- [ ] 씬 편집 인터페이스
- [ ] 3개 기본 템플릿

**Month 3: Video & Launch**
- [ ] Kling 2.1 Standard 통합
- [ ] 비디오 생성 파이프라인
- [ ] FFmpeg 후처리
- [ ] 결제 시스템 (Stripe)
- [ ] Private Beta 론칭

**주요 마일스톤:**
- Week 4: 첫 이미지 생성 성공
- Week 8: 첫 비디오 생성 성공
- Week 12: 베타 사용자 50명

### 10.2 Phase 2: Growth (Month 4-6)

**Month 4: Enhancement**
- [ ] Qwen Image Edit 통합
- [ ] 스마트 모델 선택 로직
- [ ] 비트 동기화 기능
- [ ] 추가 템플릿 (10개)
- [ ] AI 컨셉 추천

**Month 5: Optimization**
- [ ] 성능 최적화
- [ ] 모바일 UX 개선
- [ ] 협업 기능 (Phase 1)
- [ ] 분석 대시보드
- [ ] A/B 테스팅 인프라

**Month 6: Scale**
- [ ] Public Beta 론칭
- [ ] 마케팅 캠페인
- [ ] 커뮤니티 구축
- [ ] 파트너십 체결
- [ ] Official Launch

**주요 마일스톤:**
- Month 4: 베타 사용자 200명
- Month 5: 첫 $1,000 MRR
- Month 6: 5,000 가입자, $10,000 MRR

### 10.3 Phase 3: Scale (Month 7-12)

**Features:**
- [ ] 립싱크 (Pika 통합)
- [ ] 가사 자막 자동 생성
- [ ] 템플릿 마켓플레이스
- [ ] 모바일 앱 (React Native)
- [ ] API 공개 (B2B)
- [ ] 화이트라벨 솔루션
- [ ] 오픈소스 모델 로컬 배포 (Wan 2.1)

**Growth:**
- [ ] 글로벌 확장 (미국, 일본)
- [ ] 다국어 지원 추가
- [ ] 대규모 마케팅 캠페인
- [ ] 음악 페스티벌 스폰서십
- [ ] 유명 아티스트 케이스 스터디

**주요 마일스톤:**
- Month 9: 20,000 사용자
- Month 12: 50,000 사용자, $50,000 MRR

***

## 11. Team & Resources

### 11.1 초기 팀 구성

**필수 역할 (MVP):**
1. **Full-stack Developer** (1명)
   - Next.js, TypeScript, React
   - Supabase, PostgreSQL
   - AI API 통합

2. **Product Designer** (1명)
   - UI/UX 디자인
   - 프로토타이핑
   - 사용자 테스트

3. **Product Manager** (1명, 본인 가능)
   - 제품 전략
   - 사용자 연구
   - 로드맵 관리

**확장 팀 (Phase 2):**
4. **Backend Developer**
   - 비디오 처리 최적화
   - 인프라 관리
   - 성능 튜닝

5. **Marketing Lead**
   - 콘텐츠 마케팅
   - 소셜 미디어
   - 파트너십

### 11.2 예산 (초기 6개월)

| 항목 | 월간 비용 | 6개월 총액 |
|-----|----------|-----------|
| **인건비** | | |
| - Full-stack Dev (1명) | $6,000 | $36,000 |
| - Product Designer (1명) | $5,000 | $30,000 |
| - Product Manager (본인) | $0 | $0 |
| **인프라** | | |
| - Vercel (Pro) | $20 | $120 |
| - Supabase (Pro) | $25 | $150 |
| - Cloudflare R2 | $50 | $300 |
| **AI API** | | |
| - Nano Banana (Google) | $100 | $600 |
| - Kling Video (Together AI) | $500 | $3,000 |
| **마케팅** | | |
| - 온라인 광고 | $1,000 | $6,000 |
| - 콘텐츠 제작 | $500 | $3,000 |
| **기타** | | |
| - 도메인, 도구 등 | $200 | $1,200 |
| **총액** | **$13,395** | **$80,370** |

**펀딩 전략:**
- 자체 자금: $30,000
- Seed Round: $50,000-100,000
- 부트스트래핑: 수익으로 성장

***

## 12. Appendix

### 12.1 용어 사전

- **씬 (Scene)**: 뮤직비디오의 개별 장면 단위 (일반적으로 10-20초)
- **캐릭터 프로필 (Character Profile)**: 사용자 얼굴/캐릭터의 AI 학습된 표현
- **템플릿 (Template)**: 사전 정의된 뮤직비디오 스타일 및 씬 구성
- **스토리보드 (Storyboard)**: 뮤직비디오의 전체 씬 구성 및 순서
- **비트 싱크 (Beat Sync)**: 비디오 전환을 음악 비트에 동기화
- **립싱크 (Lip Sync)**: 캐릭터의 입 모양을 노래 가사에 맞춤

### 12.2 참고 자료

**경쟁사 분석:**
- Runway ML: $12-95/월, 프로페셔널 타겟
- Pika Labs: $8-70/월, 일반 크리에이터
- Neural Frames: $29-119/월, 음악 특화
- LTX Studio: 베타 단계, 무료

**시장 조사:**
- 2024 인디 음악 시장 보고서 (MIDiA Research)
- AI 비디오 생성 시장 전망 (Gartner)
- 뮤지션 설문조사 (Survey Monkey, N=500)

### 12.3 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
|-----|------|----------|--------|
| 1.0 | 2025-11-23 | 초안 작성 | Product Team |

***

## 13. Next Steps

### 즉시 실행 항목

1. **이해관계자 리뷰**
   - [ ] 개발팀과 기술 feasibility 확인
   - [ ] 디자인팀과 UI/UX 검토
   - [ ] 비즈니스팀과 수익 모델 검증

2. **프로토타입**
   - [ ] Figma 고충실도 프로토타입 제작
   - [ ] 사용자 테스트 (5-10명)
   - [ ] 피드백 반영

3. **기술 검증**
   - [ ] Nano Banana 2 API 테스트
   - [ ] Kling 2.1 API 테스트
   - [ ] FFmpeg 파이프라인 PoC

4. **팀 빌딩**
   - [ ] Full-stack Developer 채용
   - [ ] Product Designer 채용 또는 외주

5. **개발 시작**
   - [ ] Sprint 1 계획 (2주)
   - [ ] GitHub 레포지토리 설정
   - [ ] CI/CD 파이프라인 구축

***

**문의:** product@melodyvision.ai  
**문서 관리:** Notion / Confluence

***
