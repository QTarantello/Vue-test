<template>
  <main>
    <Table :sortBy="sortBy" @sortUsers="sortUsers" :users="users"></Table>
    <Modal @onAddUser="addUser" :users="users" />
  </main>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import useSorting from "./components/composition/useSorting";
import Modal from "./components/Modal.vue";
import Table from "./components/Table.vue";

import { reactive, toRaw } from "vue";

const makeUser = ({ name, phone }) => ({
  uuid: uuidv4(),
  name,
  phone,
  children: [],
});

const initialState = () => {
  const state = localStorage.getItem("state");
  if (state !== null) {
    return JSON.parse(state);
  } else {
    return {
      sortBy: {
        key: "name",
        direction: "asc",
      },
      users: [makeUser({ name: "Вася", phone: "8-800-555-35-35" })],
    };
  }
};

const reduceUsers = (users, { name, phone, parentUuid }) => {
  const newUser = makeUser({ name, phone });

  if (parentUuid === null) {
    console.log(users);
    return [...users, newUser];
  } else {
    return users.map((user) => {
      if (user.uuid === parentUuid) {
        return { ...user, children: [...user.children, newUser] };
      } else {
        return user;
      }
    });
  }
};

export default {
  name: "App",
  components: {
    Modal,
    Table,
  },

  setup() {
    const initial = initialState();
    const state = reactive(initial);

    const addUser = (payload) => {
      state.users = reduceUsers(toRaw(state.users), payload);
      localStorage.setItem("state", JSON.stringify(toRaw(state)));
    };

    const sortUsers = (sortBy) => {
      state.sortBy = sortBy;
      state.users = useSorting(toRaw(state.users), sortBy);
    };

    return {
      sortBy: state.sortBy,
      users: state.users,
      addUser,
      sortUsers,
    };
  },
};
</script>

<style scoped>
.task-list {
  list-style: none;
}
</style>
