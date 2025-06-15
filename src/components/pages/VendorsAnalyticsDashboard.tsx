import {FunctionComponent} from "react";
import {Box, Card, CardContent, Grid, Typography, Button} from "@mui/material";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
} from "recharts";

import {Download} from "lucide-react";

interface VendorsAnalyticsDashboardProps {}

// بيانات وهمية
const trafficData = [
	{day: "01", visits: 120},
	{day: "02", visits: 180},
	{day: "03", visits: 250},
	{day: "04", visits: 300},
	{day: "05", visits: 220},
	{day: "06", visits: 400},
	{day: "07", visits: 370},
];

const sourceData = [
	{name: "Google", value: 400},
	{name: "Facebook", value: 300},
	{name: "Instagram", value: 200},
	{name: "Direct", value: 100},
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const VendorsAnalyticsDashboard: FunctionComponent<
	VendorsAnalyticsDashboardProps
> = () => {
	return (
		<Box my={5} textAlign='center'>
			<Typography variant='h4' gutterBottom color='primary'>
				تحليلات شهرية متقدمة لأداء الصفحة
			</Typography>

			{/* KPIs */}
			<Grid container spacing={3} mb={4}>
				{[
					{label: "عدد الزوار", value: "4,320"},
					{label: "المدة المتوسطة (دقائق)", value: "3.8"},
					{label: "معدل الارتداد", value: "28%"},
				].map((item, index) => (
					<Grid size={{xs: 12, md: 4}} key={index}>
						<Card>
							<CardContent>
								<Typography variant='h6'>{item.label}</Typography>
								<Typography variant='h4'>{item.value}</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* المخطط البياني */}
			<Grid container spacing={4}>
				<Grid size={{xs: 12, md: 8}}>
					<Card>
						<CardContent>
							<Typography variant='h6' mb={2}>
								زيارات الصفحة خلال الأسبوع
							</Typography>
							<ResponsiveContainer width='100%' height={250}>
								<LineChart data={trafficData}>
									<CartesianGrid strokeDasharray='6 6' />
									<XAxis dataKey='day' />
									<YAxis />
									<Tooltip />
									<Line
										type='monotone'
										dataKey='visits'
										stroke='#1b11a1'
										strokeWidth={3}
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>

				{/* Pie Chart */}
				<Grid size={{xs: 12, md: 4}}>
					<Card>
						<CardContent>
							<Typography variant='h6' mb={2}>
								مصادر الزيارات
							</Typography>
							<ResponsiveContainer width='100%' height={250}>
								<PieChart>
									<Pie
										data={sourceData}
										dataKey='value'
										nameKey='name'
										cx='50%'
										cy='50%'
										outerRadius={80}
										label
									>
										{sourceData.map((_, index) => (
											<Cell
												key={`cell-${index}`}
												fill={COLORS[index % COLORS.length]}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* زر التقرير الشهري */}
			<Box textAlign='center' mt={5}>
				<Button variant='contained' color='primary' startIcon={<Download />}>
					تنزيل التقرير الشهري (PDF)
				</Button>
			</Box>
		</Box>
	);
};

export default VendorsAnalyticsDashboard;
