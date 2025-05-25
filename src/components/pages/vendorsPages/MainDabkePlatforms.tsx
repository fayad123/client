import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/halsDecoration";
import { Services } from "../../../interfaces/services";

interface MainDabkePlatformsProps {}

const MainDabkePlatforms: FunctionComponent<MainDabkePlatformsProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("منصات الدبكة")
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
		<main className='container py-5'>
			<h1 className='text-center text-success mb-4'>منصات الدبكة</h1>
			<p className='text-center text-muted fs-5 mb-5'>
				نوفر لك أفضل المنصات لرقصات الدبكة الشعبية، بأحجام وتصاميم متعددة تناسب
				أجواء الأعراس والمناسبات الخاصة.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((dabkaPlatforms) => (
						<div
							key={dabkaPlatforms.vendorId}
						>
							<div className='card h-100 shadow-sm border-0'>
								{dabkaPlatforms.images.length > 0 && (
									<img
										src={dabkaPlatforms.images[0]}
										className='card-img-top'
										alt={dabkaPlatforms.businessName}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{dabkaPlatforms.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{dabkaPlatforms.address.city}, {dabkaPlatforms.address.street}
									</p>
								</div>
								<button
									onClick={() => navigate(`/service/${dabkaPlatforms.vendorId}`)}
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

export default MainDabkePlatforms;
