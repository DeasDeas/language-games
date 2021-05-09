import { ItemRequests } from "./requests";
import { standardErrorHandler } from "../errorHandlers";

export function getItems(
  filters = "?ordering=date_created&private=false|owner="
) {
  return ItemRequests.getItems(filters)
    .then((response) => {
      return response.data.reduce(
        (accum, item) => {
          accum.data.byIds[item.id] = item;
          accum.data.allIds.push(item.id);

          return accum;
        },
        {
          data: {
            byIds: {},
            allIds: [],
          },
          message: {
            texts: [`Accepted!`],
            type: "default",
            status: 0,
          },
        }
      );
    })
    .catch((error) => standardErrorHandler(error));
}

export function addItems({ name, description, isPrivate, type }) {
  return ItemRequests.addItem({ name, description, isPrivate, type })
    .then((response) => {
      return {
        data: response.data,
        message: {
          texts: [
            `Item with name "${response.data.name}" successfully created`,
          ],
          type: "default",
          status: 200,
        },
      };
    })
    .catch((error) => standardErrorHandler(error));
}

//not implemented yet!
export function getTypesOfItems() {
  return ItemRequests.getTypesOfItems();
}
