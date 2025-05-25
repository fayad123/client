import {FunctionComponent} from "react";
import {useUser} from "../contextApi/useUserData";
import {Button, Divider, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MyBookings from "./pages/MyBookings";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {user} = useUser();
	const navigate = useNavigate();

	const businesses: string = `${user?.businessName}`;
	const userName: string = `${user?.name.first} ${user?.name.last}`;
	let currentUser = businesses || userName;

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
		<main className=''>
			<div
				style={{backgroundColor: "#00000029"}}
				className='container text p-5 rounded-5'
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
				<Divider className='my-4' />
			</div>
			<div style={{backgroundColor: "#00000029"}} className='m-5 rounded-5'>
				<MyBookings />
			</div>
		</main>
	);
};

export default Profile;
