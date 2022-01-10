import { TaskRequests } from "./requests";
import { standardErrorHandler } from "../errorHandlers";

export function getTasks(
  filters = ``
) {
  return TaskRequests.getItems(filters)
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

export function addTask({ name, description, isPrivate, game_type }) {
  return TaskRequests.addItem({ name, description, isPrivate, game_type })
    .then((response) => {
      return {
        data: response.data,
        message: {
          texts: [
            `Item with name "${response.data.name}" successfully created`,
          ],
          type: "default",
          status: response.status,
        },
      };
    })
    .catch((error) => standardErrorHandler(error));
}

export function deleteTask({ id }) {
  return TaskRequests.deleteItem({ id })
    .then((response) => {
      return {
        data: null,
        message: {
          texts: [
            `Item with id "${id}" successfully deleted`,
          ],
          type: "default",
          status: response.status,
        },
      };
    })
    .catch((error) => standardErrorHandler(error));
}

export function changeTask(task) {
    !task?.name && delete (task?.name)
    !task?.description && delete (task?.description)
    delete (task?.owner_name)
    delete (task?.type)
    TaskRequests.changeItem(task)
}

//not implemented yet!
export function getTypesOfItems() {
  return TaskRequests.getTypesOfItems();
}
