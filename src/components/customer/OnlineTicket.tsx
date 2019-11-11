import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Table } from 'react-bootstrap';


class OnlineTicket extends React.Component<{}, any> {
	
	constructor( props: any ) {
		super(props);
		this.state = {
			isLoading: false,
			tickets: []
			
		}
		
		this.renderTable = this.renderTable.bind(this);
	}
	
	public componentDidMount() {
		this.setState({isLoading: true});
		fetch("http://localhost:8080/api/tickets/alltickets")
			.then(response => response.json())
			.then(data => this.setState({tickets: data, isLoading: false}))
	}
	
	public renderTable( a: any ): JSX.Element {
		return <tr>
			<td>{ a.ticketId }</td>
			<td>{ a.passengerName }</td>
			<td>{ a.bookingDate }</td>
			<td>{ a.sourceStation }</td>
			<td>{ a.destStation }</td>
			<td>{ a.email }</td>
		</tr>
	}
	
	public render() {
		const {tickets, isLoading} = this.state;
		if ( isLoading ) {
			return <p>Loading...</p>
		}
		
		return (
			<>
			<h1> Passenger ticket details..</h1>
			<Table striped={ true } bordered={ true } hover={ true } variant={ "dark" }>
				<thead>
				<tr>
					<th>Ticket Id</th>
					<th>Passenger Name</th>
					<th>Booking Date</th>
					<th>Source Station</th>
					<th>Destination Station</th>
					<th>Email</th>
				</tr>
				</thead>
				<tbody>
				{ tickets.map(( ticket: any ) => this.renderTable(ticket)) }
				</tbody>
			</Table>
			
			</>
		)
	}
}

export default OnlineTicket;