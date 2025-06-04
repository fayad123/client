import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TimeClock} from "@mui/x-date-pickers/TimeClock";
import {TextField, Box, Typography} from "@mui/material";
import "dayjs/locale/ar"; // Import Arabic locale

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

	const [timeValue, setTimeValue] = React.useState<Dayjs | null>(
		parseTimeString(value),
	);

	React.useEffect(() => {
		setTimeValue(parseTimeString(value));
	}, [value]);

	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale='ar' // Set Arabic locale
		>
			<Box sx={{direction: "rtl"}}>
				<Typography variant='subtitle1' gutterBottom>
					{label}
				</Typography>
				<TimeClock
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
			</Box>
		</LocalizationProvider>
	);
};
