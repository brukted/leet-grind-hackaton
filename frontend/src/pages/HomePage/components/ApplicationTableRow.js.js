import React, { useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "./TabItem";

const ApplicationTableRow = ({ name, date, status }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {status === "Pending" && (
          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            {status}
          </span>
        )}
        {status === "Accepted" && (
          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {status}
          </span>
        )}
        {status === "Rejected" && (
          <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
            {status}
          </span>
        )}
      </td>
    </tr>
  );
};

export default ApplicationTableRow;
