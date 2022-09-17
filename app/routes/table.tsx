import { Link, useLoaderData, useFetcher } from '@remix-run/react';
import type { ActionArgs} from "@remix-run/node";

import { getAllUsers, update } from '~/data';
// @ts-expect-error
import sortBy from 'sort-by';

export function loader({ request }: { request: Request }) {
  const users = getAllUsers();
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort') || 'asc';
  const by = url.searchParams.get('by') || 'firstName';
  return {
    users: users.sort(sortBy(sort === 'asc' ? by : `-${by}`)),
    sort,
    by,
  };
}

export async function action({request}: ActionArgs) {
  const formData = await request.formData();
  const checked = formData.get("checked");
  const id = formData.get("id");
  update(id, checked);
}

function SortLink({
  field,
  children,
}: {
  field: string;
  children: React.ReactNode;
}) {
  const { sort, by } = useLoaderData();
  const isActive = by === field;
  const sortParam = !isActive ? sort : sort === 'asc' ? 'desc' : 'asc';
  return (
    <Link
      to={`?sort=${sortParam}&by=${field}`}
      style={{ color: isActive ? 'red' : 'inherit' }}
    >
      {children} {sort === 'asc' ? '↓' : '↑'}
    </Link>
  );
}

export default function Table() {
  const fetcher = useFetcher();
  const { users, sort, by } = useLoaderData();
  const linkSort = sort === 'asc' ? 'desc' : 'asc';
  return (
    <table>
      <thead>
        <th>
          <td>
            <SortLink field="firstName">First Name</SortLink>
          </td>
        </th>
        <th>
          <td>
            <SortLink field="lastName">Last Name</SortLink>
          </td>
        </th>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td><input type="checkbox" onChange={(x) => {
              fetcher.submit({id: user.id, checked: x.currentTarget.checked}, {method: "post", action: "/table", replace: false})
            }}></></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
