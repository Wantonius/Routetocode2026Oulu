import Contact from '../models/Contact';
import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow'
import EditRow from './EditRow';

interface Props {
	list:Contact[];
	removeContact(id:number):void;
	editContact(contact:Contact):void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ContactList = (props:Props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode = (mode:string,index:number) {
		switch(mode) {
			case "remove": {
				return {
					removeIndex:index,
					editIndex:-1
				}
			}
			case "edit": {
				return {
					removeIndex:-1,
					editIndex:index
				}
			}
			case "cancel": {
				return {
					removeIndex:-1,
					editIndex:-1
				}
			}
			default:
				return
		}
	}
	
	const removeContact = (id:number) => {
		props.removeContact(id);
		changeMode("cancel",0);
	}
	
	const editContact = (contact:Contact) => {
		props.editContact(contact);
		changeMode("cancel",0);
	}
	
	const listItems = props.list.map((contact,index) => {
		if(index === state.removeIndex) {
			return(
				<RemoveRow key={contact.id} contact={contact} changeMode={changeMode} removeContact={removeContact}/>
			)
		}
		if(index === state.editIndex) {
			return(
				<EditRow key={contact.id} contact={contact} changeMode={changeMode} editContact={editContact}/>
			)
		}
		return(
			<Row key={contact.id} index={index} contact={contact} changeMode={changeMode}/>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{listItems}
			</tbody>
		</table>
	)
}

export default ContactList;