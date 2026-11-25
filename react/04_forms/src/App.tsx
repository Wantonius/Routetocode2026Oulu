import {useState} from 'react';
import Person from './models/Person';
import ContactForm from './components/ContactForm';

interface State {
	greeting:string;
}

function App() {
	
	const [state,setState] = useState<State>({
		greeting:"No greeting yet"
	})

	const setGreeting = (person:Person) => {
		setState({
			greeting:"Hello "+person.firstname+" "+person.lastname
		})
	}

	return (
		<>
			<h2>Message:{state.greeting}</h2>
			<ContactForm setGreeting={setGreeting}/>
		</>
	)
}

export default App
