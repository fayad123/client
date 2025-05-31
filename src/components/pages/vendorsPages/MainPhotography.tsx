import {FunctionComponent, useEffect, useState} from "react";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";
import {useNavigate} from "react-router-dom";

interface MainPhotographyProps {}

const MainPhotography: FunctionComponent<MainPhotographyProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("تصوير")
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
		<div className='container py-5'>
			<h1 className='text-center text-primary mb-4'>تصوير الأعراس</h1>
			<p className='text-center text-muted fs-5 mb-5'>
				نقدم خدمات التصوير الفوتوغرافي المميزة للمناسبات وحفلات الزفاف، حيث يتم
				توثيق كل لحظة من يومك الخاص بطريقة فنية ومبدعة.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((photography) => (
						<div key={photography.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{photography.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(photography.images)
												? photography.images[0]?.url
												: photography.images?.url
										}
										alt={
											Array.isArray(photography.images)
												? photography.images[0]?.alt
												: photography.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{photography.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{photography.address.city},{" "}
										{photography.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${photography.vendorId}`)
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
		</div>
	);
};

export default MainPhotography;
