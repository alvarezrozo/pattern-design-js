/**
 * usando UNICAMENTE los siguientes endpoints
 *
 *  https://jsonplaceholder.typicode.com/users/
 *  https://jsonplaceholder.typicode.com/users/1/posts
 *  https://jsonplaceholder.typicode.com/users/1/todos
 *  https://jsonplaceholder.typicode.com/posts/1/comments
 *
 *  crear un objeto/array resultante que le añada/quite cada
 *  una de la propiedades a las respuestas de la API de JSONPlaceholder
 *
 *  objeto ejemplo resultante: https://jsonkeeper.com/b/PIOF
 *
 *  consideraciones:
 *
 *  - no usar endpoints diferentes, los cuales van a traer todo el
 *    listado de posts, o todo el listado de to-dos
 *  - solo está permitido el uso de fetch para consumo de la API
 *  - tener en cuenta que el servidor los puede bannear si hacen
 *    muchas peticiones a la vez (puede que esto no suceda, pero
 *    puede que si, cómo solucionarlo?)
 *  - tener en cuenta que el JSON de ejemplo, solo muestra el caso
 *    para el usuario 1, con el post 1, el comment 1 y el todo 1.
 *    La idea es que vengan todos los usuarios, con los posts
 *    correspondientes, y comments etc etc
 */

//------------------------------------------------------------//

type typeRequest = "paginated" | "one-by-one" | "all";

//------------------------------------------------------------//

const transformUsers = (users: any) => {
  return users.map((user: any) => {
    const { id, name, username, email } = user;
    return { id, name, username, email };
  });
};

//------------------------------------------------------------//

enum ROUTES {
  DOMAIN = "https://jsonplaceholder.typicode.com/",
  USERS = "/users/",
  POSTS = "/posts/",
  COMMENTS = "/comments/",
  TODOS = "/todos/",
}

const Client = {
  get: function (endpoint: string) {
    return fetch(endpoint)
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};

const ENDPOINTS = {
  USERS: new URL(ROUTES.USERS, ROUTES.DOMAIN).href,
  POSTS_BY_USERS: function (id: string) {
    return new URL(ROUTES.USERS + id + ROUTES.POSTS, ROUTES.DOMAIN).href;
  },
  TODOS_BY_USERS: function (id: string) {
    return new URL(ROUTES.USERS + id + ROUTES.TODOS, ROUTES.DOMAIN).href;
  },
  COMMENTS_BY_POSTS: function (id: string) {
    return new URL(ROUTES.POSTS + id + ROUTES.COMMENTS, ROUTES.DOMAIN).href;
  },
};

const Collector = {
  users: [] as any[],
  posts: [] as any[],
  getUsers: async function () {
    this.users = transformUsers(await Client.get(ENDPOINTS.USERS));
  },
  getPostsByUser: async function (
    type: typeRequest,
    itemsPerPage: number | null = null
  ) {
    if (this.users.length === 0) throw new Error("Users list is empty");
    if (type === "paginated" && itemsPerPage === null)
      throw new Error("No items per page provided");

    if (type === "all") {
      const targetPromisesList: any = [];

      this.users.forEach((user: any) => {
        targetPromisesList.push(Client.get(ENDPOINTS.POSTS_BY_USERS(user.id)));
      });

      this.posts = (await Promise.all(targetPromisesList)).flat();


      this.setPostsToUsers()
    }
  },
  setPostsToUsers: function(){
    this.users = this.users.map((user: any) => ({
      ...user,
      posts: this.posts
        .filter((post: any) => post.userId === user.id)
        .map((e) => {
          const { id, title, body } = e;
          return { id, title, body };
        }),
    }));
  }
};

(async function main() {
  await Collector.getUsers();
  await Collector.getPostsByUser("all");

  console.log(Collector.users);
})();
