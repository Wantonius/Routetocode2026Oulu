import Contact from '../models/Contact';
import React,{useState} from 'react';

interface State {
	firstname:string;
	lastname:string;
	email:string;
	phone:string;
}

interface Props {
	contact:Contact;
	changeMode(mode:string,index:number):void;
	editContact(contact:Contact):void;
}

const EditRow = (props:Props) => {
	
	const [state,setState] = useState<State>({
		firstname:props.contact.firstname,
		lastname:props.contact.lastname,
		email:props.contact.email,
		phone:props.contact.phone
	})

	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const editContact = () => {
		const contact = new Contact(state.firstname,state.lastname,state.email,state.phone,props.contact.id);
		props.editContact(contact);
	}

	return(
		<tr>
			<td><input type="text"
						name="firstname"
						id="firstname"
						className="form-control"
						onChange={onChange}
						value={state.firstname}/></td>
			<td><input type="text"
						name="lastname"
						id="lastname"
						className="form-control"
						onChange={onChange}
						value={state.lastname}/></td>
			<td><input type="email"
						name="email"
						id="email"
						className="form-control"
						onChange={onChange}
						value={state.email}/></td>
			<td><input type="tel"
						name="phone"
						id="phone"
						className="form-control"
						onChange={onChange}
						value={state.phone}/></td>
			<td><button className="btn btn-success"
						onClick={editContact}>Save</button></td>
			<td><button className="btn btn-secondary"
						onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
		</tr>
	)
}

export default EditRow;