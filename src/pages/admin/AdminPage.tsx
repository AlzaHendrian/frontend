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
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:5000/api/v1/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.data, "<<<< data json")
                setData(jsonData.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="overflow-x-auto">
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
                    {data && data.map((user) => (
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