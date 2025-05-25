import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Services} from "../../../interfaces/services";
import {getServiceByCategories} from "../../../services/halsDecoration";

interface MainRestaurantsProps {}

const MainRestaurants: FunctionComponent<MainRestaurantsProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("مطاعم للأعراس")
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
			<h1 className='text-center mb-4'>مطاعم للأعراس</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((restaurants) => (
						<div
							key={restaurants.vendorId}
						>
							<div className='card h-100 shadow-sm border-0'>
								{restaurants.images.length > 0 && (
									<img
										src={restaurants.images[0]}
										className='card-img-top'
										alt={restaurants.businessName}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{restaurants.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{restaurants.address.city}, {restaurants.address.street}
									</p>
								</div>
								<button
									onClick={() => navigate(`/service/${restaurants.vendorId}`)}
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

export default MainRestaurants;
