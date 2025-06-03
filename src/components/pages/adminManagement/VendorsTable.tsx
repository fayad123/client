import {FunctionComponent, useEffect, useState} from "react";
import {errorToast} from "../../../atoms/notifications/Toasts";
import {getAllVendors} from "../../../services/vendorServices";
import {JwtPayload} from "../../../interfaces/userSchema";
import {Link} from "react-router-dom";
import {useUser} from "../../../contextApi/useUserData";

interface VendorsTableProps {}

const VendorsTable: FunctionComponent<VendorsTableProps> = () => {
	const [vendors, setVendors] = useState<JwtPayload[]>([]);
	const {user} = useUser();

  
	useEffect(() => {
		if (user?.role !== "admin") return;
		getAllVendors()
			.then(setVendors)
			.catch((err: any) => errorToast(err.response?.message));
	}, []);

	return (
		<main>
			<div className='container  text-center pt-5'>
				<h1 className=' my-5'>جدول الموردين</h1>
				{vendors.length === 0 ? (
					<p>لا يوجد مزودي خدمات لعرضهم</p>
				) : (
					<div className='table-responsive'>
						<Link className='btn btn-primary my-3' to={`/manage/users`}>
							ادارة المستخدمين
						</Link>
						<table className={"table table-striped table-danger"}>
							<thead>
								<tr>
									<th>الاسم</th>
									<th>الايميل</th>
									<th>الهاتف</th>
									<th>تعديل</th>
									<th>حذف</th>
								</tr>
							</thead>
							<tbody>
								{vendors.map((vendor) => (
									<tr key={vendor._id}>
										<td>{vendor.businessName}</td>
										<td>{vendor.email}</td>
										<td>
											<Link to={`tel:+974${vendor.phone}`}>
												{vendor.phone}
											</Link>
										</td>
										<td>
											<button
												className='btn btn-warning'
												onClick={() => {}}
											>
												تعديل
											</button>
										</td>
										<td>
											<button
												className='btn btn-danger'
												onClick={() => {}}
											>
												حذف
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</main>
	);
};

export default VendorsTable;
