import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";

interface MainCarsDecorationProps {}

const MainCarsDecoration: FunctionComponent<MainCarsDecorationProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("تزيين سيارات")
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
			<h1 className='text-center text-primary mb-4'>تزيين السيارات</h1>
			<p className='text-center fs-5 text-muted mb-5'>
				نحن نهتم بأدق التفاصيل لتكون لحظتك مميزة. اختَر من بين أجمل باقات تزيين
				السيارات بتصاميم راقية وألوان تناسب ذوقك وتضفي لمسة فخمة على موكب زفافك.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((carsDecoration) => (
						<div key={carsDecoration.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{carsDecoration.images?.url && (
									<img
										className='card-img-top'
										src={
											Array.isArray(carsDecoration.images)
												? carsDecoration.images[0]?.url
												: carsDecoration.images?.url
										}
										alt={
											Array.isArray(carsDecoration.images)
												? carsDecoration.images[0]?.alt
												: carsDecoration.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{carsDecoration.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										العنوان: {carsDecoration.address.city},{" "}
										{carsDecoration.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${carsDecoration.vendorId}`)
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

export default MainCarsDecoration;
