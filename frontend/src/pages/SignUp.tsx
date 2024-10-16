import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
	// Explicitly define types since you are using TypeScript
	const [inputs, setInputs] = useState<{
		fullName: string;
		username: string;
		password: string;
		confirmPassword: string;
		gender: "male" | "female" | "";
	}>({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	// Updated to use functional state updates for better performance
	const handleCheckboxChange = (gender: "male" | "female") => {
		setInputs((prev) => ({ ...prev, gender }));
	};

	// Added basic form validation before submission
	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();

		// This one is to ensure passwords match and required fields are filled
		if (inputs.password !== inputs.confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		if (!inputs.fullName || !inputs.username || !inputs.password || !inputs.gender) {
			alert("Please fill in all the fields");
			return;
		}

		signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmitForm}>
					<div>
						<label htmlFor='fullName' className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							id='fullName'
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs((prev) => ({ ...prev, fullName: e.target.value }))}
						/>
					</div>

					<div>
						<label htmlFor='username' className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							id='username'
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
						/>
					</div>

					<div>
						<label htmlFor='password' className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							id='password'
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>

					<div>
						<label htmlFor='confirmPassword' className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							id='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs((prev) => ({ ...prev, confirmPassword: e.target.value }))}
						/>
					</div>

					<GenderCheckbox selectedGender={inputs.gender} onCheckboxChange={handleCheckboxChange} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? "Loading..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
