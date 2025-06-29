"use client";
import React, { useState, useMemo } from "react";
import { User } from "@/lib/dal/userDAL";
import UserCard from "@/app/UserCard";

interface FindPartnersSectionProps {
  users: User[];
  nameOptions: string[];
  memberIdOptions: string[];
  cityOptions: string[];
}

export const dynamic = "force-dynamic";
export default function FindPartnersSection({ users, nameOptions, memberIdOptions, cityOptions }: FindPartnersSectionProps) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Filtering logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const fullName = [user.firstname, user.middlename, user.lastname].filter(Boolean).join(" ");
      const matchesName = !selectedName || fullName === selectedName;
      const matchesMemberId = !selectedMemberId || String(user.id) === selectedMemberId;
      const matchesCity = !selectedCity || user.city === selectedCity;
      return matchesName && matchesMemberId && matchesCity;
    });
  }, [users, selectedName, selectedMemberId, selectedCity]);

  // Only show cards if a filter is selected
  const anyFilterSelected = selectedName || selectedMemberId || selectedCity;

  return (
    <div className="bg-white rounded shadow p-6 w-full mb-8">
      <h2 className="text-lg font-semibold mb-4">Find Partners</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <select className="border rounded px-3 py-2 w-48" value={selectedName} onChange={e => setSelectedName(e.target.value)}>
            <option value="">All</option>
            {nameOptions.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Member ID</label>
          <select className="border rounded px-3 py-2 w-32" value={selectedMemberId} onChange={e => setSelectedMemberId(e.target.value)}>
            <option value="">All</option>
            {memberIdOptions.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <select className="border rounded px-3 py-2 w-40" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">All</option>
            {cityOptions.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      {anyFilterSelected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.length === 0 ? (
            <div className="col-span-full text-gray-500">No partners found.</div>
          ) : (
            filteredUsers.map(user => <UserCard key={user.id} user={user} />)
          )}
        </div>
      )}
    </div>
  );
}
