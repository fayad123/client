import {FunctionComponent, useState} from "react";
import {uploadVideo} from "../../services/videosForAds";
import {Box, Button, Typography} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

/**
 * Files video upload
 * @returns  buttons they can upload vedios to database
 */
const VideoUpload: FunctionComponent = () => {
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;
		try {
			const data = await uploadVideo(file);
			setMessage(`Upload successful! File ID: ${data.fileId}`);
		} catch {
			setMessage("Upload failed");
		}
	};

	return (
		<Box sx={{width: "100%", display: "flex", flexDirection: "column"}}>
			<Button
				sx={{width: "50%", m: "auto", mb: 2}}
				component='label'
				variant='contained'
			>
				حدد الفيديو
				<VisuallyHiddenInput
					type='file'
					accept='video/*'
					onChange={handleChange}
				/>
			</Button>

			{file?.name && (
				<Typography
					color='success'
					sx={{mb: 2, fontWeight: "bold"}}
					variant='body1'
				>
					الملف المحدد: {file.name}
				</Typography>
			)}

			<Button
				component='label'
				variant='contained'
				tabIndex={-1}
				startIcon={<CloudUploadIcon />}
				disabled={!file}
				sx={{width: "50%", m: "auto", mb: 2}}
			>
				اضافه فيديو
				<VisuallyHiddenInput type='file' onChange={handleUpload} multiple />
			</Button>

			<p>{message}</p>
		</Box>
	);
};

export default VideoUpload;
