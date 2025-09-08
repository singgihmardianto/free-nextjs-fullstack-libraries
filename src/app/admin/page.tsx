import React from "react";
import { Menu } from "@/libraries/_entites/menu";
import MenuService from "@/libraries/_services/menuService";

export default async function AdminPage() {
  const menus: Menu[] = await (await MenuService()).index();
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">
        Welcome to the admin dashboard. Select an option from the sidebar to get started.
      </p>

      <ul className="list-disc pl-5">
        {menus.map(menu => (
          <li key={menu.id}>
            {menu.name} - {menu.path}
          </li>
        ))}
      </ul>
    </div>
  );
}
