import {
	FaSearch,
	FaStar,
	FaMoneyBillWave,
	FaMapMarkerAlt,
	FaFilter,
} from "react-icons/fa";
import {Form, InputGroup, ButtonGroup, Button, Badge, Tab, Tabs} from "react-bootstrap";
import { FunctionComponent } from "react";
import { formatCurrency } from "../../../helpers/vendors";

interface ServiceFiltersProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	sortBy: "rating" | "price" | "location" | "none";
	setSortBy: React.Dispatch<
		React.SetStateAction<"rating" | "price" | "location" | "none">
	>;
	priceRange: [number, number];
	setPriceRange: (range: [number, number]) => void;
	subCategories?: string[];
	activeSubCategory: string;
	setActiveSubCategory: (category: string) => void;
}

const ServiceFilters: FunctionComponent<ServiceFiltersProps> = ({
	searchTerm,
	setSearchTerm,
	sortBy,
	setSortBy,
	priceRange,
	setPriceRange,
	subCategories,
	activeSubCategory,
	setActiveSubCategory,
}) => (
	<div className='container mb-4'>
		<div className='row g-3'>
			<div className='col-md-6'>
				<InputGroup>
					<InputGroup.Text>
						<FaSearch />
					</InputGroup.Text>
					<Form.Control
						placeholder='ابحث عن الخدمات...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</InputGroup>
			</div>

			<div className='col-md-6'>
				<ButtonGroup className='w-100'>
					<Button
						variant={sortBy === "rating" ? "primary" : "outline-secondary"}
						onClick={() => setSortBy("rating")}
					>
						<FaStar className='me-2' /> الأعلى تقييماً
					</Button>
					<Button
						variant={sortBy === "price" ? "primary" : "outline-secondary"}
						onClick={() => setSortBy("price")}
					>
						<FaMoneyBillWave className='me-2' /> الأقل سعراً
					</Button>
					<Button
						variant={sortBy === "location" ? "primary" : "outline-secondary"}
						onClick={() => setSortBy("location")}
					>
						<FaMapMarkerAlt className='me-2' /> الأقرب
					</Button>
				</ButtonGroup>
			</div>
		</div>

		<div className='row mt-3'>
			<div className='col-12'>
				<div className='d-flex align-items-center'>
					<FaFilter className='me-2' />
					<span className='me-2'>نطاق السعر:</span>
					<Form.Range
						min={0}
						max={100000}
						step={500}
						value={priceRange[1]}
						onChange={(e) =>
							setPriceRange([priceRange[0], parseInt(e.target.value)])
						}
					/>
					<Badge bg='secondary' className='ms-2'>
						{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
					</Badge>
				</div>
			</div>
		</div>

		{subCategories?.length && (
			<div className='row mt-3'>
				<div className='col-12'>
					<Tabs
						activeKey={activeSubCategory}
						onSelect={(k) => setActiveSubCategory(k || "الكل")}
						className='mb-3'
					>
						<Tab eventKey='الكل' title='الكل' />
						{subCategories.map((subCat) => (
							<Tab key={subCat} eventKey={subCat} title={subCat} />
						))}
					</Tabs>
				</div>
			</div>
		)}
	</div>
);

export default ServiceFilters