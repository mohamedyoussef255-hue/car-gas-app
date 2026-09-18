import { PlatformMasterSettings, FuelPricing, FeasibilityDefaults, CargasCenterItem, CylinderSpecItem, ConversionSystemItem } from '../types';

export const DEFAULT_FUEL_PRICING: FuelPricing = {
  cngPrice: 7.00, // EGP per m³
  gasoline80Price: 13.75, // EGP per Liter
  gasoline92Price: 15.25, // EGP per Liter
  gasoline95Price: 17.00, // EGP per Liter
  dieselPrice: 13.50, // EGP per Liter
  lastUpdated: new Date().toISOString(),
};

export const DEFAULT_FEASIBILITY_SETTINGS: FeasibilityDefaults = {
  capexCompressors: 6500000,
  capexCascades: 2400000,
  capexDispensers: 1800000,
  capexGasPipeline: 2200000,
  capexCivilAndCanopy: 3800000,
  capexConversionCenter: 1500000,
  capexPermitsAndSafety: 900000,
  opexElectricityAnnual: 950000,
  opexMaintenanceAnnual: 680000,
  opexLaborAnnual: 840000,
  opexInsuranceAndAdmin: 420000,
  cngProfitMarginPerM3: 1.50,
  captureRatePercent: 5.5,
  conversionNetMarginPerCar: 2200,
  monthlyConversionsCount: 45,
  discountRatePercent: 14.0,
  operatingHoursPerDay: 18,
};

export const DEFAULT_CARGAS_CENTERS: CargasCenterItem[] = [
  {
    id: 'center-1',
    name: 'مركز كارجاس الرئيسي - ألماظة (القاهرة)',
    governorate: 'القاهرة',
    city: 'مصر الجديدة',
    address: 'شارع صلاح سالم، بجوار نادي الجلاء، مصر الجديدة',
    phone: '19614 / 0224185200',
    services: ['تحويل ملاكي وأجرة', 'فحص واختبار اسطوانات دوري بالماء المضغوط', 'صيانة أجهزة الحقن المتزامن'],
    hours: 'من 8:00 صباحاً حتى 8:00 مساءً (يومياً)',
    isActive: true,
  },
  {
    id: 'center-2',
    name: 'مركز كارجاس - غمرة والظاهر (القاهرة)',
    governorate: 'القاهرة',
    city: 'الظاهر',
    address: 'ميدان الظاهر، أمام محطة مترو غمرة',
    phone: '19614 / 0225936400',
    services: ['تحويل فوري للأجرة والتاكسي', 'تركيب اسطوانات 70 و 90 لتر', 'خدمات الضمان المعتمد'],
    hours: 'من 8:00 صباحاً حتى 9:00 مساءً',
    isActive: true,
  },
  {
    id: 'center-3',
    name: 'مركز كارجاس - المنيب ومجمع المواقف (الجيزة)',
    governorate: 'الجيزة',
    city: 'جنوب الجيزة',
    address: 'طريق مصر أسوان الزراعي، بجوار محطة مترو ومواقف المنيب',
    phone: '19614 / 0237748500',
    services: ['تحويل وصيانة ميكروباص وسوزوكي فان وبيجو ستيشن', 'فحص المرور الإلكتروني', 'مبيعات زيوت مخصصة للغاز'],
    hours: 'خدمة مستمرة 24 ساعة للتموين والصيانة الخفيفة',
    isActive: true,
  },
  {
    id: 'center-4',
    name: 'مركز كارجاس - الموقف الجديد بمحرم بك (الإسكندرية)',
    governorate: 'الإسكندرية',
    city: 'وسط الإسكندرية',
    address: 'طريق الموقف الجديد، محرم بك، الإسكندرية',
    phone: '19614 / 034951200',
    services: ['مركز متكامل للتحويل والفحص لشرق وغرب الإسكندرية', 'كشف أعطال بالكمبيوتر وضبط المحركات'],
    hours: 'من 8:30 صباحاً حتى 7:30 مساءً',
    isActive: true,
  },
  {
    id: 'center-5',
    name: 'مركز كارجاس - طنطا واستاد طنطا (الغربية)',
    governorate: 'الغربية',
    city: 'طنطا',
    address: 'شارع الجيش، مدخل طنطا، أمام استاد طنطا الرياضي',
    phone: '19614 / 0403328100',
    services: ['خدمة أساطيل الدلتا والميكروباص الإقليمي', 'إصدار شهادات فحص المرور المعتمدة'],
    hours: 'من 9:00 صباحاً حتى 6:00 مساءً',
    isActive: true,
  },
  {
    id: 'center-6',
    name: 'مركز كارجاس - مدينة نصر والحي العاشر (القاهرة)',
    governorate: 'القاهرة',
    city: 'مدينة نصر',
    address: 'امتداد مصطفى النحاس، تقاطع الحي العاشر ومحور الوفاء والأمل',
    phone: '19614 / 0224719000',
    services: ['تحويل ملاكي ونقل ذكي (أوبر/كريم)', 'استبدال اسطوانات قديمة', 'تقسيط بدون فوائد'],
    hours: 'من 8:30 صباحاً حتى 8:30 مساءً',
    isActive: true,
  },
];

export const DEFAULT_CYLINDER_SPECS: CylinderSpecItem[] = [
  {
    id: 'cyl-1',
    name: 'اسطوانات النوع الأول (Type 1 - Steel)',
    material: 'صلب غير ملحوم بالكامل (Seamless Chromium-Molybdenum Steel)',
    specs: 'المعيار القياسي ISO 11439 و ECE R110',
    pressure: '200 بار تشغيل / 300 بار اختبار هيدروليكي',
    features: [
      'الأكثر انتشاراً في مصر بنسبة 85% لصلابتها العالية وملاءمتها للمناخ الحار',
      'عمر افتراضي تشغيلي يصل إلى 20 عاماً مع الفحص الدوري الإلزامي كل 3 سنوات',
      'تتحمل الصدمات الميكانيكية الشديدة وحوادث الاصطدام دون تشوه أو تسريب'
    ],
    suitable: 'سيارات الأجرة (التاكسي)، الميكروباص، السوزوكي فان، والملاكي اليومي',
    approxWeightKg: 65,
    capacityLiters: 70,
    equivalentCngM3: 15.5,
  },
  {
    id: 'cyl-2',
    name: 'اسطوانات النوع الثاني (Type 2 - Composite Hoop)',
    material: 'بطانة فولاذية رقيقة مقواة بألياف زجاجية محيطية (Hoop-Wrapped Glass Fiber)',
    specs: 'وزن أخف بنسبة 25-30% مقارنة بالصلب الكامل',
    pressure: '200 بار تشغيل / 300 بار اختبار',
    features: [
      'تخفيف وزن الحقيبة الخلفية بنسبة ملحوظة لمنع هبوط مؤخرة السيارة',
      'كفاءة حرارية وعزل ممتاز بفضل غلاف الألياف المركبة',
      'مثالية للسيارات الصغيرة والمتوسطة للمحافظة على نظام التعليق الخلفي'
    ],
    suitable: 'سيارات الملاكي الحديثة والشاحنات الخفيفة وسيارات النقل الذكي',
    approxWeightKg: 48,
    capacityLiters: 70,
    equivalentCngM3: 15.5,
  },
  {
    id: 'cyl-3',
    name: 'اسطوانات النوع الثالث والرابع (Type 3 / 4 Composite)',
    material: 'بطانة ألومنيوم أو بوليمر كربوني خفيف (Carbon Fiber Fully Wrapped)',
    specs: 'وزن فائق الخفة (أخف بنسبة 60-70% من الصلب التقليدي)',
    pressure: '200 إلى 250 بار تشغيل',
    features: [
      'أعلى مستوى تكنولوجي عالمي وأخف وزناً على الإطلاق',
      'مقاومة تامة للتآكل والصدأ الداخلي والخارجي',
      'معتمدة في الحافلات الكبرى وسيارات الهايبرد والشاحنات الثقيلة'
    ],
    suitable: 'المركبات التجارية الحديثة، الأتوبيسات النقل العام، وأساطيل النقل السريع',
    approxWeightKg: 28,
    capacityLiters: 90,
    equivalentCngM3: 20.0,
  },
];

export const DEFAULT_CONVERSION_SYSTEMS: ConversionSystemItem[] = [
  {
    id: 'sys-1',
    name: 'نظام الحقن المتزامن الإلكتروني (Sequential Multipoint Injection)',
    generation: 'الجيل الرابع (4th Gen Sequential)',
    technology: 'وحدة تحكم إلكترونية (ECU) مبرمجة لقراءة إشارات رشاشات البنزين بدقة أجزاء من الثانية',
    suitableVehicles: 'محركات البنزين الحديثة بنظام الحقن المتعدد (MPI) ومختلف سعات المحرك (1000cc - 2500cc)',
    features: [
      'تحويل أوتوماتيكي ذكي بين البنزين والغاز دون شعور السائق بأي اهتزاز',
      'انعدام فاقد القدرة والعزم بنسبة تصل إلى 97% مقارنة بالبنزين',
      'حساسات أمان متعددة تقطع تدفق الغاز فوراً في حالة توقف المحرك أو الحوادث'
    ],
    avgKitPriceEgp: 14500,
    warrantyYears: 3,
  },
  {
    id: 'sys-2',
    name: 'نظام الحقن المباشر للمحركات التوربينية (Direct Injection GDI / TSI)',
    generation: 'الجيل الخامس والسادس (5th/6th Gen GDI)',
    technology: 'حقن خليط الغاز بنسبة 90% مع حقن 10% بنزين لحماية وتبريد رشاشات البنزين المباشرة داخل غرفة الاحتراق',
    suitableVehicles: 'السيارات الأوروبية واليابانية والكورية الحديثة ذات المحركات التربو (TSI, GDI, EcoBoost, Turbo)',
    features: [
      'حماية محركات التربو الحديثة من فرط حرارة الصمامات والرشاشات',
      'تسارع استثنائي ومحافظة تامة على الأداء الرياضي للمركبة',
      'توفير في الوقود يصل إلى 55% مقارنة ببنزين 95 مرتفع التكلفة'
    ],
    avgKitPriceEgp: 18500,
    warrantyYears: 3,
  },
  {
    id: 'sys-3',
    name: 'نظام الكربراتير والحقن الأحادي (Carburetor & Mono-Jetronic)',
    generation: 'الجيل الثاني والثالث التقليدي',
    technology: 'خلاط ميكانيكي (Mixer) مع مخفض ضغط ومحبس كهربائي ذو تدفق هوائي',
    suitableVehicles: 'سيارات الأجرة القديمة والبيجو الستيشن وسيارات الثمانينات والتسعينات',
    features: [
      'تكلفة تحويل وصيانة اقتصادية وفي متناول الجميع',
      'قطع غيار متوفرة ومقاومة عالية لظروف التشغيل الشاقة',
      'مفتاح تحويل يدوي مع مبين رقمي لمستوى الغاز بالصالون'
    ],
    avgKitPriceEgp: 11500,
    warrantyYears: 2,
  },
];

export const DEFAULT_PLATFORM_SETTINGS: PlatformMasterSettings = {
  pricing: DEFAULT_FUEL_PRICING,
  feasibility: DEFAULT_FEASIBILITY_SETTINGS,
  centers: DEFAULT_CARGAS_CENTERS,
  cylinders: DEFAULT_CYLINDER_SPECS,
  systems: DEFAULT_CONVERSION_SYSTEMS,
  general: {
    companyName: 'الشركة المصرية الدولية لتكنولوجيا الغاز (كارجاس - CARGAS)',
    hotline: '19614',
    defaultSurveyorName: 'م. أحمد الشناوي',
  },
};

const STORAGE_KEY = 'cargas_unified_settings_v1';

export function loadPlatformSettings(): PlatformMasterSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with defaults in case of missing keys
      return {
        ...DEFAULT_PLATFORM_SETTINGS,
        ...parsed,
        pricing: { ...DEFAULT_PLATFORM_SETTINGS.pricing, ...(parsed.pricing || {}) },
        feasibility: { ...DEFAULT_PLATFORM_SETTINGS.feasibility, ...(parsed.feasibility || {}) },
        general: { ...DEFAULT_PLATFORM_SETTINGS.general, ...(parsed.general || {}) },
        centers: Array.isArray(parsed.centers) && parsed.centers.length > 0 ? parsed.centers : DEFAULT_CARGAS_CENTERS,
        cylinders: Array.isArray(parsed.cylinders) && parsed.cylinders.length > 0 ? parsed.cylinders : DEFAULT_CYLINDER_SPECS,
        systems: Array.isArray(parsed.systems) && parsed.systems.length > 0 ? parsed.systems : DEFAULT_CONVERSION_SYSTEMS,
      };
    }
  } catch (e) {
    console.error('Error loading settings from localStorage', e);
  }
  return DEFAULT_PLATFORM_SETTINGS;
}

export function savePlatformSettings(settings: PlatformMasterSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
}
