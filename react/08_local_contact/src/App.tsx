import { useState } from 'react'
import Contact from './models/Contact';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router';

interface State {
	list:Contact[];
	id:number;
}

function App() {

	const [state,setState] = useState<State>({
		list:[],
		id:100
	})

	const addContact = (contact:Contact) => {
		setState((state) => {
			contact.id = state.id;
			return {
				id:state.id+1,
				list:state.list.concat(contact)
			}
		})
	}
	
	const removeContact = (id:number) => {
		setState((state) => {
			const tempList = state.list.filter(contact => id !== contact.id);
			return {
				...state,
				list:tempList
			}
		})
	}

	const editContact = (contact:Contact) => {
		for(let i=0;i<state.list.length;i++) {
			if(state.list[i].id === contact.id) {
				const tempList = state.list.toSpliced(i,1,contact);
				setState((state) => {
					return {
						...state,
						list:tempList
					}
				})
			}
		}
	}

	return (
		<>
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" elememt={<ContactList list={state.list} removeContact={removeContact} editContact={editContact}/>}/>
				<Route path="/form" element={<ContactForm addContact={addContact}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
