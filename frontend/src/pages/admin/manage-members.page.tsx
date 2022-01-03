import { FunctionalComponent } from "preact";
// import { MemberAdminView }  from "../../components/member/member.admin-view";
import { Link } from "react-router-dom";
import EditIcon from "remixicon-react/EditLineIcon";
import { gql, useQuery } from "@apollo/client";

const GET_MEMBERS = gql`query Members {
	members {
		id
		firstname 
		lastname
		nickname
	}
}`;

export const ManageMembers: FunctionalComponent = () => {
	const { loading, error, data } = useQuery(GET_MEMBERS);

	const mapRows = ({ members }) => data.members.map(({ firstname, lastname, nickname, id }) => (
		<tr key={id}>
			<td className="p-2 grid">
				<span className="text-md">{ firstname } { lastname }</span>
				<span className="text-gray-600">{ nickname }</span>
			</td>
			<td>
				<ul className="p-2 flex gap-4">
				</ul>
			</td>
			<td className="p-2 text-blue-600 hover:text-blue-900">
				<Link className="flex flex-row-reverse" to={id}>
					<span className="p-2 hover:rounded-2xl hover:bg-gray-200">
						<EditIcon className="bg-gray"/>
					</span>
				</Link>
			</td>
		</tr>
	));

	return (
		<>
			<table className="min-w-full divide-y">
				<thead className="text-left text-gray-600 text-sm">
					<tr>
						<th className="p-2">Naam & Totem</th>
						<th className="p-2">Groepen</th>
						<th className="p-2 sr-only">actions</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{ loading && 'Loading' }
					{ error && 'Something went wrong' }
					{ data && mapRows(data) }
				</tbody>
			</table>


		</>
	);
}
// <MemberAdminView />
