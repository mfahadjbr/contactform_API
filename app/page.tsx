'use client'
import { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    contactNum: string;
    address: string;
}

export default function Page() {
    const [apidata1, setApiData] = useState<User[]>([]);
    const [id, setID] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [contactNum, setContact] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setID(e.target.value);
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContact(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userObj: User = {
            id: id,
            name: name,
            contactNum: contactNum,
            address: address
        };
        
        const requestBackend = await fetch("http://localhost:3000/myapi/users1", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (requestBackend.ok) {
            fetchApiData(); // Refresh the data after submission
        } else {
            console.error("Failed to submit data", requestBackend.status);
        }
    };

    useEffect(() => {
        fetchApiData();
    }, []);

    const fetchApiData = async () => {
        const usersData = await fetch("http://localhost:3000/myapi/users1");
        const data1: User[] = await usersData.json();
        setApiData(data1);
    };

    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="bg-gray-300 p-6 rounded-2xl shadow-md w-[400px] mt-10">
                    <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
                    <div className="mb-4">
                        <label className="block text-xl font-medium text-black" htmlFor="id">ID</label>
                        <input
                            type="text"
                            name="id"
                            id="id"
                            onChange={handleId}
                            required
                            className="mt-1 block w-full border-gray-300 h-9 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-medium text-black" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleName}
                            required
                            className="mt-1 block w-full border-gray-300 h-9 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-medium text-black" htmlFor="contactNumber">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            onChange={handleNumber}
                            required
                            className="mt-1 block w-full border-gray-300 h-9 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xl font-medium text-black" htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            onChange={handleAddress}
                            required
                            className="mt-1 block w-full border-gray-300 h-9 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 mt-4 bg-gray-800 text-white font-semibold rounded-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="flex items-center justify-center mt-10">
                <div className="overflow-x-auto w-full max-w-4xl">
                    <table className="min-w-full bg-white shadow-2xl rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Contact Number</th>
                                <th className="py-3 px-4 text-left">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apidata1.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">{user.id}</td>
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.contactNum}</td>
                                    <td className="py-3 px-4">{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
