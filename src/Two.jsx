import React from "react";
import { Steps, Button, Badge, Panel, Notification } from "rsuite";
import Axios from "axios";
const App = () => {
	const [step, setStep] = React.useState(0);
	const [counter, setCounter] = React.useState(0);
	const [code, setcode] = React.useState("");

	const onChange = (nextStep) => {
		setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
	};

	const Handlsers = () => {
		Axios.post("http://localhost:3001/secret").then((res) => {
			console.log(res.data.secret);
			localStorage.setItem("none", res.data.secret);
		});

		if (localStorage.getItem("none").length > 0) {
			console.log(" no null");
			onChange(step + 1);
		} else {
			console.log("is null");
		}
	};

	const Genreted = () => {
		Axios.post("http://localhost:3001/generate", {
			secret: localStorage.getItem("none"),
		}).then((res) => {
			setCounter(counter + res.data.remaining);
			Notification.open({
				title: "Code",
				description: <p>you code {res.data.token}</p>,
			});
		});
	};

	/// timer

	function Timers() {
		React.useEffect(() => {
			const timer =
				counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
			return () => clearInterval(timer);
		}, [counter]);
		return (
			<Badge content={counter}>
				<Button>Second</Button>
			</Badge>
		);
	}

	//

	// formsubmit

	const handleSubmit = (evt) => {
		evt.preventDefault();
		Axios.post("http://localhost:3001/validate", {
			secret: localStorage.getItem("none"),
			token: code,
		}).then((res) => {
			console.log(res);
			if (res.data.valid === true) {
				onChange(step + 1);
			} else {
				alert("false code ):");
			}
		});
	};

	//

	const Stepeds = () => {
		switch (step) {
			case 0:
				return (
					<div>
						<Button appearance="ghost" onClick={Handlsers}>
							get request code
						</Button>
					</div>
				);
			case 1:
				return (
					<div>
						<Button appearance="ghost" onClick={Genreted}>
							Get code
						</Button>
						<Timers />
						<form>
							<label>code</label>
							<input
								type="text"
								value={code}
								onChange={(e) => setcode(e.target.value)}
								placeholder="example 745456"
							/>

							<Button color="green" type="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</form>
					</div>
				);

			case 2:
				return <div>hapyy you succsus!</div>;

			default:
				return <div>no</div>;
		}
	};

	return (
		<div>
			<Steps current={step}>
				<Steps.Item title="Finished" description="is her" />
				<Steps.Item title="In Progress" description="is her" />
				<Steps.Item title="Waiting" description="is done" />
			</Steps>
			<hr />
			<Panel header={`Part: ${step + 1}`}>
				<Stepeds />
			</Panel>
		</div>
	);
};

export default App;
