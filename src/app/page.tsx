"use client";
import { useState, FormEvent } from "react";

// Define types for the response data
interface PracticalData {
  roll: number;
  name: string;
  subject: string;
  group: string;
  date: string;
  slot: string;
  day: string;
}

export default function Home() {
  const [userId, setUserId] = useState<string>("");
  const [data, setData] = useState<PracticalData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError(null);

      const response = await fetch(
        `https://practical.natimerry.com/get?id=${userId}`
      );
      const result: PracticalData[] = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        throw new Error("Failed to fetch data");
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Practical Schedule
        </h1>

        {/* Input for user ID */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="userId"
              className="block text-black font-medium"
            >
              Enter Board Roll Number:
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>

        {/* Display error message if any */}
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {/* Table to display data */}
        {data.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full mt-6 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left text-black ">
                    Roll Number
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Subject
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Group
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Slot
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-black">
                    Day
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                  >
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.roll}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.subject}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.group}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.slot}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {item.day}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
