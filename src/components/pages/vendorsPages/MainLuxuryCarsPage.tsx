import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";
import {getServiceByCategories} from "../../../services/vendorsServices";

interface MainLuxuryCarsPageProps {}

const MainLuxuryCarsPage: FunctionComponent<MainLuxuryCarsPageProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("تأجير سيارات فخمة")
			.then((res) => setServices(res))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return (
			<div className='text-center mt-5'>
				<div className='spinner-border text-warning' role='status' />
			</div>
		);
	}

	return (
		<main className='py-5' style={{background: "#fdfcfb", minHeight: "100vh"}}>
			<div className='text-center mb-5'>
				<h1 className='text-center text-warning mb-4'>تأجير سيارات فخمة</h1>
				<p className='text-center fs-5 text-muted mb-5'>
					اختر من بين أرقى السيارات الفخمة لترافقك في يوم زفافك بأسلوب ملكي.
					سيارات حديثة، سائقون محترفون، وتجربة لا تُنسى.
				</p>
			</div>
			<div className='container'>
				<div className='row m-auto row-cols-1 row-cols-md-2 row-cols-xl-4 g-5'>
					{services.map((service) => (
						<div className='col' key={service.vendorId}>
							<div
								className='card border-0 shadow-lg h-100 hover-zoom'
								style={{transition: "transform 0.3s ease"}}
							>
								{service.images && (
									<img
										className='card-img-top rounded-top'
										src={
											Array.isArray(service.images)
												? service.images[0]?.url
												: service.businessName
										}
										alt={
											Array.isArray(service.images)
												? service.images[0]?.alt
												: service.businessName
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success fw-bold'>
										{service.businessName}
									</h5>
									<p className='card-text text-muted'>
										العنوان: {service.address.city},{" "}
										{service.address.street}
									</p>

									<button
										onClick={() =>
											navigate(`/service/${service.vendorId}`)
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

export default MainLuxuryCarsPage;
