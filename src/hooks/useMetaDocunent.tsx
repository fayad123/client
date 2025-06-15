import {useEffect} from "react";

const useMetaDocument = (
	pageTitle: string,
	metaDescription: string,
	canonicalUrl?: string,
) => {
	useEffect(() => {
		document.title = pageTitle;

		let metaTag = document.querySelector("meta[name='description']");
		let canonicalTag = document.querySelector("link[rel='canonical']");

		if (!metaTag) {
			metaTag = document.createElement("meta");
			metaTag.setAttribute("name", "description");
			document.head.appendChild(metaTag);
		}

		metaTag.setAttribute("content", metaDescription);

		// create canonical link
		if (canonicalUrl) {
			if (!canonicalTag) {
				canonicalTag = document.createElement("link");
				canonicalTag.setAttribute("rel", "canonical");
        
				document.head.appendChild(canonicalTag);
			}
			canonicalTag.setAttribute("href", canonicalUrl);
		}
		return () => {
			document.title = "منصه افراحنا";
			metaTag.setAttribute(
				"content",
				"منصة أفراحنا – أول منصة لحجز جميع خدمات الأعراس في الوسط العربي. احجز قاعات، تزيين، تصوير، طباخين، فرق فنية والمزيد بيوم واحد",
			);
			if (canonicalTag) {
				canonicalTag.setAttribute("href", "https://client-afrahna.vercel.app/");
			}
		};
	}, [pageTitle, metaDescription, canonicalUrl]);
};

export default useMetaDocument;
