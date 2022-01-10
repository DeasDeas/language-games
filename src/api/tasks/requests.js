import axios from "axios";
import { ITEMS_ROUTES } from "../routes";

export class TaskRequests {
  static async getItems(filters = "?ordering=-date_created&filters=(private%253Dfalse)") {
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

  static async deleteItem({ id }) {
    return await axios.delete(`${ITEMS_ROUTES.items}/${id}`);
  }

  static async changeItem(task) {
    console.log(task)
    return await axios.patch(`${ITEMS_ROUTES.items}${task.id}`, task);
  }
}