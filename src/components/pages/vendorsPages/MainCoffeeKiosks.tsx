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
		getServiceByCategories("عربات قهوة")
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
			<h1>كيوسكات قهوه للايجار</h1>

			<div className='container text-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((coffee) => (
						<div key={coffee.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{coffee.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(coffee.images)
												? coffee.images[0]?.url
												: coffee.images?.url
										}
										alt={
											Array.isArray(coffee.images)
												? coffee.images[0]?.alt
												: coffee.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{coffee.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{coffee.address.city}, {coffee.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${coffee.vendorId}`)
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
