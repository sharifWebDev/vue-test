<template>
  <div class="pagination d-flex justify-content-between align-items-center">
    <span>Showing {{ from }} to {{ to }} of {{ totalItems }}</span>

    <span class="d-flex align-items-center w-56">
      <span class="me-2 w-40">Per page</span>
      <select :value="perPage" @change="updatePerPage" class="form-select me-2 w-26">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="all">All</option>
      </select>
    </span>

    <span>Page {{ currentPage }} of {{ totalPages }}</span>

    <div id="pagination-container">
      <button
        @click="changePage(1)"
        :disabled="!paginationLinks.first"
        class="btn btn-secondary btn-sm"
      >
        First
      </button>

      <button
        @click="changePage(currentPage - 1)"
        :disabled="!paginationLinks.prev"
        class="btn btn-secondary btn-sm"
      >
        Previous
      </button>

      <span>
        <button
          v-for="page in paginationLinks.pages"
          :key="page"
          @click="changePage(page)"
          :class="{
            'btn-info': page === currentPage,
            'btn-secondary': page !== currentPage,
          }"
          class="btn btn-sm"
        >
          {{ page }}
        </button>
      </span>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="!paginationLinks.next"
        class="btn btn-secondary btn-sm"
      >
        Next
      </button>

      <button
        @click="changePage(totalPages)"
        :disabled="!paginationLinks.last"
        class="btn btn-secondary btn-sm"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  paginationLinks: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["change-page", "update:perPage"]);

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));
const from = computed(() => (props.currentPage - 1) * props.perPage + 1);
const to = computed(() => Math.min(props.currentPage * props.perPage, props.totalItems));

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("change-page", page);
  }
};

const updatePerPage = (event) => {
  const newPerPage = event.target.value === "all" ? props.totalItems : Number(event.target.value);
  emit("update:perPage", newPerPage);
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

#pagination-container button,
#pagination-container span .btn-secondary {
  padding: 3px 10px;
  margin: 0 2px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.3s ease;
}
</style>