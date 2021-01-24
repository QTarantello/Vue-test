<template>
  <div class="button-container">
    <button class="button" @click="toggleModal()">Добавить</button>
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
          <div v-if="errors.name !== null">{{ errors.name }}</div>
        </div>
        <div class="phone">
          <label>Телефон</label>
          <input v-model="phone" type="text" />
          <div v-if="errors.phone !== null">{{ errors.phone }}</div>
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
        <button @click="onAddUser">Сохранить</button>
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

    const name = ref("");
    const phone = ref("");
    const parentUuid = ref(null);
    const errors = ref({
      name: null,
      phone: null,
    });

    const clear = () => {
      name.value = "";
      phone.value = "";
      errors.value = {
        name: null,
        error: null,
      };
    };

    const toggleModal = () => {
      modalOpened.value = !modalOpened.value;
      if (!modalOpened.value) {
        clear();
      }
    };

    const onAddUser = () => {
      const trimmedName = name.value.trim();
      const errorInName = trimmedName.length === 0;

      const trimmedPhone = phone.value.trim();
      const errorInPhone = trimmedPhone.length === 0;

      if (errorInName || errorInPhone) {
        errors.value = {
          name: errorInName ? "Имя не может быть пустым" : null,
          phone: errorInPhone ? "Телефон не может быть пустым" : null,
        };
      } else {
        toggleModal();

        emit("onAddUser", {
          name: trimmedName,
          phone: trimmedPhone,
          parentUuid: parentUuid.value,
        });

        clear();
      }
    };

    return {
      errors,
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
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  font-size: 100%;
  padding: 0.5em 1em;
  color: rgba(0, 0, 0, 0.8);
  border: transparent;
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 2px;
}

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
