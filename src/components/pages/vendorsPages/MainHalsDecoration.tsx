import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getServiceByCategories} from "../../../services/vendorsServices";
import {Services} from "../../../interfaces/services";

interface MainHalsDecorationProps {}

const MainHalsDecoration: FunctionComponent<MainHalsDecorationProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("تزيين قاعات")
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
			<h1 className='text-center text-primary mb-4'>تزيين القاعات</h1>
			<p className='text-center text-muted fs-5 mb-5'>
				نقدم لك تصاميم ديكور فريدة من نوعها لتزيين قاعة الزفاف بأجمل الورود،
				الإضاءة، والطاولات، لتجعل من يومك لحظة لا تُنسى.
			</p>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((hallsDrcoration) => (
						<div key={hallsDrcoration.vendorId}>
							<div className='card h-100 shadow-sm border-0'>
								{hallsDrcoration.images && (
									<img
										className='card-img-top'
										src={
											Array.isArray(hallsDrcoration.images)
												? hallsDrcoration.images[0]?.url
												: hallsDrcoration.images?.url
										}
										alt={
											Array.isArray(hallsDrcoration.images)
												? hallsDrcoration.images[0]?.alt
												: hallsDrcoration.images?.alt
										}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{hallsDrcoration.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{hallsDrcoration.address.city},{" "}
										{hallsDrcoration.address.street}
									</p>
								</div>
								<button
									onClick={() =>
										navigate(`/service/${hallsDrcoration.vendorId}`)
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

export default MainHalsDecoration;
