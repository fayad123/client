import {FunctionComponent, useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

interface ContactUsProps {}

const ContactUs: FunctionComponent<ContactUsProps> = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: send message logic (API, EmailJS etc.)
		console.log("Form submitted:", form);
		alert("تم إرسال رسالتك بنجاح!");
		setForm({name: "", email: "", subject: "", message: ""});
	};

	return (
		<main>
			<div className='container' style={{maxWidth: "600px"}}>
				<h3 className='text-center mb-3'>اتصل بنا</h3>
				<p className='text-center mb-4'>
					نسعد بالإجابة على استفساراتكم واقتراحاتكم. املأ النموذج أدناه وسنعاود
					الاتصال بك في أقرب وقت ممكن.
				</p>

				<form
					style={{
						textAlign: "right",
						backgroundColor: "#ffffff75",
						padding: 20,
					}}
					onSubmit={handleSubmit}
				>
					<div className='mb-3'>
						<label htmlFor='name' className='form-label'>
							الاسم الكامل
						</label>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={form.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							البريد الإلكتروني
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='subject' className='form-label'>
							الموضوع
						</label>
						<input
							type='text'
							className='form-control'
							id='subject'
							name='subject'
							value={form.subject}
							onChange={handleChange}
						/>
					</div>

					<div className='mb-3'>
						<label htmlFor='message' className='form-label'>
							رسالتك
						</label>
						<textarea
							className='form-control'
							id='message'
							name='message'
							rows={5}
							value={form.message}
							onChange={handleChange}
							required
						></textarea>
					</div>

					<button type='submit' className='btn btn-primary w-100'>
						إرسال
					</button>
				</form>
			</div>
		</main>
	);
};

export default ContactUs;
