export const getPasswordStrengthLabel = (score: number) => {
	switch (score) {
		case 0:
			return "ضعيفة جدًا";
		case 1:
			return "ضعيفة";
		case 2:
			return "متوسطة";
		case 3:
			return "قوية";
		case 4:
			return "قوية جدًا";
		default:
			return "";
	}
};

export const getStrengthColor = (score: number) => {
	return ["#ff4d4f", "#ff7a45", "#faad14", "#52c41a", "#237804"][score];
};
