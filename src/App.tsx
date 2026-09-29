// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Activity,
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  FileCheck,
  Fingerprint,
  HardDrive,
  Headphones,
  Layers,
  Lock,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  Monitor,
  Music,
  Network,
  Pause,
  Play,
  Radio,
  RefreshCw,
  RotateCcw,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sliders,
  Sparkles,
  Terminal,
  Upload,
  User,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Zap
} from 'lucide-react';

const HORIZONTAL_STAGES = [
  {
    id: 1,
    key: 'INPUTS',
    badge: 'STAGE 1: INGESTION LAYER',
    title: 'Users & Ingestion Layer',
    subtitle: 'Field Officer Mobile Capture & Supervisor Administrative Command',
    description: 'Enforcement personnel initiate field rapid test verification using a hardened mobile device, capturing photo evidence and authenticating location metadata.',
    minFallbackDuration: 7000,
    actor: 'Field Officer (Mobile App) & Supervisor (Web)',
    color: 'cyan',
    accentBorder: 'border-cyan-500/40',
    accentGlow: 'shadow-cyan-500/20',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    narration: 'Stage 1: Users and Ingestion Layer. Enforcement personnel capture rapid test card imagery using the mobile application. High-resolution frames, officer credentials, and dual-frequency GPS coordinates are buffered directly into volatile memory.',
    inputs: [
      { label: 'Capture / Select Image', detail: 'Rapid diagnostic test card photo' },
      { label: 'Operator ID', detail: 'OFFICER-4491 (Enforcement Unit 4)' },
      { label: 'GPS / Area Tag', detail: 'Lat: 15.3647° N, Lng: 75.1240° E' },
      { label: 'Situational Context', detail: 'Highway Checkpost #7 (Standard Protocol)' },
      { label: 'Officer Observations', detail: 'Clear strip lines visible to naked eye' }
    ],
    tensorPayload: 'Raw Sensor Frame: 4032x3024 24bpp JPEG (3.8 MB)',
    codeSnippet: `// 1. Mobile Camera Sensor Frame Capture
const photo = await cameraRef.current.takePhoto({
  flash: 'off',
  enableShutterSound: false,
  qualityPrioritization: 'balanced'
});

const fieldIngestPayload = {
  operatorId: 'OFFICER-4491',
  location: { lat: 15.3647, lng: 75.1240, accuracyMeters: 1.8 },
  timestamp: new Date().toISOString(),
  situation: 'Highway Checkpost #7',
  photoUri: photo.path
};`,
    logs: [
      'VisionCamera hardware sensor initialized with 4K auto-focus lock',
      'Dual-frequency GPS coordinates locked (accuracy ±1.8m)',
      'Operator credential OFFICER-4491 verified with local cryptographic keystore',
      'High-resolution raw forensic evidence buffered into volatile memory'
    ]
  },
  {
    id: 2,
    key: 'PREPROCESSING',
    badge: 'STAGE 2: PREPROCESSING',
    title: 'Image Preprocessing & Tensor Normalization',
    subtitle: 'Rigid geometry correction, 224x128 resize & RGB standardization',
    description: 'The raw capture undergoes strict spatial rectification, test strip bounding extraction, and pixel scaling to produce a standardized tensor while vaulting the original image untouched for court evidence.',
    minFallbackDuration: 7500,
    actor: 'OpenCV / TorchVision Edge Preprocessor',
    color: 'indigo',
    accentBorder: 'border-indigo-500/40',
    accentGlow: 'shadow-indigo-500/20',
    accentText: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    narration: 'Stage 2: Image Preprocessing. The raw capture is rectified for rotational skew, cropped precisely to 224 by 128 pixels, and normalized into 32-bit floating point tensors, while the raw photo is sealed untouched into the encrypted forensic vault.',
    inputs: [
      { label: 'Orientation Matrix', detail: 'Corrected rotational skew (+4.2°)' },
      { label: 'Bounding Extraction', detail: 'Test window crop: 224 x 128 px' },
      { label: 'RGB Normalization', detail: 'Mean: [0.485, 0.456, 0.406], Std: 0.229' },
      { label: 'Evidence Preservation', detail: 'Pristine raw JPEG sealed in forensic vault' }
    ],
    tensorPayload: 'Normalized Tensor: Float32[1, 3, 128, 224] (Range 0.0 - 1.0)',
    codeSnippet: `// 2. Rigid OpenCV preprocessing & tensor transformation
cv::Mat bgr, cropped, floatMat;
cv::cvtColor(rawFrame, bgr, cv::COLOR_YUV2BGR_NV21);
cv::warpAffine(bgr, bgr, rotationMatrix, bgr.size()); // Desqueeze
cv::resize(bgr(roiRect), cropped, cv::Size(224, 128));
cropped.convertTo(floatMat, CV_32FC3, 1.0 / 255.0);

// Vault unmodified original capture for judicial audit trail
secureStorage.vaultOriginalEvidence(rawFrame, "evidence_raw.enc");`,
    logs: [
      'Perspective skew corrected via 4-point affine transformation',
      'C-Band and T-Band chromatic window cropped to 224x128 bounding box',
      'Pixel intensities converted to 32-bit floating point tensor (3x128x224)',
      'Unmodified raw frame locked into hardware-backed encrypted vault'
    ]
  },
  {
    id: 3,
    key: 'SENTINEL',
    badge: 'STAGE 3: HEALTH SENTINEL',
    title: '4-Point Hardware & Network Sentinel',
    subtitle: 'Sub-millisecond verification of connectivity, daemon, storage & AI model integrity',
    description: 'Before making execution decisions, the system conducts a 4-point autonomous health check across local and external subsystems to ensure zero disruption.',
    minFallbackDuration: 7500,
    actor: 'Autonomous System Watchdog Daemon',
    color: 'emerald',
    accentBorder: 'border-emerald-500/40',
    accentGlow: 'shadow-emerald-500/20',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    narration: 'Stage 3: Health Sentinel. A four-point probe runs in parallel, testing cellular network latency, cloud API availability, encrypted disk headroom, and the SHA-256 integrity of the on-device AI model weights.',
    probes: [
      { title: 'Check Internet', desc: 'ICMP & DNS Socket Probe', status: 'Online 4G (42ms ping)' },
      { title: 'Check Server', desc: 'FastAPI /v1/health Probe', status: '200 OK (Healthy)' },
      { title: 'Check Local Storage', desc: 'Encrypted SQLite Headroom', status: '480 MB Available' },
      { title: 'Check Model Integrity', desc: 'ONNX Int8 Binary Hash', status: 'SHA256 Validated' }
    ],
    tensorPayload: 'Watchdog Token: Status: HEALTHY | RoutePreference: AUTO',
    codeSnippet: `// 3. Multi-point parallel health watchdog
const [netStatus, serverStatus, diskStatus, modelStatus] = await Promise.all([
  probeNetworkSocket({ timeoutMs: 150 }),
  pingFastApiHealthEndpoint({ endpoint: '/v1/health' }),
  checkEncryptedStorageQuota({ requiredBytes: 50 * 1024 * 1024 }),
  verifyOnDeviceModelChecksum('mobilenetv3_small_int8.onnx')
]);

const isOnlineAndHealthy = netStatus.ok && serverStatus.isHealthy;`,
    logs: [
      '[SENTINEL-1] Cellular socket handshake verified (RTT: 42ms)',
      '[SENTINEL-2] Cloud REST API /v1/health responded with HTTP 200 OK',
      '[SENTINEL-3] Local encrypted SQLite storage headroom: 480MB free',
      '[SENTINEL-4] Local ONNX model SHA-256 hash match: 7b83f49... INTEGRITY OK'
    ]
  },
  {
    id: 4,
    key: 'DECISION_GATEWAY',
    badge: 'STAGE 4: DYNAMIC GATEWAY',
    title: 'Dynamic Decision Gateway',
    subtitle: '"Is Internet and Server Available?" — Dual Path Routing Arbiter',
    description: 'The core switching logic that provides seamless, uninterrupted operation. If online, it streams through the high-throughput Cloud Services path; if offline or degraded, it switches seamlessly to the air-gapped On-Device execution engine.',
    minFallbackDuration: 8000,
    actor: 'Arbitration Gateway & Dispatch Engine',
    color: 'amber',
    accentBorder: 'border-amber-500/40',
    accentGlow: 'shadow-amber-500/20',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    narration: 'Stage 4: Dynamic Decision Gateway. The system dynamically arbitrates the execution path. If the cloud is reachable, it streams through secure server APIs. If offline or congested, it switches immediately to the embedded air-gapped pipeline.',
    tensorPayload: 'Routing State: Active Branch Selected by Sentinel',
    codeSnippet: `// 4. Dynamic Path Arbitration
if (isOnlineAndHealthy && userPreferredMode !== 'FORCE_OFFLINE') {
  console.log('[GATEWAY] Routing to: ONLINE CLOUD EXECUTION');
  dispatchPipeline(EXECUTION_PATHS.ONLINE_CLOUD);
} else {
  console.log('[GATEWAY] Routing to: OFFLINE AIR-GAPPED ON-DEVICE MODEL');
  dispatchPipeline(EXECUTION_PATHS.OFFLINE_EDGE_ONNX);
}`,
    logs: [
      '[GATEWAY] Evaluating live connectivity & socket latency metrics...',
      '[GATEWAY] No packet loss detected on primary uplink channel',
      '[ARBITER] Decision computed in 1.4ms: Routing to primary path',
      '[DISPATCH] Dynamic execution context established'
    ]
  },
  {
    id: 5,
    key: 'INFERENCE',
    badge: 'STAGE 5: AI INFERENCE ENGINE',
    title: 'Dual-Path AI Inference Engine',
    subtitle: 'MobileNetV3-Small (Quantized Int8) + Chromatic Decision Engine',
    description: 'The normalized 224x128 tensor is processed by MobileNetV3-Small. It analyzes the control (C) and test (T) bands, computes Delta-E optical density, and produces high-confidence classification probabilities.',
    minFallbackDuration: 7500,
    actor: 'ONNX Runtime / Cloud TorchServe Node',
    color: 'rose',
    accentBorder: 'border-rose-500/40',
    accentGlow: 'shadow-rose-500/20',
    accentText: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    narration: 'Stage 5: Dual Path AI Inference Engine. The normalized tensor runs through quantized MobileNet V3. Both the control and test bands are classified, returning a ninety-six point four percent positive confidence verdict in under forty milliseconds.',
    tensorPayload: 'Probabilities: Positive 96.4% | Negative 2.6% | Inconclusive 1.0%',
    codeSnippet: `// 5. ONNX Runtime inference & chromatic decision engine
const session = await ort.InferenceSession.create('mobilenetv3_small_int8.onnx');
const feeds = { 'input_tensor': normalizedTensor };
const results = await session.run(feeds);

// Extract band optical densities & Delta-E chromatic contrast
const [posScore, negScore, incScore] = results.output.data;
const verdict = posScore > 0.85 ? 'POSITIVE' : 'NEGATIVE';
const confidence = Math.max(posScore, negScore);`,
    logs: [
      'ONNX Runtime Int8 execution graph loaded into memory',
      'Forward pass completed: Latency 38.6ms on embedded NPU/CPU',
      'Control Band (C): 0.942 OD (Valid test strip condition confirmed)',
      'Test Band (T): 0.884 OD (Delta-E: 14.8) -> VERDICT: POSITIVE (96.4%)'
    ]
  },
  {
    id: 6,
    key: 'STORAGE_SYNC',
    badge: 'STAGE 6: DATA & CONSISTENCY LAYER',
    title: 'Forensic Storage & Synchronization Layer',
    subtitle: 'Cryptographic SHA-256 Seal, Local SQLite Queue & Cloud PostgreSQL Ledger',
    description: 'Every inspection result is cryptographically hashed with its timestamp, GPS coordinates, and Officer ID. In offline mode, records queue safely in encrypted SQLite; upon reconnection, the background worker automatically reconciles them with the central database.',
    minFallbackDuration: 8000,
    actor: 'SQLite Queue Engine & Supabase PostgreSQL Sync',
    color: 'purple',
    accentBorder: 'border-purple-500/40',
    accentGlow: 'shadow-purple-500/20',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    narration: 'Stage 6: Data and Consistency Layer. An immutable SHA-256 cryptographic digest seals the inspection record. Pending offline logs queue into encrypted SQLite and synchronize idempotently when connectivity is restored.',
    tensorPayload: 'SHA-256: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    codeSnippet: `// 6. SHA-256 seal & idempotent synchronization
const payload = {
  recordId: 'REC-2026-9041',
  timestamp: '2026-09-29T14:58:40Z',
  result: 'POSITIVE',
  confidence: 0.964,
  operatorId: 'OFFICER-4491',
  location: { lat: 15.3647, lng: 75.1240 }
};

const sha256 = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

if (isOnline) {
  await supabase.from('field_verifications').upsert({ ...payload, sha256 });
} else {
  await localSqlite.insert({ ...payload, sha256, syncStatus: 'PENDING' });
}`,
    logs: [
      'Computing immutable SHA-256 digest over verified payload...',
      'Forensic Seal: 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      'Record written to SQLite WAL with ACID transaction durability',
      'Sync worker confirmed: Idempotent hash prevents duplicate records'
    ]
  },
  {
    id: 7,
    key: 'OUTPUTS',
    badge: 'STAGE 7: DUAL DELIVERABLES',
    title: 'Final Outputs & Tactical Deliverables',
    subtitle: 'Instant Field Officer Decision HUD + Supervisor Command Central Dashboard',
    description: 'The end result is delivered simultaneously to the front lines and headquarters: the Field Officer receives an immediate verdict with tamper-evident proof, and Supervisors gain live audit logs, spatial heatmaps, and compliance reports.',
    minFallbackDuration: 8000,
    actor: 'Field Tactical Display & Central Web Portal',
    color: 'emerald',
    accentBorder: 'border-emerald-500/40',
    accentGlow: 'shadow-emerald-500/20',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    narration: 'Stage 7: Final Outputs and Deliverables. The field officer receives an instant tamper-evident digital certificate, while the central command dashboard logs the verified record with real-time audit history and spatial telemetry.',
    tensorPayload: 'Delivered: Mobile Verdict [POSITIVE 96.4%] | Command Log [COMMITTED]',
    codeSnippet: `// 7. Tactical display emission & audit logging
// A. Field Officer Tactical HUD
renderOfficerResultView({
  status: 'POSITIVE',
  confidence: '96.4%',
  sha256Receipt: '9f86d081...0a08',
  tamperValid: true
});

// B. Central Supervisor Command Stream
broadcastAdminEvent({
  event: 'FIELD_VERIFICATION_COMMITTED',
  operatorId: 'OFFICER-4491',
  location: 'Sector 7 Highway Checkpost',
  verdict: 'POSITIVE',
  timestamp: new Date().toISOString()
});`,
    logs: [
      'Field Officer tactile HUD refreshed: POSITIVE (High Confidence Alert)',
      'Forensic QR receipt generated with SHA-256 checksum for field verification',
      'Central Web Command Center notified via WebSocket stream',
      'Complete end-to-end inspection lifecycle completed in 184ms total latency'
    ]
  }
];

class AudioEngine {
  ctx: AudioContext | null = null;
  ambientGain: GainNode | null = null;
  ambientOsc1: OscillatorNode | null = null;
  ambientOsc2: OscillatorNode | null = null;
  isAmbientPlaying: boolean = false;

  constructor() {
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 520, duration = 0.08, type = 'sine') {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  playStepTransition(index) {
    const tones = [440, 493.88, 554.37, 659.25, 739.99, 830.61, 987.77];
    this.playBeep(tones[index % tones.length], 0.12, 'triangle');
  }

  startAmbientHum() {
    try {
      this.init();
      if (!this.ctx || this.isAmbientPlaying) return;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientGain = gain;
      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
      this.isAmbientPlaying = true;
    } catch {
      // Fallback
    }
  }

  stopAmbientHum() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.ambientOsc1) this.ambientOsc1.stop();
          if (this.ambientOsc2) this.ambientOsc2.stop();
          this.isAmbientPlaying = false;
        }, 500);
      } catch {
        this.isAmbientPlaying = false;
      }
    }
  }
}

const audioFX = new AudioEngine();

function HorizontalArrowConduit({
  isUnlocked,
  isCurrentlyShooting,
  pulseProgress,
  arrowLabel = 'DATA PULSE'
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 self-center select-none flex-shrink-0">
      <div className="relative w-28 sm:w-36 h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden flex items-center shadow-inner">
        {isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 opacity-40" />
        )}

        {isCurrentlyShooting && (
          <div
            className="absolute top-0 bottom-0 w-12 bg-white rounded-full shadow-[0_0_16px_#38bdf8]"
            style={{
              left: `${pulseProgress}%`,
              transform: 'translateX(-50%)',
              transition: 'left 0.05s linear'
            }}
          />
        )}
      </div>

      <div className={`mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 flex items-center gap-1 ${
        isCurrentlyShooting
          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
          : isUnlocked
          ? 'bg-slate-900 text-slate-400 border-slate-800'
          : 'bg-slate-950 text-slate-700 border-slate-900'
      }`}>
        <span>{arrowLabel}</span>
        <ArrowRight className={`w-3 h-3 ${isCurrentlyShooting ? 'animate-pulse text-cyan-300' : ''}`} />
      </div>
    </div>
  );
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [executionMode, setExecutionMode] = useState('ONLINE'); // 'ONLINE' | 'OFFLINE'
  const [autoAlternateRoute, setAutoAlternateRoute] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientHumEnabled, setAmbientHumEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [stagePostPause, setStagePostPause] = useState(false);
  const [voiceSettingsOpen, setVoiceSettingsOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedInspectStep, setSelectedInspectStep] = useState(0);

  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const activeStage = HORIZONTAL_STAGES[currentStepIndex];

  // Speech and transition refs
  const utteranceRef = useRef(null);
  const postPauseTimerRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const fallbackStartTimeRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const populateVoices = () => {
      const availVoices = window.speechSynthesis.getVoices();
      if (availVoices && availVoices.length > 0) {
        setVoices(availVoices);
        const preferred = availVoices.find(
          (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('David')) && v.lang.startsWith('en')
        ) || availVoices.find((v) => v.lang.startsWith('en')) || availVoices[0];

        if (preferred && !selectedVoiceURI) {
          setSelectedVoiceURI(preferred.voiceURI);
        }
      }
    };

    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedVoiceURI]);

  const scrollToStage = useCallback((stepIndex) => {
    const cardEl = cardRefs.current[stepIndex];
    const container = scrollContainerRef.current;
    if (cardEl && container) {
      const containerWidth = container.offsetWidth;
      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, []);

  const advanceToNextStage = useCallback(() => {
    setStepProgress(0);
    setCurrentCharIndex(0);
    setStagePostPause(false);

    setCurrentStepIndex((prev) => {
      const next = prev + 1;
      if (next >= HORIZONTAL_STAGES.length) {
        if (autoAlternateRoute) {
          setExecutionMode((m) => (m === 'ONLINE' ? 'OFFLINE' : 'ONLINE'));
        }
        if (soundEnabled) audioFX.playBeep(987.77, 0.2, 'triangle');
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }, 300);
        return 0;
      } else {
        if (soundEnabled) audioFX.playStepTransition(next);
        scrollToStage(next);
        return next;
      }
    });
  }, [autoAlternateRoute, soundEnabled, scrollToStage]);

  useEffect(() => {
    // Clear any pending timers
    if (postPauseTimerRef.current) clearTimeout(postPauseTimerRef.current);
    if (fallbackTimerRef.current) cancelAnimationFrame(fallbackTimerRef.current);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    let isActive = true;

    if (!isPlaying) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
      return;
    }

    // Resume speech synthesis if it was paused
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      return;
    }

    const stage = HORIZONTAL_STAGES[currentStepIndex];
    const script = stage.narration;

    if (voiceEnabled) {
      // Cancel previous utterances before starting clean
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(script);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.volume = 1.0;

      if (selectedVoiceURI) {
        const voiceObj = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (voiceObj) utterance.voice = voiceObj;
      }

      utterance.onstart = () => {
        if (!isActive) return;
        setIsSpeaking(true);
        setStagePostPause(false);
      };

      // Real-time word/character boundary tracking
      utterance.onboundary = (e) => {
        if (!isActive) return;
        if (e.name === 'word') {
          setCurrentCharIndex(e.charIndex);
          const progress = Math.min(95, (e.charIndex / script.length) * 100);
          setStepProgress(progress);
        }
      };

      // Slide only advances AFTER speech ends completely
      utterance.onend = () => {
        if (!isActive) return;
        setIsSpeaking(false);
        setCurrentCharIndex(script.length);
        setStepProgress(100);
        setStagePostPause(true);

        // Natural pause (1.2 seconds) after speaking before moving to next slide
        postPauseTimerRef.current = setTimeout(() => {
          if (isActive) advanceToNextStage();
        }, 1200);
      };

      utterance.onerror = (err) => {
        if (!isActive) return;
        console.warn('SpeechSynthesis error or interrupted:', err);
        setIsSpeaking(false);
        // Fallback to simple timer if voice fails
        fallbackTimerRef.current = setTimeout(() => {
          if (isActive) advanceToNextStage();
        }, 4000);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);

    } else {
      // Voice is muted: run on comfortable reading timer
      setIsSpeaking(false);
      const fallbackDuration = stage.minFallbackDuration;
      fallbackStartTimeRef.current = performance.now();

      const loop = (now) => {
        if (!isActive) return;
        const elapsed = now - fallbackStartTimeRef.current;
        const p = Math.min(100, (elapsed / fallbackDuration) * 100);
        setStepProgress(p);

        if (elapsed < fallbackDuration) {
          fallbackTimerRef.current = requestAnimationFrame(loop);
        } else {
          advanceToNextStage();
        }
      };

      fallbackTimerRef.current = requestAnimationFrame(loop);
    }

    return () => {
      isActive = false;
      if (postPauseTimerRef.current) clearTimeout(postPauseTimerRef.current);
      if (fallbackTimerRef.current) {
        cancelAnimationFrame(fallbackTimerRef.current);
        clearTimeout(fallbackTimerRef.current);
      }
    };
  }, [currentStepIndex, isPlaying, voiceEnabled, speechRate, speechPitch, selectedVoiceURI, voices, advanceToNextStage]);

  useEffect(() => {
    scrollToStage(0);
  }, [scrollToStage]);

  useEffect(() => {
    if (ambientHumEnabled) {
      audioFX.startAmbientHum();
    } else {
      audioFX.stopAmbientHum();
    }
    return () => {
      audioFX.stopAmbientHum();
    };
  }, [ambientHumEnabled]);

  const togglePlay = () => {
    if (typeof window === 'undefined') return;

    if (isPlaying) {
      // Pause
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      // Resume
      if (window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      setIsPlaying(true);
    }
  };

  const handleManualJump = (index) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStepProgress(0);
    setCurrentCharIndex(0);
    setStagePostPause(false);
    setCurrentStepIndex(index);
    if (soundEnabled) audioFX.playStepTransition(index);
    scrollToStage(index);
  };

  const handleNext = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStepProgress(0);
    setCurrentCharIndex(0);
    setStagePostPause(false);
    const next = (currentStepIndex + 1) % HORIZONTAL_STAGES.length;
    setCurrentStepIndex(next);
    if (soundEnabled) audioFX.playStepTransition(next);
    scrollToStage(next);
  };

  const handlePrev = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStepProgress(0);
    setCurrentCharIndex(0);
    setStagePostPause(false);
    const prev = currentStepIndex === 0 ? HORIZONTAL_STAGES.length - 1 : currentStepIndex - 1;
    setCurrentStepIndex(prev);
    if (soundEnabled) audioFX.playStepTransition(prev);
    scrollToStage(prev);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStepProgress(0);
    setCurrentCharIndex(0);
    setStagePostPause(false);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    scrollToStage(0);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      audioFX.init();
      audioFX.playBeep(659.25, 0.1);
    }
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (!next) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };

  const renderHighlightedTranscript = () => {
    const script = activeStage.narration;
    if (!voiceEnabled || !isSpeaking) {
      return <span>"{script}"</span>;
    }

    const spokenPart = script.substring(0, currentCharIndex);
    const upcomingPart = script.substring(currentCharIndex);

    return (
      <span>
        "<span className="text-cyan-300 font-bold underline decoration-cyan-400 decoration-2 underline-offset-4">{spokenPart}</span>
        <span className="text-slate-400">{upcomingPart}</span>"
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  AURA-Edge
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                    SPEECH-DRIVEN FLOW
                  </span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  VOICE SYNCED
                </span>
              </div>
              <p className="text-xs text-slate-400">Step progression strictly synchronized with narrator audio</p>
            </div>
          </div>

          {/* Controls: Voice, Ambient Hum, SFX, Inspector */}
          <div className="flex items-center gap-2 text-xs font-mono">
            
            {/* Background Voice Narrator Toggle */}
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                voiceEnabled
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm shadow-rose-500/20'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
              title={voiceEnabled ? 'Mute AI Voice Narrator' : 'Enable AI Voice Narrator'}
            >
              {voiceEnabled ? <Mic className="w-3.5 h-3.5 animate-pulse text-rose-400" /> : <MicOff className="w-3.5 h-3.5" />}
              <span className="font-bold">{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
              {isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />}
            </button>

            {/* Ambient Cyber Hum Toggle */}
            <button
              onClick={() => setAmbientHumEnabled(!ambientHumEnabled)}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-all ${
                ambientHumEnabled
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
              title={ambientHumEnabled ? 'Disable Ambient Synth Hum' : 'Enable Ambient Synth Hum'}
            >
              <Music className={`w-3.5 h-3.5 ${ambientHumEnabled ? 'text-indigo-400 animate-pulse' : ''}`} />
              <span>Synth Hum</span>
            </button>

            {/* Voice Settings Dropdown Toggle */}
            <button
              onClick={() => setVoiceSettingsOpen(!voiceSettingsOpen)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Voiceover Configuration"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* SFX Bleep Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute Audio FX' : 'Enable Audio FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Inspect Code Button */}
            <button
              onClick={() => {
                setSelectedInspectStep(currentStepIndex);
                setInspectorOpen(true);
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Inspect Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Voice Settings Drawer */}
      {voiceSettingsOpen && (
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 z-40 shadow-xl backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <Headphones className="w-4 h-4" />
              <span>AI Narrator Pacing & Voice Controls:</span>
            </div>

            {/* Voice Picker Dropdown */}
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <span className="text-slate-400">Voice:</span>
              <select
                value={selectedVoiceURI}
                onChange={(e) => {
                  setSelectedVoiceURI(e.target.value);
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs w-full focus:outline-none focus:border-cyan-500"
              >
                {voices.length > 0 ? (
                  voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                ) : (
                  <option value="">Default System Synthesizer Voice</option>
                )}
              </select>
            </div>

            {/* Speech Rate & Pitch Sliders */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Speed:</span>
                <input
                  type="range"
                  min="0.75"
                  max="1.25"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-20 accent-rose-500 cursor-pointer"
                />
                <span className="text-slate-300 w-8">{speechRate}x</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Pitch:</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  className="w-20 accent-cyan-500 cursor-pointer"
                />
                <span className="text-slate-300 w-8">{speechPitch}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controller HUD Bar */}
      <div className="bg-slate-950/95 border-b border-slate-800/80 px-4 py-2.5 z-40 shadow-xl flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Active Step Indicator & Narration Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs">
                {currentStepIndex + 1}
              </span>
              <span className="text-slate-400 font-mono hidden sm:inline">of {HORIZONTAL_STAGES.length}:</span>
              <span className="font-bold text-white font-mono truncate max-w-[200px] sm:max-w-none">
                {activeStage.badge}
              </span>
            </div>

            {/* Real-time Voice Pacing Badge */}
            {voiceEnabled && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 border ${
                isSpeaking
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : stagePostPause
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}>
                {isSpeaking ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    Narrating: {Math.round(stepProgress)}%
                  </>
                ) : stagePostPause ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Pacing to next...
                  </>
                ) : (
                  'Ready'
                )}
              </span>
            )}
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Previous Slide (Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
              title="Next Slide (Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-colors"
              title="Restart from Stage 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <button
              onClick={() => {
                setAutoAlternateRoute(false);
                setExecutionMode('ONLINE');
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                executionMode === 'ONLINE' && !autoAlternateRoute
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Online Cloud
            </button>
            <button
              onClick={() => {
                setAutoAlternateRoute(false);
                setExecutionMode('OFFLINE');
              }}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                executionMode === 'OFFLINE' && !autoAlternateRoute
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Offline Edge
            </button>
            <button
              onClick={() => setAutoAlternateRoute(true)}
              className={`px-2 py-1 rounded-lg border transition-all ${
                autoAlternateRoute
                  ? 'bg-indigo-600 text-white font-bold border-indigo-500'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Alternates between Online and Offline on each complete loop"
            >
              Loop Both
            </button>
          </div>

        </div>

        {/* Global Progress Bar (Exact Speech Tracking) */}
        <div className="w-full bg-slate-900 h-1 mt-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 transition-all duration-150 ease-linear"
            style={{
              width: `${((currentStepIndex + stepProgress / 100) / HORIZONTAL_STAGES.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Start Experience Overlay for Autoplay Policy */}
      {!hasInteracted && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center cursor-pointer animate-in fade-in duration-500"
          onClick={() => {
            setHasInteracted(true);
            setIsPlaying(true);
          }}
        >
          <div className="bg-slate-900 border border-cyan-500/30 p-10 rounded-3xl flex flex-col items-center gap-4 shadow-2xl max-w-md text-center hover:scale-105 transition-transform duration-300">
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-2">
              <Play className="w-10 h-10 text-cyan-400 ml-2" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Start Experience</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Click anywhere to enable AI voice narration and begin the automated flow.
            </p>
          </div>
        </div>
      )}

      {/* Synchronized Real-Time Word-by-Word Teleprompter Subtitle Ribbon */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between gap-3 text-xs font-mono z-30">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold tracking-wider uppercase shrink-0">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>NARRATOR CC</span>
          </div>
          <div className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed truncate">
            {renderHighlightedTranscript()}
          </div>
        </div>
      </div>

      {/* Horizontal Timeline Scrubber */}
      <div className="bg-slate-950 border-b border-slate-900 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto flex-shrink-0">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-1 text-[11px] font-mono">
          {HORIZONTAL_STAGES.map((s, idx) => {
            const isActive = idx === currentStepIndex;
            const isDone = idx < currentStepIndex;
            return (
              <button
                key={s.id}
                onClick={() => handleManualJump(idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-500/20 font-bold'
                    : isDone
                    ? 'bg-slate-900 text-emerald-400 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950 text-slate-600 border-slate-900 hover:text-slate-400'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : isDone ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                <span>0{s.id}. {s.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Horizontal Slide Track */}
      <main
        ref={scrollContainerRef}
        className="flex-1 w-full overflow-x-auto overflow-y-hidden flex items-center px-8 sm:px-16 py-8 relative scroll-smooth no-scrollbar"
      >
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="flex items-stretch gap-0 my-auto min-h-[520px]">
          {HORIZONTAL_STAGES.map((stage, index) => {
            const isCurrentlyActive = index === currentStepIndex;
            const hasPassed = index < currentStepIndex;

            return (
              <React.Fragment key={stage.id}>
                
                {/* HORIZONTAL NODE CARD */}
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleManualJump(index)}
                  className={`w-[360px] sm:w-[460px] md:w-[500px] flex-shrink-0 rounded-3xl border transition-all duration-700 cursor-pointer overflow-hidden relative flex flex-col justify-between ${
                    isCurrentlyActive
                      ? 'scale-100 opacity-100 bg-slate-900/95 ring-4 ring-cyan-500/30 border-cyan-400 shadow-2xl shadow-cyan-500/20 z-20'
                      : hasPassed
                      ? 'scale-[0.96] opacity-80 bg-slate-900/60 border-slate-800 hover:opacity-100 z-10'
                      : 'scale-90 opacity-30 bg-slate-950/40 border-slate-900 pointer-events-none z-0'
                  }`}
                >
                  {/* Glowing progress accent strip on top of card */}
                  {isCurrentlyActive && (
                    <div
                      className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400"
                      style={{
                        width: `${stepProgress}%`,
                        transition: 'width 0.1s linear'
                      }}
                    />
                  )}

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col">
                    
                    {/* Header bar: Stage Badge, Title, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${stage.accentBg} ${stage.accentText} ${stage.accentBorder}`}>
                            {stage.badge}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            0{stage.id} of 07
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
                          {stage.title}
                          {isCurrentlyActive && (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </h2>
                      </div>

                      {/* Active Status Chip */}
                      <div className="flex items-center gap-2">
                        {isCurrentlyActive ? (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            {isSpeaking ? 'SPEAKING' : stagePostPause ? 'PACING' : 'ACTIVE'} ({Math.round(stepProgress)}%)
                          </div>
                        ) : hasPassed ? (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            COMPLETED
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-600 text-xs font-mono">
                            <Lock className="w-3 h-3" />
                            QUEUED
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subtitle & Description */}
                    <div>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {stage.description}
                      </p>
                    </div>

                    {/* STAGE-SPECIFIC INTERACTIVE CONTENT */}
                    {stage.key === 'INPUTS' && (
                      <div className="grid grid-cols-1 gap-2.5 pt-2 flex-1">
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                            <Smartphone className="w-4 h-4" />
                            Field Officer Mobile Capture
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-300">
                            {stage.inputs.slice(0, 3).map((inp, i) => (
                              <div key={i} className="flex justify-between border-b border-slate-900 pb-0.5">
                                <span className="text-slate-400">{inp.label}:</span>
                                <span className="font-mono text-cyan-200">{inp.detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                            <Monitor className="w-4 h-4" />
                            Supervisor Admin Ingestion
                          </div>
                          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center justify-between">
                            <span>Operator ID:</span>
                            <span className="text-emerald-400 font-bold">OFFICER-4491 (Online)</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage.key === 'PREPROCESSING' && (
                      <div className="grid grid-cols-2 gap-2 pt-2 flex-1 text-center text-xs font-mono">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500 mb-0.5">Raw Capture</div>
                          <div className="text-cyan-300 font-bold">Orientation Fix</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Matrix Desqueeze</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500 mb-0.5">Cropping</div>
                          <div className="text-indigo-300 font-bold">224 x 128 px</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">C & T Band Focus</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500 mb-0.5">Tensor Scale</div>
                          <div className="text-emerald-400 font-bold">Float32 Norm</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Mean / Std Dev</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500 mb-0.5">Vault Copy</div>
                          <div className="text-amber-400 font-bold">Forensic JPEG</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Evidence Archive</div>
                        </div>
                      </div>
                    )}

                    {stage.key === 'SENTINEL' && (
                      <div className="grid grid-cols-1 gap-2 pt-2 flex-1">
                        {stage.probes.map((probe, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-white">{probe.title}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{probe.desc}</div>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                              {probe.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {stage.key === 'DECISION_GATEWAY' && (
                      <div className="space-y-2.5 pt-2 flex-1 flex flex-col justify-center">
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                            <Network className="w-4 h-4 text-amber-400" />
                            Arbiter: Internet & Server Available?
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                            executionMode === 'ONLINE'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400'
                          }`}>
                            {executionMode === 'ONLINE' ? 'Branch: YES (Online Cloud)' : 'Branch: NO (Offline Edge)'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setExecutionMode('ONLINE');
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              executionMode === 'ONLINE'
                                ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20'
                                : 'bg-slate-950 border-slate-800 opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                              <Cloud className="w-3.5 h-3.5" />
                              YES: Online Execution
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Immediate REST API upload with central database sync.
                            </p>
                          </div>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setExecutionMode('OFFLINE');
                            }}
                            className={`p-3 rounded-xl border transition-all ${
                              executionMode === 'OFFLINE'
                                ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-500/20'
                                : 'bg-slate-950 border-slate-800 opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-1">
                              <HardDrive className="w-3.5 h-3.5" />
                              NO: Offline Execution
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              On-device air-gapped ONNX model with local queue.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {stage.key === 'INFERENCE' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 flex-1 text-center text-xs font-mono items-center">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Verdict</div>
                          <div className="text-rose-400 font-black text-sm mt-0.5">POSITIVE</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Dual Band Match</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Confidence</div>
                          <div className="text-cyan-300 font-black text-sm mt-0.5">96.4%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Delta-E = 14.8</div>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-[10px] text-slate-500">Latency</div>
                          <div className="text-emerald-400 font-black text-sm mt-0.5">38.6 ms</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Quantized Int8</div>
                        </div>
                      </div>
                    )}

                    {stage.key === 'STORAGE_SYNC' && (
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 pt-2 flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-purple-400 flex items-center gap-1.5">
                            <Fingerprint className="w-4 h-4" />
                            Forensic SHA-256 Digest
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Court Admissible
                          </span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] text-purple-200 break-all select-all">
                          9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                          <div>Sync Mode: <span className="text-white font-bold">{executionMode === 'ONLINE' ? 'Supabase REST' : 'SQLite WAL'}</span></div>
                          <div className="text-right">Conflict: <span className="text-emerald-400 font-bold">Idempotent</span></div>
                        </div>
                      </div>
                    )}

                    {stage.key === 'OUTPUTS' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 flex-1">
                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5" />
                            Field Officer (Tactical HUD)
                          </div>
                          <ul className="text-[10px] text-slate-300 space-y-0.5 list-disc list-inside">
                            <li>Instant Positive / Negative result</li>
                            <li>Confidence probability scores (96.4%)</li>
                            <li>Forensic QR verification code</li>
                          </ul>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                          <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                            <Monitor className="w-3.5 h-3.5" />
                            Supervisor (Web Portal)
                          </div>
                          <ul className="text-[10px] text-slate-300 space-y-0.5 list-disc list-inside">
                            <li>Real-time multi-officer registry</li>
                            <li>Interactive spatial heatmaps</li>
                            <li>1-Click SHA-256 tamper verification</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Bottom Status Ribbon */}
                    <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400 truncate max-w-[65%]">
                        State: <strong className="text-cyan-300">{stage.tensorPayload}</strong>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInspectStep(index);
                          setInspectorOpen(true);
                        }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                      >
                        Code & Logs <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* ANIMATED HORIZONTAL ARROW CONDUIT (Between Nodes) */}
                {index < HORIZONTAL_STAGES.length - 1 && (
                  <HorizontalArrowConduit
                    isUnlocked={index < currentStepIndex}
                    isCurrentlyShooting={index === currentStepIndex}
                    pulseProgress={stepProgress}
                    arrowLabel={
                      index === 3
                        ? executionMode === 'ONLINE'
                          ? 'YES (ONLINE)'
                          : 'NO (OFFLINE)'
                        : `STAGE 0${index + 1} -> 0${index + 2}`
                    }
                  />
                )}

              </React.Fragment>
            );
          })}
        </div>
      </main>

      {/* Technical Deep Dive Inspector Modal */}
      {inspectorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Technical Deep Dive: {HORIZONTAL_STAGES[selectedInspectStep].title}
                </h3>
              </div>
              <button
                onClick={() => setInspectorOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <div className="text-xs font-bold text-slate-300 font-mono mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Real-Time Daemon Event Stream
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300">
                  {HORIZONTAL_STAGES[selectedInspectStep].logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-300 font-mono mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Implementation Architecture Code
                </div>
                <pre className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-200/90 overflow-x-auto leading-relaxed">
                  {HORIZONTAL_STAGES[selectedInspectStep].codeSnippet}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setInspectorOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer Navigation Bar */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-3 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Smart India Hackathon 2026 • <strong>AURA-Edge AI Voice Narrated Architecture</strong>
          </div>
          <div className="font-mono text-[11px] text-slate-400 flex items-center gap-3">
            <span>Speech Lifecycle Synced</span>
            <span>•</span>
            <span>Word-by-Word Teleprompter</span>
            <span>•</span>
            <span>Laser Pulse Conduits</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">SHA-256 Validated</span>
          </div>
        </div>
      </footer>

    </div>
  );
}