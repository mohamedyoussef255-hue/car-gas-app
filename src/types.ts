export type VehicleType = 
  | 'private'          // ملاكي
  | 'microbus'         // اجرة ميكروباص
  | 'taxi'             // اجرة تاكسي
  | 'suzuki_van'       // سوزوكي فان
  | 'peugeot_station'; // بيجو ستيشن

export interface VehicleConfig {
  type: VehicleType;
  label: string;
  subLabel: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  dailyAvgKm: number;
  monthlySavingsEgp: number;
  cngSuitability: 'مرتفعة جداً' | 'مرتفعة' | 'متوسطة';
  description: string;
  shortcutKey: string;
}

export const VEHICLE_TYPES: Record<VehicleType, VehicleConfig> = {
  private: {
    type: 'private',
    label: 'ملاكي',
    subLabel: 'سيارات ركوب خاصة',
    badgeBg: 'bg-blue-500/20',
    badgeText: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    accentColor: '#3b82f6',
    dailyAvgKm: 35,
    monthlySavingsEgp: 1850,
    cngSuitability: 'متوسطة',
    description: 'سيارات الصالون والركوب الشخصي مع متوسط استهلاك وقود منزلي',
    shortcutKey: '1',
  },
  microbus: {
    type: 'microbus',
    label: 'أجرة ميكروباص',
    subLabel: 'نقل جماعي 14 راكب',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    accentColor: '#10b981',
    dailyAvgKm: 220,
    monthlySavingsEgp: 9400,
    cngSuitability: 'مرتفعة جداً',
    description: 'ميكروباصات نقل الخطوط الداخلية وبين الأقاليم (أولوية قصوى للغاز)',
    shortcutKey: '2',
  },
  taxi: {
    type: 'taxi',
    label: 'أجرة تاكسي',
    subLabel: 'تاكسي أبيض / أجرة عاصمة',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    accentColor: '#f59e0b',
    dailyAvgKm: 180,
    monthlySavingsEgp: 7800,
    cngSuitability: 'مرتفعة جداً',
    description: 'سيارات التاكسي الأجرة التي تقطع مسافات تشغيل يومية مكثفة',
    shortcutKey: '3',
  },
  suzuki_van: {
    type: 'suzuki_van',
    label: 'سوزوكي فان',
    subLabel: 'فان 7 راكب / تمنية',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    accentColor: '#a855f7',
    dailyAvgKm: 160,
    monthlySavingsEgp: 6500,
    cngSuitability: 'مرتفعة جداً',
    description: 'سيارات الميني فان السوزوكي والشيفروليه N300 لنقل الركاب بالمدن',
    shortcutKey: '4',
  },
  peugeot_station: {
    type: 'peugeot_station',
    label: 'بيجو ستيشن',
    subLabel: 'ستيشن 7 راكب بين المحافظات',
    badgeBg: 'bg-rose-500/20',
    badgeText: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    accentColor: '#f43f5e',
    dailyAvgKm: 280,
    monthlySavingsEgp: 11200,
    cngSuitability: 'مرتفعة جداً',
    description: 'سيارات بيجو 504 و505 ستيشن سقف طويل لخطوط السفر والأقاليم',
    shortcutKey: '5',
  },
};

export interface DetectionRecord {
  id: string;
  sessionId: string;
  timestamp: string;
  timeDisplay: string;
  vehicleType: VehicleType;
  confidence: number;
  method: 'camera_ai' | 'manual_tap' | 'motion_sensor';
  description?: string;
  snapshotUrl?: string;
}

export interface MonitoringSession {
  id: string;
  code: string;
  title: string;
  locationName: string;
  governorate: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearestStation: string;
  trafficDirection: string;
  surveyorName: string;
  status: 'active' | 'completed' | 'paused';
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  counts: Record<VehicleType, number>;
  detections: DetectionRecord[];
  notes?: string;
  // Geolocation & Auto GPS tracking metadata
  gpsAccuracyMeters?: number;
  elevationMeters?: number;
  autoGpsCaptured?: boolean;
  gpsCaptureTimestamp?: string;
  // Department reviews and site evaluations
  departmentReviews?: Record<string, DepartmentReview>;
  customIndicators?: CustomFeasibilityIndicator[];
  customCostItems?: CustomCostItem[];
  safetyZoning?: SafetyZoningRequirement[];
  // Station Construction & Execution Phase Data (الموقف التنفيذي الإنشائي للمحطة)
  executionData?: StationExecutionData;
}

// Station Construction & Execution Phase
export type StationExecutionStatus = 
  | 'feasibility_approved' // معتمدة ومؤهلة للإنشاء
  | 'site_handover'        // تسليم الموقع وتجهيز الأرض
  | 'civil_works'          // الأعمال المدنية والإنشائية الجارية
  | 'equipment_supply'     // توريد وتركيب الضاغط والموزعات
  | 'safety_commissioning' // اختبارات الأمان والسلامة والغاز
  | 'operational';         // تم إطلاق الغاز والتشغيل التجاري

export type ExecutionCategory = 'civil' | 'equipment' | 'hse' | 'legal' | 'financial';

export interface ExecutionSubTask {
  id: string;
  title: string;
  completed: boolean;
  completionDate?: string;
  notes?: string;
}

export interface ExecutionWorkItem {
  id: string;
  category: ExecutionCategory;
  departmentName: string;
  title: string;
  description: string;
  weightPercent: number; // الوزن النسبي في إجمالي إنشاء المحطة
  progressPercent: number; // 0 - 100
  status: 'not_started' | 'in_progress' | 'inspection' | 'completed' | 'delayed';
  startDate: string;
  targetEndDate: string;
  actualEndDate?: string;
  assignedEngineer: string;
  contractorName?: string;
  estimatedCostEgp: number;
  disbursedCostEgp: number;
  subTasks: ExecutionSubTask[];
  notes?: string;
}

export interface DailySiteLog {
  id: string;
  date: string; // YYYY-MM-DD
  reportType: 'daily' | 'weekly' | 'monthly' | 'milestone';
  recordedBy: string;
  residentEngineer: string;
  weatherAndSiteCondition: string;
  workforceCount: number; // عدد العمال والفنيين بالموقع
  equipmentOnSite: string; // المعدات المتواجدة بالموقع
  completedWorksToday: string;
  plannedWorksTomorrow: string;
  hseIndustrialSafetyStatus: string; // حالة الأمن الصناعي (مثال: صفر حوادث، التزام بالخوذات والسترات)
  delaysOrObstacles?: string;
  siteProgressSnapshotPercent: number; // نسبة الإنجاز في هذا التاريخ
  photosCount: number;
}

export interface StationExecutionData {
  executionStatus: StationExecutionStatus;
  kickoffDate: string;
  targetHandoverDate: string;
  actualHandoverDate?: string;
  contractorName: string;
  consultantEngineer: string;
  residentEngineer: string;
  overallProgressPercent: number;
  totalApprovedBudgetEgp: number;
  totalDisbursedBudgetEgp: number;
  workItems: ExecutionWorkItem[];
  dailyLogs: DailySiteLog[];
}

// Department review types
export type DepartmentType = 'projects' | 'hse' | 'operations' | 'legal' | 'financial';

export type DepartmentReviewDecision = 'approved' | 'rejected' | 'conditional' | 'deferred' | 'pending';

export interface DepartmentReviewAttachment {
  id: string;
  name: string;
  sizeBytes: number;
  type: 'pdf' | 'image' | 'word' | 'excel' | 'other';
  mimeType: string;
  uploadedAt: string;
  uploadedBy: string;
  dataUrl?: string; // base64 or blob URL
  notes?: string;
}

export interface DepartmentCustomField {
  id: string;
  department: DepartmentType;
  label: string;
  fieldType: 'number' | 'text' | 'select' | 'boolean';
  value: string | number | boolean;
  unit?: string;
  options?: string[];
  impactsCapex?: boolean;
  impactsOpex?: boolean;
  capexAmount?: number;
  opexAmount?: number;
  notes?: string;
}

export interface DepartmentReview {
  department: DepartmentType;
  departmentName: string;
  reviewerName: string;
  reviewDate: string;
  decision: DepartmentReviewDecision;
  justification: string;
  rejectionReasons?: string;
  detectedErrors?: string;
  attachments?: DepartmentReviewAttachment[];
  customFields: DepartmentCustomField[];
  costEstimates?: {
    civilCostEgp?: number;
    electricalCostEgp?: number;
    excavationCostEgp?: number;
    concreteCostEgp?: number;
    pipelineCostEgp?: number;
    compressorCostEgp?: number;
    dispenserCostEgp?: number;
    safetyEquipmentCostEgp?: number;
  };
  hseEvaluation?: {
    nfpa52Compliant: boolean;
    civilDefenseApproved: boolean;
    environmentalImpactApproved: boolean;
    blastWallRequired: boolean;
    emergencyShutdownZonesOk: boolean;
    gasDetectorsInstalled: boolean;
    minSafeDistanceMeters: number;
    actualDistanceMeters: number;
  };
  operationalSpecs?: {
    compressorCapacityM3h: number;
    inletGasPressureBar: number;
    storageCascadesWaterCapacityL: number;
    dispenserHosesCount: number;
    pipelineLengthMeters: number;
    requiredPowerKva: number;
  };
  legalReview?: {
    landTenureType: 'ownership' | 'long_term_lease' | 'usufruct' | 'concession';
    contractDurationYears: number;
    annualLeaseCostEgp: number;
    buildingPermitFeasible: boolean;
    zoningClearance: boolean;
    titleDeedVerified: boolean;
    disputeRiskLevel: 'low' | 'medium' | 'high';
  };
  financialAudit?: {
    totalCapexAudited: number;
    annualOpexAudited: number;
    npvAudited: number;
    irrAuditedPercent: number;
    paybackYearsAudited: number;
    roiAuditedPercent: number;
    auditStatus: 'approved' | 'enhance_required' | 'rejected';
    auditorNotes: string;
    identifiedErrors: string[];
    correctionLog?: Array<{
      parameter: string;
      originalValue: number | string;
      correctedValue: number | string;
      reason: string;
    }>;
  };
}

// Custom dynamic Feasibility Indicator
export interface CustomFeasibilityIndicator {
  id: string;
  name: string;
  category: 'financial' | 'technical' | 'operational' | 'safety';
  value: number | string;
  unit: string;
  targetBenchmark?: string;
  description: string;
  status: 'compliant' | 'warning' | 'critical' | 'neutral';
}

// Custom Cost Items (CAPEX & OPEX line items)
export interface CustomCostItem {
  id: string;
  name: string;
  department: DepartmentType;
  departmentName: string;
  costEgp: number;
  category: 'capex' | 'opex';
  notes?: string;
}

// Safety Zoning & Equipment Placement Requirements
export interface SafetyZoningRequirement {
  id: string;
  item: string;
  codeStandard: string; // e.g. "NFPA 52 / الكود المصري لمحطات الغاز"
  minRequiredDistanceMeters: number;
  actualDistanceMeters: number;
  equipmentZoned: string; // "الضاغط", "الحاويات الاسطوانية", "الطلمبات", "غرفة المولد"
  isCompliant: boolean;
  notes: string;
}

// Multi-Department Overall Site Investment Recommendation
export interface ExecutiveSiteRecommendation {
  overallVerdict: 'recommended_immediately' | 'conditional_approval' | 'rejected';
  verdictScorePercent: number;
  weights: {
    financial: number; // 35%
    technical: number; // 25%
    safetyHse: number; // 25%
    legal: number;     // 15%
  };
  financialScore: number;
  technicalScore: number;
  safetyScore: number;
  legalScore: number;
  executiveSummary: string;
  mandatoryPrerequisites: string[];
  identifiedRisks: string[];
  committeeDate: string;
}

export interface CNGStation {
  id: string;
  name: string;
  company: 'غازتك (Gastec)' | 'كارجاس (Cargas)' | 'ماستر جاس (MasterGas)' | 'طاقة غاز (Taqa Gas)' | 'الوطنية للغاز (ChillOut)';
  governorate: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  dispenserCount: number;
  hasConversionCenter: boolean;
  status: 'active' | 'maintenance';
}

export interface FeasibilityFinancialMetrics {
  totalCapex: number;
  annualOpex: number;
  dailyGasDispensedM3: number;
  annualGasDispensedM3: number;
  annualGasGrossProfit: number;
  annualConversionGrossProfit: number;
  annualAncillaryProfit: number;
  annualTotalRevenue: number;
  annualNetCashFlow: number;
  paybackPeriodYears: number;
  npv: number;
  irr: number;
  breakEvenDailyM3: number;
  tenYearCashFlows: Array<{
    year: number;
    cashInflow: number;
    cashOutflow: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
    discountedCashFlow: number;
  }>;
}

// Fuel & Energy Pricing
export interface FuelPricing {
  cngPrice: number; // EGP per m³
  gasoline80Price: number; // EGP per liter
  gasoline92Price: number; // EGP per liter
  gasoline95Price: number; // EGP per liter
  dieselPrice: number; // EGP per liter
  lastUpdated: string;
}

// Feasibility & CapEx/OpEx Master Defaults
export interface FeasibilityDefaults {
  capexCompressors: number;
  capexCascades: number;
  capexDispensers: number;
  capexGasPipeline: number;
  capexCivilAndCanopy: number;
  capexConversionCenter: number;
  capexPermitsAndSafety: number;
  opexElectricityAnnual: number;
  opexMaintenanceAnnual: number;
  opexLaborAnnual: number;
  opexInsuranceAndAdmin: number;
  cngProfitMarginPerM3: number;
  captureRatePercent: number;
  conversionNetMarginPerCar: number;
  monthlyConversionsCount: number;
  discountRatePercent: number;
  operatingHoursPerDay: number;
}

// Technical Guide Centers
export interface CargasCenterItem {
  id: string;
  name: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  services: string[];
  hours: string;
  isActive: boolean;
}

// Cylinder Technical Specs
export interface CylinderSpecItem {
  id: string;
  name: string;
  material: string;
  specs: string;
  pressure: string;
  features: string[];
  suitable: string;
  approxWeightKg: number;
  capacityLiters: number;
  equivalentCngM3: number;
}

// Conversion System Specs
export interface ConversionSystemItem {
  id: string;
  name: string;
  generation: string;
  technology: string;
  suitableVehicles: string;
  features: string[];
  avgKitPriceEgp: number;
  warrantyYears: number;
}

// Global Platform Master Settings
export interface PlatformMasterSettings {
  pricing: FuelPricing;
  feasibility: FeasibilityDefaults;
  centers: CargasCenterItem[];
  cylinders: CylinderSpecItem[];
  systems: ConversionSystemItem[];
  general: {
    companyName: string;
    hotline: string;
    defaultSurveyorName: string;
  };
}

// Query Filters for Inspected Locations
export interface LocationQueryFilter {
  searchQuery: string;
  governorate: string;
  minFlowPerHour: number;
  dominantVehicleType: 'all' | VehicleType;
  surveyor: string;
  status: 'all' | 'completed' | 'active';
  sortBy: 'totalVehicles' | 'flowRate' | 'cngDemand' | 'date' | 'microbusCount';
  sortOrder: 'desc' | 'asc';
}

// Historical Photo or Blueprint Document
export interface HistoricalPhotoItem {
  id: string;
  title: string;
  locationOrStationName: string;
  governorate: string;
  category: 'site_survey' | 'blueprint' | 'aerial_map' | 'construction' | 'opening';
  date: string;
  url: string; // base64 data url or image url
  description?: string;
  uploadedAt: string;
  fileSizeKb?: number;
}

// Company Station Census & Portfolio Item
export interface CompanyStationCensusItem {
  id: string;
  name: string;
  code: string;
  governorate: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  status: 'operational' | 'under_construction' | 'licensed_pending' | 'proposed' | 'expansion';
  dispenserCount: number;
  compressorCapacityM3h: number;
  commissioningYear: number;
  hasConversionCenter: boolean;
  annualVolumeM3?: number;
  investmentValueMillionEgp?: number;
  contractorOrPartner?: string;
  notes?: string;
}

