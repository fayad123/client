import {FunctionComponent, useEffect, useState} from "react";
import {BookingData} from "../../interfaces/booking";
import {getVendorsBooks, myBookings} from "../../services/booking";
import {errorToast} from "../../atoms/notifications/Toasts";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {useUser} from "../../contextApi/useUserData";
import {getUserById} from "../../services/usersServices";
import {JwtPayload} from "../../interfaces/userSchema";
import {Link, useNavigate} from "react-router-dom";
import {handleDeletBook} from "../../helpers/vendors";
import {handleDeletCustomerBook} from "../../helpers/customers";

interface MyBookingsProps {}

const MyBookings: FunctionComponent<MyBookingsProps> = () => {
	const [books, setBooks] = useState<BookingData[]>([]);
	const [vendorBookings, setVendorBookings] = useState<BookingData[]>([]);
	const [users, setusers] = useState<JwtPayload[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const {user} = useUser();

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			try {
				if (user?.role === "isVendor") {
					const vendorData = await getVendorsBooks(user._id);
					setVendorBookings(vendorData);

					const uniqueUserIds = [...new Set(vendorData.map((b) => b.userId))];
					const userDetails = await Promise.all(uniqueUserIds.map(getUserById));
					const filteredUsers = userDetails.filter(Boolean);
					setusers(filteredUsers);
					setLoading(false);
				}
				const myData = await myBookings(user._id);
				setBooks(myData);
			} catch (err) {
				errorToast("حدث خطأ");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [user]);

	if (loading) {
		return (
			<div className='text-center mt-5'>
				<CircularProgress />
			</div>
		);
	}

	return (
		<main>
			<div className=' container'>
				<hr />
				<p className='text-dark fw-bold h2'>الحجوزات الخاصة بك</p>
				<hr />
				<div className='container my-5 ' dir='rtl'>
					{books.length ? (
						<>
							{/* Desktop Table */}
							<div className='d-none d-md-block'>
								<table className='table fw-bold table-striped text-end table-bordered'>
									<thead>
										<tr>
											<th>الاسم التجاري</th>
											<th>التاريخ</th>
											<th>الحالة</th>
											<th>الخدمات</th>
											{/* <th>ملاحظة</th> */}
											<th>إجراء</th>
										</tr>
									</thead>
									<tbody>
										{books.map((book, index) => (
											<tr key={index}>
												<td>{book.businessName}</td>
												<td>
													{new Date(
														book.date,
													).toLocaleDateString("he-IL")}
												</td>
												<td className='text-danger'>
													{book.status}
												</td>
												<td>
													<ul className='list-unstyled text-end'>
														{book.services?.map((s, idx) => (
															<li key={idx}>
																- {s.featureName}
															</li>
														))}
													</ul>
												</td>
												{/* <td>
													{book.note && (
														<p className='card-text'>
															ملاحظة: {book.note}
														</p>
													)}
												</td> */}
												<td>
													<Button
														color='error'
														variant='outlined'
														className='btn btn-danger'
														onClick={async () => {
															handleDeletCustomerBook(
																book,
															).then(() => {
																setBooks((prev) =>
																	prev.filter(
																		(b) =>
																			b._id !==
																			book._id,
																	),
																);
															});
														}}
													>
														الغاء الطلب
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Mobile Cards */}
							<div className='d-block d-md-none'>
								{books.map((book, index) => (
									<div className='card mb-3 text-end' key={index}>
										<div className='card-body'>
											<h5 className='card-title'>
												{book.businessName}
											</h5>
											<p className='card-text'>
												📅{" "}
												{new Date(book.date).toLocaleDateString(
													"he-IL",
												)}
											</p>
											<p className='card-text'>
												الحالة: {book.status}
											</p>
											الخدمات:
											<ul className='list-unstyled'>
												{book.services?.map((f, i) => (
													<li key={i}>- {f.featureName}</li>
												))}
											</ul>
											{book.note && (
												<p className='card-text'>
													ملاحظة: {book.note}
												</p>
											)}
											<Button className='btn'>الغاء</Button>
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<div className='text-center mt-4 w-100'>
							<Typography>لم تقم بالحجز حتى الآن</Typography>
							<Button
								type='button'
								color='success'
								size='large'
								variant='contained'
								className='mt-2'
								onClick={() => navigate("/")}
							>
								احجز الآن
							</Button>
						</div>
					)}
				</div>

				{/* for vindors users */}
				{vendorBookings.length > 0 && (
					<h2 className='blink text-center'>طلبات الحجز</h2>
				)}
				<div className=' container text-center table-responsive '>
					{vendorBookings.length ? (
						vendorBookings.map((v, i) => {
							const bookingUser = users.find(
								(u) => u._id.toString() === v.userId,
							);

							return (
								<div key={i + 1}>
									<table className='table table-bordered rounded mb-5'>
										<thead>
											<tr>
												<th colSpan={4}>طالب الخدمه</th>
												<th colSpan={4}>الهاتف</th>
												<th colSpan={3}>تاريخ الحجز</th>
												<th colSpan={2}>اجراء</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td colSpan={4}>
													{bookingUser?.name
														? `${bookingUser.name.first} ${bookingUser.name.last}`
														: bookingUser?.businessName}
												</td>
												<td colSpan={4}>
													{new Date(v.date).toLocaleDateString(
														"he-IL",
													)}
												</td>
												<td colSpan={3}>
													<Link
														to={`tel:+974${bookingUser?.phone}`}
													>
														{bookingUser?.phone}
													</Link>
												</td>
												<td colSpan={1}>
													{bookingUser?._id && (
														<Button
															color='error'
															variant='outlined'
															className='btn btn-danger'
															onClick={async () => {
																handleDeletBook(v).then(
																	() => {
																		setVendorBookings(
																			(prev) =>
																				prev.filter(
																					(b) =>
																						b._id !==
																						v._id,
																				),
																		);
																		setBooks((prev) =>
																			prev.filter(
																				(b) =>
																					b._id !==
																					v._id,
																			),
																		);
																	},
																);
															}}
														>
															الغاء الطلب
														</Button>
													)}
												</td>
											</tr>
											<tr>
												<td colSpan={12}>
													<strong>الخدمات المطلوبة:</strong>
													<ul className='list-unstyled text-end'>
														{v.services.map((s, idx) => (
															<li key={idx}>
																- {s.featureName}
															</li>
														))}
													</ul>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							);
						})
					) : (
						<Box>
							{user?.role === "isVendor" && (
								<Typography variant='h5' color='textSecondary'>
									لم يتم حجز خدماتك حتى الان
								</Typography>
							)}
						</Box>
					)}
				</div>
			</div>
		</main>
	);
};

export default MyBookings;
