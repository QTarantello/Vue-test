<template>
  <div class="add-button-container">
    <button @click="toggleModal()">Добавить</button>
  </div>
  <div v-if="modalOpened" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Добавление пользователя</h3>
        <span @click="toggleModal()" class="close-button">x</span>
      </div>
      <div class="modal-body">
        <div class="modal-body__name">
          <label>Имя</label>
          <input v-model="name" type="text" />
          <div class="errors-container" v-if="errors.name !== null">
            {{ errors.name }}
          </div>
        </div>
        <div class="modal-body__phone">
          <label>Телефон</label>
          <input v-model="phone" type="text" />
          <div class="errors-container" v-if="errors.phone !== null">
            {{ errors.phone }}
          </div>
        </div>
        <div class="modal-body__parent">
          <label class="modal-body__parent--label">Начальник</label>
          <select v-model="parentUuid">
            <option
              v-for="user in users"
              v-bind:value="user.uuid"
              :key="user.uuid"
            >
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="submit-button-container">
          <button @click="onAddUser">Сохранить</button>
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
      if (modalOpened.value) {
        parentUuid.value = null;
      }
      clear();
    };

    const onAddUser = () => {
      const trimmedName = name.value.trim();
      const errorInName = trimmedName.length === 0;

      const trimmedPhone = phone.value.trim();
      const errorInPhone = trimmedPhone.length === 0;

      if (errorInName || errorInPhone) {
        errors.value = {
          name: errorInName ? "Поле не может быть пустым" : null,
          phone: errorInPhone ? "Поле не может быть пустым" : null,
        };
      } else {
        toggleModal();

        emit("onAddUser", {
          name: trimmedName,
          phone: trimmedPhone,
          parentUuid: parentUuid.value,
        });
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
  flex-direction: column;
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
  justify-content: space-between;
  margin: 25px 40px 0 30px;
  align-items: center;
  font-size: 18px;
}

.modal-body {
  position: relative;
  margin-top: 65px;
}

.modal-body__name,
.modal-body__phone,
.modal-body__parent {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin: 0 40px 40px 0;
}

.modal-body__parent--label {
  color: #777;
  margin-right: 13px;
}

.close-button {
  cursor: pointer;
}

.errors-container {
  position: absolute;
  margin: 35px 0 0 100px;
  font-size: 15px;
  color: rgba(255, 0, 0, 0.616);
}

.add-button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.submit-button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 370px;
  margin: 0 auto;
  padding: 10px;
}

label {
  color: #777;
}

button {
  font-size: 100%;
  padding: 0.5em 1em;
  color: rgba(0, 0, 0, 0.8);
  border: transparent;
  background-color: #e6e6e6;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

input {
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

select {
  width: 250px;
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
</style>
