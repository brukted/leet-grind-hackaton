import React from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";

const ApplicationTableRow = ({ rows }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {row.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {row.date}
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              {row.status === "Pending" && (
                <span className="inline-flex px-2 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                  {row.status}
                </span>
              )}
              {row.status === "Accepted" && (
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  {row.status}
                </span>
              )}
              {row.status === "Rejected" && (
                <span className="inline-flex px-2 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                  {row.status}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTableRow;
