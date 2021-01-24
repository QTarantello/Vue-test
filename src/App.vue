<template>
  <main>
    <Modal @onAddUser="addUser" :users="state.users" />
    <Table @onSortUsers="sortUsers" :users="state.users" />
  </main>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import sortUsersUtil from "./components/composition/utils.js";
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
  const json = localStorage.getItem("state");

  let initial;
  if (json !== null) {
    initial = JSON.parse(json);
  } else {
    initial = {
      sortBy: {
        key: "name",
        direction: "asc",
      },
      users: [makeUser({ name: "Вася", phone: "8-800-555-35-35" })],
    };
  }

  return reactive(initial);
};

const reduceUsers = (users, { name, phone, parentUuid }) => {
  const newUser = makeUser({ name, phone });

  if (parentUuid === null) {
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

const reduceSortBy = (prevSortBy, key) => ({
  key,
  direction:
    prevSortBy.key === key
      ? prevSortBy.direction === "desc"
        ? "asc"
        : "desc"
      : prevSortBy.direction,
});

export default {
  name: "App",
  components: {
    Modal,
    Table,
  },
  setup() {
    const state = initialState();

    const addUser = (payload) => {
      state.users = reduceUsers(toRaw(state.users), payload);
      localStorage.setItem("state", JSON.stringify(toRaw(state)));
    };

    const sortUsers = (key) => {
      const sortBy = reduceSortBy(toRaw(state.sortBy), key);

      state.users = sortUsersUtil(toRaw(state.users), sortBy);
      state.sortBy = sortBy;

      localStorage.setItem("state", JSON.stringify(toRaw(state)));
    };

    return {
      state,
      addUser,
      sortUsers,
    };
  },
};
</script>

<style scoped></style>
