<template>
  <div class="button-container">
    <button class="button" @click="toggleModal()">Добавить</button>
  </div>
  <div v-if="modalOpened" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h1>Новый пользователь</h1>
        <span @click="toggleModal()" class="close-button">X</span>
      </div>
      <div class="modal-body">
        <div class="modal-body__name">
          <label class="label">Имя</label>
          <input class="input" v-model="name" type="text" />
          <div v-if="errors.name !== null">{{ errors.name }}</div>
        </div>
        <div class="modal-body__phone">
          <label class="label">Телефон</label>
          <input class="input" v-model="phone" type="text" />
          <div v-if="errors.phone !== null">{{ errors.phone }}</div>
        </div>
        <div class="modal-body__parent">
          <label class="label">Начальник</label>
          <select class="select" v-model="parentUuid">
            <option
              v-for="user in users"
              v-bind:value="user.uuid"
              :key="user.uuid"
            >
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="submit-button">
          <button class="button" @click="onAddUser">Сохранить</button>
        </div>
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
.modal {
  display: flex;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
}

.modal-content {
  height: 400px;
  width: 450px;
  background: #fff;
  margin: auto;
}

.modal-header {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.modal-body {
  margin-top: 30px;
}

.modal-body__name {
  padding: 30px;
}

.input {
  padding: 0.5em 0.6em;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box;
  margin-left: 50px;
  width: 250px;
}

.label {
  color: #777;
}

.modal-body__phone {
  padding: 30px;
}

.modal-body__parent {
  padding: 30px;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.select {
  width: 250px;
  height: 2.25em;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0.5em 0.6em;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box;
  margin-left: 36px;
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

.submit-button {
  margin-left: 30px;
}

.close-button {
  cursor: pointer;
}
</style>
