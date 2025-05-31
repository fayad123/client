import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";

interface MainCooksProps {}

const MainCooks: FunctionComponent<MainCooksProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("طباخين")
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
			<h1 className='text-center text-success mb-4'>الطباخين</h1>
			<p className='text-center fs-5 text-muted mb-5'>
				لدينا نخبة من أمهر الطباخين المتخصصين في تحضير أشهى الأطباق الشرقية
				والغربية ليوم زفافك. نهتم بالجودة، النظافة، والمذاق الفاخر ليبقى في ذاكرة
				ضيوفك.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((cooks) => (
						<div key={cooks.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{cooks.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(cooks.images)
												? cooks.images[0]?.url
												: cooks.images?.url
										}
										alt={
											Array.isArray(cooks.images)
												? cooks.images[0]?.alt
												: cooks.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{cooks.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{cooks.address.city}, {cooks.address.street}
									</p>
								</div>
								<button
									onClick={() => navigate(`/service/${cooks.vendorId}`)}
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

export default MainCooks;
