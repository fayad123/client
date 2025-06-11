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
	Gavel,
	Description,
	Rule,
	AccessTime,
	AccountCircle,
	Email,
} from "@mui/icons-material";

const TermsOfUse: FunctionComponent = () => {
	const termsSections = [
		{
			title: "الموافقة على الشروط",
			icon: <Gavel />,
			items: [
				"باستخدامك لمنصة أفراحنا، فإنك توافق على الالتزام بهذه الشروط.",
				"إذا لم توافق على أي جزء من الشروط، يجب عليك التوقف عن استخدام المنصة.",
			],
		},
		{
			title: "استخدام المنصة",
			icon: <Rule />,
			items: [
				"يجب استخدام المنصة فقط للأغراض القانونية والشخصية أو المهنية المشروعة.",
				"يُحظر نشر أو مشاركة أي محتوى مسيء، مضلل، غير قانوني أو ينتهك حقوق الآخرين.",
				"يُمنع استخدام المنصة في أي أنشطة احتيالية أو ضارة.",
			],
		},
		{
			title: "إنشاء الحسابات",
			icon: <AccountCircle />,
			items: [
				"يجب تقديم معلومات دقيقة وكاملة عند إنشاء الحساب.",
				"أنت مسؤول عن الحفاظ على سرية معلومات الدخول الخاصة بك.",
				"يجب الإبلاغ فورًا عن أي استخدام غير مصرح به لحسابك.",
			],
		},
		{
			title: "حقوق الملكية الفكرية",
			icon: <Description />,
			items: [
				"جميع الحقوق والملكية الفكرية في المنصة ومحتواها محفوظة لأفراحنا أو للمرخصين.",
				"يُمنع نسخ أو إعادة نشر أو استخدام أي جزء من المنصة دون إذن كتابي.",
			],
		},
		{
			title: "تعديل الشروط",
			icon: <AccessTime />,
			items: [
				"يحق لنا تعديل هذه الشروط في أي وقت وفقًا لتقديرنا.",
				"سندرج أي تحديث على هذه الصفحة مع تحديد تاريخ التعديل.",
				"يعتبر استمرارك في استخدام المنصة بعد التعديل موافقة على الشروط المحدثة.",
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
					<Gavel sx={{verticalAlign: "middle", mr: 1}} />
					شروط الاستخدام لمنصة أفراحنا
				</Typography>

				<Divider sx={{my: 3}} />

				<Typography variant='body1' sx={{mb: 4, lineHeight: 1.8}}>
					تهدف هذه الشروط إلى تنظيم استخدامك لمنصة أفراحنا وتحدد الحقوق
					والواجبات الخاصة بالمستخدمين. يرجى قراءتها بعناية قبل استخدامك للمنصة.
				</Typography>

				<List>
					{termsSections.map((section, index) => (
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

							{index < termsSections.length - 1 && <Divider sx={{my: 2}} />}
						</Box>
					))}
				</List>

				<Typography variant='h6' gutterBottom sx={{mt: 3, fontWeight: "bold"}}>
					<Email sx={{verticalAlign: "middle", mr: 1}} />
					التواصل معنا
				</Typography>
				<Typography variant='body1'>
					للاستفسارات أو الملاحظات بخصوص شروط الاستخدام، يرجى التواصل معنا عبر:
				</Typography>
				<Typography variant='body1' sx={{pl: 4}}>
					• البريد الإلكتروني: <strong>terms@afra7na.com</strong>
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
					تم آخر تحديث لشروط الاستخدام في 27.5.2025. نحتفظ بالحق في تعديل هذه
					الشروط في أي وقت وسننشر التحديثات على هذه الصفحة.
				</Typography>
			</Box>
		</Container>
	);
};

export default TermsOfUse;
