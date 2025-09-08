import { Menu } from "@/libraries/_entites/menu";
import AbstractService from "./AbstractService";

export default async function MenuService() {
  const service = await AbstractService<Menu>(Menu);
  return service;
}
