<template>
  <div>
    <button @click="toggleModal()">Click me</button>
  </div>
  <div v-if="modalOpened" class="modal">
    <div class="content">
      <div class="header">
        <h1>Новый пользователь</h1>
        <span @click="toggleModal()" class="close">X</span>
      </div>
      <div class="body">
        <div class="name">
          <label>Имя</label>
          <input v-model="name" type="text" />
        </div>
        <div class="phone">
          <label>Телефон</label>
          <input v-model="phone" type="text" />
        </div>
        <ul class="task-list my-list">
          <select v-model="parentUuid">
            <option
              v-for="user in users"
              v-bind:value="user.uuid"
              :key="user.uuid"
            >
              {{ user.name }}
            </option>
          </select>
        </ul>
        <button @click="onAddUser">Add person</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["users"],
  emits: ["onAddUser"],

  setup(_, { emit }) {
    const modalOpened = ref(false);

    const toggleModal = () => (modalOpened.value = !modalOpened.value);

    const name = ref("");
    const phone = ref("");
    const parentUuid = ref(null);

    const onAddUser = () => {
      toggleModal();

      emit("onAddUser", {
        name: name.value,
        phone: phone.value,
        parentUuid: parentUuid.value,
      });

      name.value = "";
      phone.value = "";
      parentUuid.value = null;
    };

    return {
      modalOpened,
      toggleModal,
      onAddUser,
      name,
      phone,
      parentUuid,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  align-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
}

.content {
  min-width: 370px;
  width: 600px;
  background: #fff;
  margin: auto;
}

.header {
  display: flex;
  align-content: space-between;
}

.body {
  display: flex;
  align-content: space-between;
}

.close {
  cursor: pointer;
}
</style>
