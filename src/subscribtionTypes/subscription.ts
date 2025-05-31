export const subscriptionPlans = [
	{
		id: "free",
		name: "الباقة التجريبية",
		price: "مجاني للأبد",
		features: [
			{text: "صفحة تعريفية", included: true},
			{text: "عرض صورة واحده", included: true},
			{text: "عرض خدمه فرعيه واحدة", included: true},
			{text: "ظهور في دليل الخدمات", included: true},
			{
				text: "إحصاءات أو تحليلات",
				included: false,
				tooltip: "متاح فقط في الباقات المدفوعة",
			},
			{
				text: "دعم فني مباشر",
				included: false,
				tooltip: "متاح فقط في الباقات المدفوعة",
			},
		],
		description: "الحل الأمثل للبدء بعرض خدمتك بشكل أساسي",
	},
	{
		id: "basic",
		name: "الباقة الفضية ✨",
		price: "59 شيكل/شهر",
		features: [
			{text: "عرض 5 صور عالية الجودة", included: true},
			{text: "عرض 6 خدمات فرعية مفصلة", included: true},
			{text: "ظهور محسن في نتائج البحث", included: true},
			{text: "استفسارات العملاء عبر الهاتف والبريد", included: true},
			{text: "إحصاءات مشاهدات أساسية", included: true},
			{text: "دعم عبر البريد خلال أيام العمل", included: true},
			// {text: "ربط حسابات التواصل الاجتماعي", included: true},
			{
				text: "نظام حجز مواعيد",
				included: false,
				tooltip: "متاح في الباقة الذهبية فما فوق",
			},
		],
		description: "للأعمال الصغيرة التي تريد تطوير وجودها الرقمي",
	},
	{
		id: "gold",
		name: "الباقة الذهبية 🌟",
		price: "99 شيكل/شهر",
		features: [
			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
			{text: "صور غير محدودة", included: true},
			{text: "إضافة حتى 40 فيديو", included: true},
			{text: "خدمات فرعية غير محدودة", included: true},
			{text: "شارة 'موصى به'", included: true},
			{text: "قنوات تواصل متعددة", included: true},
			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
			{text: "نظام إدارة مواعيد متكامل", included: true},
			{text: "دعم سريع على الهاتف والبريد", included: true},
			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},
			{
				text: "إعلانات تلقائية",
				included: false,
				tooltip: "متاحة في الباقة الماسية",
			},
		],
		recommended: true,
		description: "الحل الشامل للعروض الاحترافية والتميز في السوق",
	},
	{
		id: "premium",
		name: "الباقة الماسية 👑",
		price: "189 شيكل/شهر",
		features: [
			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
			{text: "صور غير محدودة", included: true},
			{text: "إضافة حتى 60 فيديو", included: true},
			{text: "خدمات فرعية غير محدودة", included: true},
			{text: "شارة 'موصى به'", included: true},
			{text: "قنوات تواصل متعددة", included: true},
			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
			{text: "نظام إدارة مواعيد متكامل", included: true},
			{text: "دعم سريع على الهاتف والبريد", included: true},
			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},

			{text: "إعلانات تلقائية في الصفحة الرئيسية", included: true},
			{text: "ظهور دائم في الصفحة الرئيسية", included: true},
			{text: "تقارير أداء شهرية مخصصة", included: true},
			{text: "دعم فني فوري بأولوية عليا", included: true},
			{text: "شهادة 'مزود موثوق' ووسام تميز", included: true},
			{
				text: "إدارة متعددة للحسابات",
				included: false,
				tooltip: "متاحة في باقة المؤسسات",
			},
		],
		description: "للأعمال الرائدة التي تريد التميز والظهور الدائم",
	},
	{
		id: "enterprise",
		name: "باقة المؤسسات والوكالات 🌐",
		price: "تواصل معنا",
		features: [
			{text: "صفحة احترافية مخصصة مع الشعار", included: true},
			{text: "صور غير محدودة", included: true},
			{text: "إضافة حتى 20 فيديو", included: true},
			{text: "خدمات فرعية غير محدودة", included: true},
			{text: "شارة 'موصى به'", included: true},
			{text: "قنوات تواصل متعددة", included: true},
			{text: "تحليلات متقدمة لأداء الصفحة", included: true},
			{text: "نظام إدارة مواعيد متكامل", included: true},
			{text: "دعم سريع على الهاتف والبريد", included: true},
			{text: "تضمين مقاطع إنستغرام وتيك توك", included: true},

			{text: "إعلانات تلقائية في الصفحة الرئيسية", included: true},
			{text: "ظهور دائم في الصفحة الرئيسية", included: true},
			{text: "تقارير أداء شهرية مخصصة", included: true},
			{text: "دعم فني فوري بأولوية عليا", included: true},
			{text: "شهادة 'مزود موثوق' ووسام تميز", included: true},
			{text: "إدارة متعددة للحسابات والمواقع", included: true},
			{text: "تكامل مخصص مع أنظمة خارجية", included: true},
			{text: "مدير حساب مخصص", included: true},
			{text: "دعم فني مباشر 24/7", included: true},
			{text: "تدريب وورش عمل للفريق", included: true},
			{text: "استراتيجيات تسويق مخصصة", included: true},
		],
		description: "حلول متكاملة للشركات الكبيرة والوكالات",
	},
];

export const subscriptionDetails = {
	colors: {
		free: "#f5f5f5",
		basic: "#c0c0c0",
		gold: "#ffd700",
		premium: "#b9f2ff",
		enterprise: "#a7c7e7",
	},
	featuresCategories: {
		profile: "الملف التعريفي",
		media: "الوسائط",
		services: "الخدمات",
		visibility: "الظهور",
		communication: "التواصل",
		analytics: "التحليلات",
		support: "الدعم",
		marketing: "التسويق",
	},
};
export const subscriptionColor = (plans: string) => {
	switch (plans) {
		case "free":
			return "#00000029";
		case "basic":
			return "silver-bg";
		case "gold":
			return "gold-bg";
		case "premium":
			return "premium-bg";
		case "enterprise":
			return "enterprise-bg";
		default:
			return "#00000029";
	}
};

export const getVisibleServices = (
	planId: string,
	services: {
		id?: string;
		featureName: string;
		price: number;
	}[],
) => {
	switch (planId) {
		case "basic":
			return services.slice(0, 6);
		case "gold":
			return services.slice(0, 13);
		case "premium":
			return services;
		case "enterprise":
			return services;
		default:
			return services.slice(0, 1);
	}
};
