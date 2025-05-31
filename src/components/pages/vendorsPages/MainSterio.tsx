import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";
import {getServiceByCategories} from "../../../services/vendorsServices";

interface MainSterioProps {}

const MainSterio: FunctionComponent<MainSterioProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("ستيريو")
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
			<h1 className='text-center mb-4'>ستيريو</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((sterios) => (
						<div key={sterios.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{sterios.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(sterios.images)
												? sterios.images[0]?.url
												: sterios.images?.url
										}
										alt={
											Array.isArray(sterios.images)
												? sterios.images[0]?.alt
												: sterios.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{sterios.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{sterios.address.city}, {sterios.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${sterios.vendorId}`)
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

export default MainSterio;
