'use client';

import React from 'react';

export default function SBIPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <form className="space-y-4">
          <div>
            <label htmlFor="person" className="block text-sm font-medium text-gray-700 mb-2">
              Select a person to give feedback to:
            </label>
            <select
              id="person"
              name="person"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a person...</option>
              <option value="john">John Henderson</option>
              <option value="sara">Sara Miller</option>
              <option value="susan">Susan Chen</option>
            </select>
          </div>

          <div>
            <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
              Situation
            </label>
            <input
              type="text"
              id="situation"
              name="situation"
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter the situation..."
            />
          </div>

          <label htmlFor="Behavior" className="block text-sm font-medium text-gray-700 mb-2">
            Behavior
          </label>
          <input
            type="text"
            id="Behavior"
            name="Behaivor"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="What was the person's behavior?"
          />

          <label htmlFor="Impact" className="block text-sm font-medium text-gray-700 mb-2">
            Impact
          </label>
          <input
            type="text"
            id="Impact"
            name="Impact"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="What was the impact of the behavior?"
          />

          <label htmlFor="Suggestion" className="block text-sm font-medium text-gray-700 mb-2">
            Suggestion
          </label>
          <input
            type="text"
            id="Suggestion"
            name="Suggestion"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="What suggestion do you want to share?"
          /> 

          <div className="mt-6">
            <label htmlFor="Severity" className="block text-sm font-medium text-gray-700 mb-2">
          Importance
          </label>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Needs attention</span>
              <span className="text-sm text-gray-600">Keep up the great work!</span>
            </div>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <input
                    type="radio"
                    id={`severity-${value}`}
                    name="severity"
                    value={value}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor={`severity-${value}`} className="mt-1 text-sm text-gray-700">
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Submit
          </button>
        </form>
        <p>You are logged in as Jeff</p>
      </div>
    </div>
  );
}
    