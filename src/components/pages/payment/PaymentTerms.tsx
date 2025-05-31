import {
	Box,
	Typography,
	Divider,
	Container,
	List,
	ListItem,
	ListItemIcon,
} from "@mui/material";
import {FunctionComponent} from "react";
import {
	CheckCircle,
	CreditCard,
	Autorenew,
	Security,
	Receipt,
	Help,
} from "@mui/icons-material";

const PaymentTerms: FunctionComponent = () => {
	const terms = [
		{
			title: "طرق الدفع المقبولة",
			icon: <CreditCard />,
			content:
				"نحن نقبل وسائل الدفع التالية: بطاقات الائتمان (Visa، MasterCard، Mada)، المحافظ الرقمية (Apple Pay، STC Pay)، والتحويل البنكي عند الطلب.",
		},
		{
			title: "الاشتراكات",
			icon: <Autorenew />,
			content:
				"يتم تجديد الاشتراك تلقائيًا في نهاية كل فترة ما لم يتم إلغاؤه قبل 24 ساعة من تاريخ التجديد. يمكن الإلغاء في أي وقت عبر صفحة الحساب.",
		},
		{
			title: "سياسة الاسترداد",
			icon: <Receipt />,
			content:
				"لن يتم استرداد أي مبلغ بعد بدء فترة الاشتراك. يرجى التواصل خلال 7 أيام في حال حدوث خطأ في الدفع. الاسترداد يكون خلال 14 يوم عمل.",
		},
		{
			title: "تأمين معلومات الدفع",
			icon: <Security />,
			content:
				"نستخدم تقنيات تشفير متقدمة (PCI DSS) لضمان أمان معلومات الدفع. لا يتم تخزين بيانات بطاقات الائتمان لدينا ونستخدم بوابات دفع معتمدة.",
		},
		{
			title: "الضرائب والتعديلات",
			icon: <CheckCircle />,
			content:
				"تضاف ضريبة القيمة المضافة (15%) حسب لوائح المملكة. نحتفظ بالحق في تعديل الأسعار مع إخطار مسبق قبل 30 يومًا من التطبيق.",
		},
		{
			title: "الدعم الفني",
			icon: <Help />,
			content:
				"للاستفسارات، راسلنا عبر support@yourdomain.com أو اتصل بنا على 920000000 من الساعة 8 صباحًا حتى 8 مساءً (بتوقيت الرياض).",
		},
	];

	return (
		<Container maxWidth='md' sx={{py: 5}}>
			<Box
				sx={{
					backgroundColor: "background.paper",
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
					sx={{fontWeight: "bold"}}
				>
					شروط وأحكام الدفع لمنصة افراحنا
				</Typography>
				<Divider sx={{my: 3}} />

				<Typography variant='body1' paragraph sx={{mb: 3, textAlign: "center"}}>
					آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
				</Typography>

				<List>
					{terms.map((term, index) => (
						<Box key={index} sx={{mb: 3}}>
							<ListItem disableGutters>
								<ListItemIcon sx={{minWidth: 40}}>
									{term.icon}
								</ListItemIcon>
								<Typography
									variant='h6'
									component='div'
									sx={{fontWeight: "bold"}}
								>
									{term.title}
								</Typography>
							</ListItem>
							<Typography variant='body1' paragraph sx={{pl: 6}}>
								{term.content}
							</Typography>
							{index < terms.length - 1 && <Divider sx={{my: 1}} />}
						</Box>
					))}
				</List>

				<Typography
					variant='body2'
					color='text.secondary'
					sx={{mt: 3, fontStyle: "italic"}}
				>
					ملاحظة: هذه الشروط قد تخضع للتغيير. يرجى مراجعة هذه الصفحة بشكل دوري
					للتأكد من أي تحديثات.
				</Typography>
			<Typography
				variant='body2'
				color='text.secondary'
				sx={{mt: 3, fontStyle: "italic", textAlign: "center"}}
			>
				لمزيد من المعلومات، يرجى مراجعة{" "}
				<a
					href='/privacy-policy'
          style={{color: "#1976d2", fontSize: "0.9rem"}}
				>
					سياسة الخصوصية
				</a>
				.
			</Typography>
			</Box>
		</Container>
	);
};

export default PaymentTerms;
