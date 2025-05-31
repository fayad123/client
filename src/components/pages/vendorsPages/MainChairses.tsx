import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";

interface MainCoffeeKiosksProps {}

const MainCoffeeKiosks: FunctionComponent<MainCoffeeKiosksProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("كراسي")
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
			<h1>تاجير كراسي للاعراس</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((chairses) => (
						<div key={chairses.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{chairses.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(chairses.images)
												? chairses.images[0]?.url
												: chairses.images?.url
										}
										alt={
											Array.isArray(chairses.images)
												? chairses.images[0]?.alt
												: chairses.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{chairses.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{chairses.address.city}, {chairses.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${chairses.vendorId}`)
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

export default MainCoffeeKiosks;
