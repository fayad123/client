import {FunctionComponent, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // تأكد من إضافة Bootstrap إلى مشروعك
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";
import {getServiceByCategories} from "../../../services/vendorsServices";

interface MainWaitersProps {}

const MainWaiters: FunctionComponent<MainWaitersProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("نادلين")
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
		<main>
			<h1 className='text-center mb-4'>نادلين</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((waiters) => (
						<div key={waiters.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{waiters.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(waiters.images)
												? waiters.images[0]?.url
												: waiters.images?.url
										}
										alt={
											Array.isArray(waiters.images)
												? waiters.images[0]?.alt
												: waiters.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{waiters.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{waiters.address.city}, {waiters.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${waiters.vendorId}`)
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

export default MainWaiters;
