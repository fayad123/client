import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Container,
	Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {FunctionComponent} from "react";
import HorizontalDevider from "../../atoms/customDeviders/HorizontalDevider";
import theme from "../../assets/theme";

const faqs = [
	{
		question: "كيف يمكنني حجز خدمة من المنصة؟",
		answer: "قم بتصفح الفئات، اختر الخدمة المناسبة، ثم اضغط على 'احجز الآن' واتبع التعليمات لإتمام الحجز.",
	},
	{
		question: "هل أحتاج إلى إنشاء حساب لإجراء حجز؟",
		answer: "نعم، يجب تسجيل الدخول بحسابك حتى نتمكن من ربط الحجوزات بك وتوفير الدعم المناسب.",
	},
	{
		question: "هل يمكنني إلغاء الحجز بعد الدفع؟",
		answer: "نعم، لكن حسب سياسة مقدم الخدمة. بعض الخدمات قابلة للإلغاء مع استرداد جزئي أو كامل خلال مدة محددة.",
	},
	{
		question: "ما طرق الدفع المتاحة؟",
		answer: "نقبل الدفع عبر بطاقات الائتمان، Apple Pay، STC Pay، والتحويل البنكي لبعض الخطط.",
	},
	{
		question: "كيف يمكنني التواصل مع مزود الخدمة؟",
		answer: "بعد الحجز، يظهر لك زر 'راسل المزود' في صفحة الحجز الخاصة بك. يمكنك التواصل مباشرة.",
	},
];

interface FAQPageProps {}

const FAQPage: FunctionComponent<FAQPageProps> = () => {
	return (
		<Container maxWidth='md' sx={{py: 5}}>
			<Typography
				sx={{
					textAlign: "center",
					fontWeight: "bold",
					color: theme.palette.primary.main,
					mt: 10,
				}}
				variant='h4'
				align='center'
				gutterBottom
				color='primary'
			>
				الاسـئـلـه الـشـائـعـه
			</Typography>
			<HorizontalDevider />
			<Box
				sx={{
					backgroundColor: "background.paper",
					borderRadius: 3,
					p: 4,
					boxShadow: 3,
					mt: 5,
				}}
			>
				{faqs.map((faq, index) => (
					<Accordion key={index} sx={{mb: 2}}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant='subtitle1' fontWeight='bold'>
								{faq.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant='body1'>{faq.answer}</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Container>
	);
};

export default FAQPage;
