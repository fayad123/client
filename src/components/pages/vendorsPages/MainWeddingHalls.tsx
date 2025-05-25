import {FunctionComponent, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // تأكد من إضافة Bootstrap إلى مشروعك
import {getServiceByCategories} from "../../../services/halsDecoration";
import {useNavigate} from "react-router-dom";
import { Services } from "../../../interfaces/services";
import { Button } from "@mui/material";

interface MainWeddingweddingHallsProps {}

const MainWeddingweddingHalls: FunctionComponent<MainWeddingweddingHallsProps> = () => {
	const [services, setServices] = useState<Services[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		getServiceByCategories("قاعات")
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
		<main className='min-vh-100'>
			<h1 className='text-center mb-4'>قاعات افراح</h1>

			<div className='container align-content-center'>
				<div className='row row-cols-1 row-cols-md-3 gap-1'>
					{services.map((weddingHalls) => (
						<div
							key={weddingHalls.vendorId}
						>
							<div className='card shadow-sm border-0'>
								{weddingHalls.images.length > 0 && (
									<img
										src={weddingHalls.images[0]}
										className='card-img-top'
										alt={weddingHalls.businessName}
										style={{height: "200px", objectFit: "cover"}}
									/>
								)}
								<div className='card-body d-flex flex-column'>
									<h5 className='card-title text-success'>
										{weddingHalls.businessName}
									</h5>
									<p className='card-text flex-grow-1'>
										{weddingHalls.address.city}, {weddingHalls.address.street}
									</p>
								</div>
								<Button
									onClick={() => navigate(`/service/${weddingHalls.vendorId}`)}
									variant="outlined"
									color="warning"
								>
									احجز الان
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default MainWeddingweddingHalls;
