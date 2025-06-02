import {FunctionComponent, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // تأكد من إضافة Bootstrap إلى مشروعك
import {getServiceByCategories} from "../../../services/vendorsServices";
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";

interface MainFrezzerProps {}

const MainFrezzer: FunctionComponent<MainFrezzerProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("تاجير برادات")
			.then((res) => {
				setServices(res);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading)
		return (
			<div className='text-center mt-5'>
				<div className='spinner-border text-success' role='status' />
			</div>
		);

	return (
		<main className='min-vh-100'>
			<h1 className='text-center mb-4'>برادات افراح</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((frezzers) => (
						<div key={frezzers.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{frezzers.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(frezzers.images)
												? frezzers.images[0]?.url
												: frezzers.businessName
										}
										alt={
											Array.isArray(frezzers.images)
												? frezzers.images[0]?.alt
												: frezzers.businessName
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{frezzers.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{frezzers.address.city}, {frezzers.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${frezzers.vendorId}`)
									}
									className='btn btn-outline-success m-3'
								>
									احجز الان
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default MainFrezzer;
