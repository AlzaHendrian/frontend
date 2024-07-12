import { useEffect, useState } from "react";
import { User } from "../../typescript";
import { getAllUsers } from "../../services/dataService";
import { API } from "../../api/api";

interface Data {
    id: number;
    name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    password: string;
    role?: string;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const AdminPage = () => {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await API.get('users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }

                });

                if (!response.data) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data, "<<<< data json");
                setData(response.data.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="overflow-x-auto p-8">
            <h1 className="text-[24px] font-bold py-4">Data user</h1>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">ID</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Name</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Date Of Birth</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Gender</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-bold uppercase text-sm text-left">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user, id) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border">{user.id}</td>
                            <td className="py-2 px-4 border">{`${user.name === '' ? 'Admin' : user.name} ${user.last_name}`}</td>
                            <td className="py-2 px-4 border">{user.date_of_birth === '' ? '-' : user.date_of_birth}</td>
                            <td className="py-2 px-4 border">{user.gender === '' ? '-' : user.gender}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage