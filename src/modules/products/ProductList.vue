<template>
  <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center flex justify-content-between">
        <div class="col">
          <div class="page-pretitle">Overview</div>
          <h2 class="page-title">Products</h2>
        </div>
        <div class="col-auto">
          <router-link to="/products/add" class="btn btn-primary"
            >Add Product</router-link
          >
        </div>
      </div>
    </div>
  </div>

  <div class="page-body {{ $class }}">
    <div class="container-xl">
      <div class="row row-deck row-cards">
        <div class="col-12">
          <div class="card">
            <div
              class="card-header d-flex align-items-center justify-content-between"
            >
              <h3 class="card-title">Products List</h3>
              <div class="filters d-flex">
                <div class="col-md-6">
                  <div class="d-flex">
                    <label for="date" class="form-label my-1 px-2"
                      >Search</label
                    >
                    <div class="form-group has-search">
                      <input
                        v-model="store.searchQuery"
                        @input="applyFilters"
                        placeholder="Search..."
                        id="search"
                        class="form-control"
                      />
                      <span class="invalid-feedback">{{ $message }}</span>
                    </div>
                  </div>
                </div>
                <div class="filters d-flex">
                  <div class="d-flex align-items-center form-group">
                    <label for="date" class="form-label my-1 px-2">Date</label>
                    <select
                      v-model="store.selectedCategory"
                      @change="applyFilters"
                      class="form-select"
                    >
                      <option value="">All Categories</option>
                      <option
                        v-for="cat in store.categories"
                        :key="cat.id"
                        :value="cat.id"
                        id="search"
                        class="form-control"
                      >
                        {{ cat.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loader -->
            <div v-if="store.loading" class="loaderw">
              <tableSkeleton />
            </div>

            <div class="table-responsive" v-else>
              <table
                class="table table-vcenter card-table datatable"
                id="{{ $table_id }}"
              >
                <thead>
                  <tr>
                    <th>title</th>
                    <th>price</th>
                    <th>discount</th>
                    <th>stock</th>
                    <th>category</th>
                    <th>subcategory</th>
                    <th>brand</th>
                    <th>sku</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <ProductItem
                    v-for="product in paginatedProducts"
                    :key="product.id"
                    :product="product"
                    @edit="editProduct"
                    @view="viewProduct"
                    @delete="deleteProduct"
                  />
                </tbody>
              </table>

              <div
                class="pagination d-flex justify-content-between align-items-center"
              >
              <span>Showing {{ store.from }} to {{ store.to }} of {{ store.totalProducts }}</span>

                <span>Page {{ store.currentPage }} of {{ totalPages }}</span>
                <div>
                  <button
                    @click="prevPage"
                    :disabled="store.currentPage === 1"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Previous
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="store.currentPage === totalPages"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import ProductItem from "@/components/ProductItem.vue";
import { useRouter } from "vue-router";
import tableSkeleton from "@/components/core/Skeleton.vue";

const store = useProductStore();
const router = useRouter();

onMounted(() => {
  store.fetchProducts(); // ✅ Load initial products
  store.fetchCategories();
});

// ✅ Get filtered and paginated products
const filteredProducts = computed(() => store.filteredProducts);
const paginatedProducts = computed(() => {
  const startIndex = (store.currentPage - 1) * store.perPage;
  const endIndex = startIndex + store.perPage;
  return filteredProducts.value.slice(startIndex, endIndex);
});

// ✅ Pagination controls
const totalPages = computed(() => store.totalPages);
const prevPage = () => {
  if (store.currentPage > 1) {
    store.fetchProducts(store.currentPage - 1);
  }
};
const nextPage = () => {
  if (store.currentPage < totalPages.value) {
    store.fetchProducts(store.currentPage + 1);
  }
};

// ✅ Apply filters without resetting pagination
const applyFilters = () => {
  store.currentPage = 1;
  store.fetchProducts();
};

const editProduct = (product) => router.push(`/products/edit/${product.id}`);
const viewProduct = (product) => router.push(`/products/view/${product.id}`);
const deleteProduct = (productId) => store.deleteProduct(productId);
</script>
