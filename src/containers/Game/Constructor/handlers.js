import {deleteTask} from "../../../api/tasks";


export function deleteItemById({ id, redirectHandler }) {
    deleteTask({id})
        .then(r => {
            redirectHandler()
            window.location.reload()
        })
 }