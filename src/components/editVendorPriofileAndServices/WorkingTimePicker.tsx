import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimeClock} from "@mui/x-date-pickers/TimeClock";
import {TextField, Box, Typography, Button} from "@mui/material";
import "dayjs/locale/ar"; // Import Arabic locale
import {useEffect, useState} from "react";

interface TimeClockPickerProps {
	label: string;
	value: string;
	onChange: (time: string) => void;
	disabled?: boolean;
}

export const TimeClockPicker = ({
	label,
	value,
	onChange,
	disabled = false,
}: TimeClockPickerProps) => {
	const [clockKey, setClockKey] = useState<number>(0);

	// Convert string time to Dayjs object
	const parseTimeString = (timeStr: string): Dayjs | null => {
		if (!timeStr) return null;
		return dayjs(`2000-01-01T${timeStr}`); // Using arbitrary date
	};

	// Convert Dayjs object back to time string
	const formatTimeString = (date: Dayjs | null): string => {
		if (!date) return "";
		return date.format("HH:mm");
	};
	const [timeValue, setTimeValue] = useState<Dayjs | null>(parseTimeString(value));

	useEffect(() => {
		setTimeValue(parseTimeString(value));
	}, [value]);

	// for reset clock
	const handleResetClock = () => {
		setTimeValue(null);
		onChange("09:00");
		setClockKey((prevKey) => prevKey + 1);
	};

	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale='he'
		>
			<Box sx={{direction: "rtl"}}>
				<Typography variant='subtitle1' gutterBottom>
					{label}
				</Typography>
				<TimeClock
					key={clockKey}
					value={timeValue}
					onChange={(newValue) => {
						setTimeValue(newValue);
						onChange(formatTimeString(newValue));
					}}
					disabled={disabled}
					ampm={false}
					views={["hours", "minutes"]}
					sx={{
						"& .MuiClock-amButton, & .MuiClock-pmButton": {
							display: "none", // Hide AM/PM buttons
						},
					}}
				/>
				<TextField
					value={timeValue ? timeValue.format("HH:mm") : ""}
					size='small'
					fullWidth
					InputProps={{
						readOnly: true,
					}}
					sx={{
						mt: 2,
						"& .MuiInputBase-input": {
							textAlign: "center",
							fontWeight: "bold",
						},
					}}
				/>
				<Button
					variant='outlined'
					onClick={handleResetClock}
					sx={{mt: 2, width: "100%"}}
				>
					إعادة تعيين الوقت
				</Button>
			</Box>
		</LocalizationProvider>
	);
};
