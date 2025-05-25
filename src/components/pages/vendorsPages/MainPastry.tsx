import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/halsDecoration";
import { Services } from "../../../interfaces/services";

interface MainPastryProps {}

const MainPastry: FunctionComponent<MainPastryProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("حلويات")
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
			<h1 className='text-center text-danger mb-4'>حلويات الأعراس</h1>
			<p className='text-center text-muted fs-5 mb-5'>
				مجموعة مختارة من أشهى أنواع الحلويات الشرقية والغربية المصممة خصيصًا
				للمناسبات الخاصة وحفلات الزفاف.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((pasty) => (
						<div
							key={pasty.vendorId}
						>
							<div className='card h-100 shadow-sm border-0'>
								{pasty.images.length > 0 && (
									<img
										src={pasty.images[0]}
										className='card-img-top'
										alt={pasty.businessName}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{pasty.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{pasty.address.city}, {pasty.address.street}
									</p>
								</div>
								<button
									onClick={() => navigate(`/service/${pasty.vendorId}`)}
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

export default MainPastry;
