import axios from "axios";
import { ITEMS_ROUTES } from "../routes";

export class ItemRequests {
  static async getItems(filters = "") {
    return await axios.get(`${ITEMS_ROUTES.items}${filters}`);
  }

  static async getTypesOfItems() {
    return await axios.get(`${ITEMS_ROUTES.itemTypes}`);
  }

  static async addItem({ name, description, isPrivate, type }) {
    return await axios.post(`${ITEMS_ROUTES.items}`, {
      name,
      description,
      private: isPrivate,
      type,
    });
  }
}