import { AuthRequests } from "./requests";
import {standardErrorHandler} from "../errorHandlers";

const user = {
  id: null,
  username: null,
  avatar: null,
  first_name: null,
  last_name: null,
};

export function login({ username, email, password }) {
  return AuthRequests.login({ username, email, password })
    .then((response) => {
      const user = response.data.user;
      delete Object.assign(user, { id: user["pk"] })["pk"];
      response.data.user = user;
      return response;
    })
    .then((response) => {
      return {
        message: {
          texts: [`Добро пожаловать, ${username}!`],
          type: "default",
          status: response.status,
        },
        data: response.data.user,
      };
    })
    .catch((error) => {
      const response = {
        data: user,
        message: { texts: [""], type: "error", status: error.response.status },
      };
      switch (error.response.status) {
        case 400: {
          response.message.texts = [`Неверный логин или пароль.`];
          return response;
        }
        case 500: {
          response.message.texts = [`Внутренняя ошибка сервера.`];
          return response;
        }
        default: {
          response.message.texts = [`Непредусмотренное исключение.`];
          return { message: response };
        }
      }
    });
}

export function logout() {
  return AuthRequests.logout()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

export function register({ username, email, password1, password2 }) {
  return AuthRequests.register({ username, email, password1, password2 })
    .then((response) => ({
      data: true,
      message: {
        texts: [
          `Для завершения регистрации пройдите по ссылке, отправленной на указанную электронную почту.`,
        ],
        type: "default",
        status: response.status,
      },
    }))
    .catch((error) =>
      standardErrorHandler(error)
    );
}

export function getUser() {
  return AuthRequests.getUser()
    .then((response) => {
      const user = response.data;
      delete Object.assign(user, { id: user["pk"] })["pk"];
      response.data = user;
      return response;
    })
    .then((response) => {
      return {
        data: response.data,
        message: {
          texts: [
            `Для завершения регистрации пройдите по ссылке, отправленной на указанную электронную почту.`,
          ],
          type: "default",
          status: response.status,
        },
      };
    })
    .catch(async (error) => {
      switch (error.response.status) {
        case 401: {
          const isRefreshed = await AuthRequests.verify()
            .then(() => {
              return true;
            })
            .catch(() => false);
          const newUser = isRefreshed ? await getUser() : user;

          return {
            data: newUser,
            message: {
              texts: [
                `Для завершения регистрации пройдите по ссылке, отправленной на указанную электронную почту.`,
              ],
              type: "error",
              status: error.response.status,
            },
          };
        }
        default: {
          return {
            data: user,
            message: {
              texts: [
                `Для завершения регистрации пройдите по ссылке, отправленной на указанную электронную почту.`,
              ],
              type: "error",
              status: error.response.status,
            },
          };
        }
      }
    });
}