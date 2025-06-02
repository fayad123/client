import {FunctionComponent} from "react";
import {useUser} from "../../contextApi/useUserData";
import {Box, Button, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyBookings from "./vendorsPages/services/MyBookings";
import {subscriptionColor, subscriptionPlans} from "../../subscribtionTypes/subscription";
import {CheckCircleOutline} from "@mui/icons-material";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {user} = useUser();
	const navigate = useNavigate();

	const currentUser =
		(user && user.businessName) ||
		`${user && user.name?.first} ${user && user.name?.last}`;

	const currentPlan = subscriptionPlans.find((plan) => plan.id === user?.planId);

	if (!user) {
		return (
			<div className='text-center mt-5 m-auto'>
				<Typography variant='h5'>يجب تسجيل الدخول لرؤية الملف الشخصي</Typography>
				<Button variant='contained' onClick={() => navigate("/login")}>
					تسجيل الدخول
				</Button>
			</div>
		);
	}

	return (
		<main>
			<div
				className={`container text p-5 rounded-5 ${subscriptionColor(
					user.planId as string,
				)}`}
			>
				<h2>معلومات شخصية</h2>
				<table className=' table table-striped table-bordered'>
					<thead>
						<tr>
							<th>الاسم</th>
							<th>البريد الالكتروني</th>
							<th>نوع الحساب</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{currentUser}</td>
							<td>{user.email}</td>
							<td>{user.role === "customer" ? "مستخدم" : "مزود خدمات"}</td>
						</tr>
					</tbody>
				</table>

				{user?._id && user.isSubscribed && (
					<>
						<table className=' table table-striped table-bordered'>
							<thead>
								<tr>
									<th>اشتراك</th>
									<th>تاريخ الاشتراء</th>
									<th>تاريخ انتهاء الاشتراك</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										className={subscriptionColor(
											user.planId as string,
										)}
									>
										{user.planId}
									</td>
									<td>
										{new Date(
											user.subscriptionDate || "",
										).toLocaleDateString("he-IL")}
									</td>
									<td>
										{new Date(
											user.expiryDate || "",
										).toLocaleDateString("he-IL")}
									</td>
								</tr>
							</tbody>
						</table>
						<Box className='mt-4 text-center'>
							<Typography variant='h4' className='mb-3'>
								{currentPlan?.name}
							</Typography>
							<Typography variant='h5' className='mb-2'>
								السعر: {currentPlan?.price}
							</Typography>

							<ul
								style={{
									textAlign: "right",
									listStyle: "none",
									paddingRight: 0,
								}}
							>
								{currentPlan?.features.map((feature, index) => (
									<li key={index} className='mb-2'>
										<Box sx={{display: "flex"}}>
											<CheckCircleOutline
												color='success'
												fontSize='small'
											/>
											<Typography sx={{ml: 3}} variant='h6'>
												{feature.text}
											</Typography>
										</Box>
									</li>
								))}
							</ul>
						</Box>
					</>
				)}
				{user.role === "isVendor" && (
					<Button onClick={() => navigate("/subscribtion")} variant='contained'>
						{user.isSubscribed ? "ترقية الحسحاب" : "	اشترك الان"}
					</Button>
				)}
				<Divider className='my-4' />
			</div>
			<div
				style={{backgroundColor: "#00000029"}}
				className={`m-2 my-4 rounded-5 ${subscriptionColor(
					user.planId as string,
				)}`}
			>
				<MyBookings />
			</div>
		</main>
	);
};

export default Profile;
