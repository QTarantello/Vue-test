<template>
  <div class="table">
    <div class="table-head">
      <div @click="sort('name')" class="table-head__cell">Имя</div>
      <div @click="sort('phone')" class="table-head__cell">Телефон</div>
    </div>

    <div class="table-body">
      <div v-for="user in users" :key="user.uuid" class="table-row">
        <div>
          <div class="table-row__cell">{{ user.name }}</div>
          <div class="table-row__cell">{{ user.phone }}</div>
        </div>
        <div v-for="child in user.children" :key="child.uuid" class="table-row">
          <div>
            <div class="table-row__cell">{{ child.name }}</div>
            <div class="table-row__cell">{{ child.phone }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["users"],
  emits: ["onSortUsers"],

  setup(_, { emit }) {
    const sort = (key) => emit("onSortUsers", key);
    return { sort };
  },
};
</script>

<style scoped>
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
