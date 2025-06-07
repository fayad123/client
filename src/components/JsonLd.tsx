// components/JsonLd.tsx
import { FunctionComponent } from "react";
import {Helmet} from "react-helmet";

interface JsonLdProps {
	data: object;
}

const JsonLd: FunctionComponent<JsonLdProps> = ({data}) => (
	<Helmet>
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
		/>
	</Helmet>
);

export default JsonLd;
