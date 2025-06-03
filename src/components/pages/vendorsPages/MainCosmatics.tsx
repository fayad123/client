import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";

interface MainCosmaticsProps {}

const MainCosmatics: FunctionComponent<MainCosmaticsProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("صالونات تجميل")
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
			<h1 className='text-center text-primary mb-4'>صالونات التجميل</h1>
			<p className='text-center fs-5 text-muted mb-5'>
				نقدّم لكِ أفضل صالونات التجميل المختصة بالمكياج وتسريحات الشعر للعروس
				والمعازيم. جودة عالية وخدمة احترافية تليق بيومكِ المميز.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((cosmatics) => (
						<div key={cosmatics.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{cosmatics.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(cosmatics.images)
												? cosmatics.images[0]?.url
												: cosmatics.businessName
										}
										alt={
											Array.isArray(cosmatics.images)
												? cosmatics.images[0]?.alt
												: cosmatics.businessName
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{cosmatics.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{cosmatics.address.city},{" "}
										{cosmatics.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${cosmatics.vendorId}`)
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

export default MainCosmatics;
