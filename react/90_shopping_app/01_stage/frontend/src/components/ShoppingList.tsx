import {useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface State {
	removeIndex:number;
	editIndex:number;
}

interface Props {
	list:ShoppingItem[];
	remove(id:number):void;
	edit(item:ShoppingItem):void;
}

const ShoppingList = (props:Props) => {
		
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode = (mode:string,index:number) => {
		switch(mode) {
			case "remove": {
				setState({
					removeIndex:index,
					editIndex:-1
				})
				return;
			}
			case "edit": {
				setState({
					removeIndex:-1,
					editIndex:index
				})
				return;
			}
			case "cancel": {
				setState({
					removeIndex:-1,
					editIndex:-1
				})
				return;
			}
			default:
				return;
		}
	}
	
	const remove = (id:number) => {
		props.remove(id);
		changeMode("cancel",0);
	}
	
	const edit = (item:ShoppingItem) => {
		props.edit(item);
		changeMode("cancel",0);
	}
	
	const listItems = props.list.map((item,index) => {
		if(index === state.removeIndex) {
			return (
				<RemoveRow  key={item.id} item={item} changeMode={changeMode} remove={remove}/>
			)
		}
		if(index === state.editIndex) {
			return (
				<EditRow key={item.id} item={item} changeMode={changeMode} edit={edit}/>
			)
		}
		return(
			<Row key={item.id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
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

export default ShoppingList;