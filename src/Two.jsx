import React from "react";
import { Steps, Button, ButtonGroup, Panel, Notification } from "rsuite";
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
			console.log("====================================");
			console.log(res.data.remaining);
			console.log(res);

			setCounter(counter + res.data.remaining);
			Notification.open({
				title: "Notify",
				description: <p>you code {res.data.token}</p>,
			});
			console.log("====================================");
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
			<div className="App">
				{" "}
				<div>Countdown: {counter}</div>{" "}
			</div>
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
				//  onchange(step + 2)
				alert("nice");
			} else {
				alert("lol");
			}
		});
	};

	//

	const Test = () => {
		switch (step) {
			case 0:
				return (
					<div>
						<Button onClick={Handlsers}> req </Button>
					</div>
				);
			case 1:
				return (
					<div>
						{" "}
						is {step} no
						<Button onClick={Genreted}>send req</Button>
						<h3>{counter} wow</h3> <hr />
						<Timers />
						<form>
							<label>code</label>
							<input
								type="text"
								value={code}
								onChange={(e) => setcode(e.target.value)}
								placeholder="example 745456"
							/>

							<button type="submit" onClick={handleSubmit}>
								alert
							</button>
						</form>
					</div>
				);

			case 2:
				return <div> is {step} </div>;

			case 3:
				return <div> is {step} </div>;

			default:
				return <div>no</div>;
		}
	};
	const onNext = () => onChange(step + 1);
	const onPrevious = () => onChange(step - 1);

	return (
		<div>
			<Steps current={step}>
				<Steps.Item title="Finished" description="Description">
					<h1>lol</h1>
				</Steps.Item>
				<Steps.Item title="In Progress" description="Description" />
				<Steps.Item title="Waiting" description="Description" />
				<Steps.Item title="Waiting" description="Description" />
			</Steps>
			<hr />
			<Panel header={`Step: ${step + 1}`}>
				<Test />
			</Panel>
			<hr />
			<ButtonGroup>
				<Button onClick={onPrevious} disabled={step === 0}>
					Previous
				</Button>
				<Button onClick={onNext} disabled={step === 3}>
					Next
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default App;
