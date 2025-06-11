import {
	Container,
	Typography,
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
} from "@mui/material";
import {FunctionComponent} from "react";
import {
	PrivacyTip,
	DataUsage,
	Security,
	AccountCircle,
	Email,
	Edit,
} from "@mui/icons-material";

const PrivacyPolicy: FunctionComponent = () => {
	const policySections = [
		{
			title: "المعلومات التي نجمعها",
			icon: <DataUsage />,
			items: [
				"معلومات الحساب (الاسم، البريد الإلكتروني، رقم الهاتف، الصورة الشخصية اختياريًا)",
				"بيانات الاستخدام (نوع الخدمات المستخدمة، مدة التصفح، التفضيلات)",
				"معلومات الدفع (عبر بوابات آمنة معتمدة مثل PayFort أو Apple Pay، لا نخزن بيانات البطاقة )",
				"البيانات الفنية (عنوان IP، نوع المتصفح، إعدادات اللغة)",
			],
		},
		{
			title: "كيف نستخدم البيانات",
			icon: <AccountCircle />,
			items: [
				"تحسين وتخصيص تجربة المستخدم",
				"تقديم دعم فني أفضل وحل المشكلات",
				"إرسال تحديثات مهمة أو عروض خاصة (بموافقتك)",
				"تحليل أداء المنصة وإجراء التحسينات",
				"الامتثال للالتزامات القانونية",
			],
		},
		{
			title: "حماية المعلومات",
			icon: <Security />,
			items: [
				"تشفير البيانات أثناء النقل باستخدام بروتوكولات TLS/SSL",
				"تخزين آمن وفقًا لمعايير PCI DSS لبيانات الدفع",
				"وصول مقيد للموظفين المصرح لهم فقط",
				"مراجعات أمنية دورية للنظام",
			],
		},
		{
			title: "حقوقك",
			icon: <Edit />,
			items: [
				"طلب نسخة من بياناتك الشخصية",
				"طلب تصحيح المعلومات غير الدقيقة",
				"طلب حذف بياناتك الشخصية (مع مراعاة القيود القانونية)",
				"إلغاء الاشتراك من الرسائل الترويجية",
				"سحب الموافقة على معالجة البيانات",
			],
		},
		{
			title: "مشاركة البيانات مع أطراف ثالثة",
			icon: <PrivacyTip />,
			items: [
				"مقدمي خدمات الدفع المعتمدين فقط",
				"شركاء الخدمة الضروريون لتشغيل المنصة",
				"الجهات الحكومية عند الضرورة القانونية",
				"لا نبيع بياناتك لأطراف تسويقية خارجية",
			],
		},
	];

	return (
		<Container maxWidth='md' sx={{py: 5}}>
			<Box
				sx={{
					borderRadius: 4,
					padding: {xs: 3, md: 4},
					boxShadow: 3,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Typography
					variant='h4'
					gutterBottom
					textAlign='center'
					sx={{fontWeight: "bold", color: "primary.main"}}
				>
					<PrivacyTip sx={{verticalAlign: "middle", mr: 1}} />
					سياسة الخصوصية لمنصة أفراحنا
				</Typography>

				<Divider sx={{my: 3}} />

				<Typography variant='body1' sx={{mb: 4, lineHeight: 1.8}}>
					نحن في منصة أفراحنا نعتبر خصوصيتك أمرًا بالغ الأهمية. تحدد هذه السياسة
					كيفية جمعنا واستخدامنا ومشاركتنا وحماية معلوماتك الشخصية. باستخدامك
					لمنصتنا، فإنك توافق على جمع واستخدام المعلومات وفقًا لهذه السياسة.
				</Typography>

				<List>
					{policySections.map((section, index) => (
						<Box key={index} sx={{mb: 4}}>
							<ListItem disableGutters>
								<ListItemIcon sx={{minWidth: 40, color: "primary.main"}}>
									{section.icon}
								</ListItemIcon>
								<Typography variant='h6' sx={{fontWeight: "bold"}}>
									{section.title}
								</Typography>
							</ListItem>

							<List dense sx={{pl: 6}}>
								{section.items.map((item, itemIndex) => (
									<ListItem
										key={itemIndex}
										disableGutters
										sx={{alignItems: "flex-start"}}
									>
										<ListItemIcon sx={{minWidth: 24, mt: 0.5}}>
											<span style={{color: "text.secondary"}}>
												•
											</span>
										</ListItemIcon>
										<Typography variant='body1' component='span'>
											{item}
										</Typography>
									</ListItem>
								))}
							</List>

							{index < policySections.length - 1 && (
								<Divider sx={{my: 2}} />
							)}
						</Box>
					))}
				</List>

				<Typography variant='h6' gutterBottom sx={{mt: 3, fontWeight: "bold"}}>
					<Email sx={{verticalAlign: "middle", mr: 1}} />
					التواصل معنا
				</Typography>
				<Typography variant='body1'>
					لطرح أي استفسارات حول سياسة الخصوصية أو ممارسات البيانات الخاصة بنا،
					يرجى التواصل معنا عبر:
				</Typography>
				<Typography variant='body1' sx={{pl: 4}}>
					• البريد الإلكتروني: <strong>privacy@afra7na.com</strong>
					<br />• الهاتف: <strong>0500000000</strong> (من 8 صباحًا إلى 8 مساءً)
					<br />• العنوان: ام الفحم اسرائيل
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{
						mt: 4,
						fontStyle: "italic",
						borderTop: "1px dashed",
						borderColor: "divider",
						pt: 2,
					}}
				>
					تم آخر تحديث لهذه السياسة في 27.5.2025. نحتفظ بالحق في تعديل هذه
					السياسة، وسننشر أي تغييرات على هذه الصفحة مع تحديث تاريخ المراجعة.
				</Typography>
			</Box>
		</Container>
	);
};

export default PrivacyPolicy;
