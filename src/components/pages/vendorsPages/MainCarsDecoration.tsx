import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";
import {generateServiceJsonLd} from "../../../utils/structuredData";
import JsonLd from "../../JsonLd";

interface MainCarsDecorationProps {}

const MainCarsDecoration: FunctionComponent<MainCarsDecorationProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Cars Decoration - afrahna - تزيين سيارات - أفراحنا";
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
		<main className='py-5' >
			<div className='text-center mb-5'>
				<JsonLd
					data={generateServiceJsonLd({
						serviceType: "تزيين سيارات",
						serviceUrl: `https://client-afrahna.vercel.app/${services[0].vendorId}`,
					})}
				/>
				<h1 className='display-4 fw-bold text-success mb-3'>تزيين السيارات</h1>
				<p className='lead text-muted'>
					نحن نهتم بأدق التفاصيل لتكون لحظتك مميزة. اختَر من بين أجمل باقات
					تزيين السيارات بتصاميم راقية وألوان تناسب ذوقك وتضفي لمسة فخمة على
					موكب زفافك.
				</p>
			</div>

			<div className='container '>
				<div className='row m-auto row-cols-1 row-cols-md-2 row-cols-xl-4 g-5'>
					{services.map((carsDecoration) => (
						<div className='col' key={carsDecoration.vendorId}>
							<div
								className='card border-0 shadow-lg h-100 hover-zoom'
								style={{transition: "transform 0.3s ease"}}
							>
								{carsDecoration.images && (
									<img
										className='card-img-top rounded-top'
										src={
											Array.isArray(carsDecoration.images)
												? carsDecoration.images[0]?.url
												: carsDecoration.businessName
										}
										alt={
											Array.isArray(carsDecoration.images)
												? carsDecoration.images[0]?.alt
												: carsDecoration.businessName
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success fw-bold'>
										{carsDecoration.businessName}
									</h5>
									<p className='card-text text-muted'>
										العنوان: {carsDecoration.address.city},{" "}
										{carsDecoration.address.street}
									</p>

									<button
										onClick={() =>
											navigate(
												`/service/${carsDecoration.vendorId}`,
											)
										}
										className='btn btn-outline-success w-100 mt-3'
									>
										احجز الان
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default MainCarsDecoration;
