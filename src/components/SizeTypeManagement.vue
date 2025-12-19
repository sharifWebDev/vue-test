<template>
  <div class="mb-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-semibold text-gray-700 dark:text-white">Product Size Types</h1>
      </div>
      <Breadcrumb />
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 p-3 rounded-lg"> 
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <div>
        <button @click="openCreateModal"
          class="btn px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors">
          <i class="fas fa-plus"></i>
          <span>Create New</span>
        </button>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto"> 
        <div class="relative flex-grow max-w-md">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-gray-600 outline-none transition-all focus:shadow-sm" />
          <div class="absolute left-3 top-2.5 text-gray-400">
            <i class="fas fa-search text-base"></i>
          </div>
        </div>
        <button v-if="searchQuery" @click="clearSearch"
          class="p-2 text-gray-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all border border-gray-200 active:scale-95">
          <i class="fas fa-sync-alt text-base"></i>
        </button>
      </div>
    </div>

    <div v-if="sizeTypeStore.loading && sizeTypeStore.sizeTypes.length === 0" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading size types...</p>
    </div>
 
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SL
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Code & Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sequence
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(data, index) in sizeTypeStore.sizeTypes" :key="data.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ calculateRowNumber(index) }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <div class="flex-shrink-0 h-12 w-12">
                  <img v-if="data.image" :src="data.image" :alt="data.name"
                    class="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700">
                  <div v-else
                    class="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <i class="fas fa-ruler text-gray-400"></i>
                  </div>
                </div>
              </td>
              <td class="px-6 py-3">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ data.code }}
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  {{ data.name }}
                </div>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white px-2">
                    {{ data.sequence }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span :class="[
                    data.is_active === 1 || data.is_active === true
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                    'px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                  ]">
                    {{ data.is_active === 1 || data.is_active === true ? "Active" : "Inactive" }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ data.created_at_formatted || formatDate(data.created_at) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ data.created_at_human || getHumanDate(data.created_at) }}
                </div>
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-sm font-medium text-right">
                <div class="flex justify-end space-x-2">
                
                <button
                  @click="toggleStatus(data)"
                  class="p-1 rounded bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors"
                  title="Toggle Status"
                >
                  <span
                    :class="[
                      'relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-300',
                      data.is_active === 1 || data.is_active === true
                        ? 'bg-green-500'
                        : 'bg-gray-400 dark:bg-gray-600'
                    ]"
                  >
                    <span
                      :class="[
                        'inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300',
                        data.is_active === 1 || data.is_active === true
                          ? 'translate-x-3.5'
                          : 'translate-x-0.5'
                      ]"
                    ></span>
                  </span>
                </button>
    
                  <button @click="viewSizeType(data)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded bg-blue-50 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    title="View">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="editSizeType(data)"
                    class="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 p-1 rounded bg-yellow-50 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                    title="Edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="confirmDelete(data)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded bg-red-50 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="sizeTypeStore.sizeTypes.length === 0 && !sizeTypeStore.loading" class="h-[55vh] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="text-gray-500 dark:text-gray-400">
                  <i class="fas fa-ruler text-3xl mb-4"></i>
                  <p class="text-lg font-medium">No size types found</p>
                  <p class="mt-1">Get started by adding your first size type</p>
                  <button @click="openCreateModal"
                    class="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add Size Type
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <Pagination v-if="sizeTypeStore.pagination.total > 0" :total-items="sizeTypeStore.pagination.total"
        :per-page="perPage" :current-page="currentPage" :last-page="sizeTypeStore.pagination.last_page"
        @update:perPage="handlePerPageChange" @update:currentPage="goToPage" />
    </div>

    <!-- Create/Edit Modal -->
    <BaseModal :show="isModalOpen" maxWidth="xl" :title="modalMode === 'create' ? 'Add New Size Type' : 'Edit Size Type'"
      @close="closeModal">
      <form @submit.prevent="handleSubmit" class="px-6 py-3">
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Code -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input v-model="formData.code" type="text" required
              @input="clearValidationError('code')"
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors',
                sizeTypeStore.validationErrors.code 
                  ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-gray-500'
              ]"
              placeholder="Enter size type code (e.g., PSZT-001)">
            <p v-if="sizeTypeStore.validationErrors.code" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ sizeTypeStore.validationErrors.code[0] }}
            </p>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Unique identifier for the size type
            </p>
          </div>

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span class="text-red-500 dark:text-red-400">*</span>
            </label>
            <input v-model="formData.name" type="text" required
              @input="clearValidationError('name')"
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors',
                sizeTypeStore.validationErrors.name 
                  ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-gray-500'
              ]"
              placeholder="Enter size type name">
            <p v-if="sizeTypeStore.validationErrors.name" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ sizeTypeStore.validationErrors.name[0] }}
            </p>
          </div>

          <!-- Sequence -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sequence
            </label>
            <input v-model="formData.sequence" type="number" min="1"
              @input="clearValidationError('sequence')"
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors',
                sizeTypeStore.validationErrors.sequence 
                  ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 text-gray-900 dark:text-white' 
                  : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-gray-500'
              ]"
              placeholder="Enter display sequence">
            <p v-if="sizeTypeStore.validationErrors.sequence" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ sizeTypeStore.validationErrors.sequence[0] }}
            </p>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Lower numbers appear first
            </p>
          </div>

          <!-- Image -->
          <div class="lg:col-span-1">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image
            </label>
            <div class="flex items-center space-x-4">
              <div v-if="previewImage" class="relative">
                <img :src="previewImage" alt="Preview"
                  class="h-24 w-24 rounded-lg object-cover border border-gray-200 dark:border-gray-700">
                <button @click="removeImage" type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
              <div v-else-if="currentSizeType?.image" class="relative">
                <img :src="currentSizeType.image" :alt="currentSizeType.name"
                  class="h-24 w-24 rounded-lg object-cover border border-gray-200 dark:border-gray-700">
                <button @click="removeImage" type="button"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
              <div>
                <label for="size-type-image"
                  class="cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors inline-flex items-center">
                  <i class="fas fa-upload mr-2"></i>
                  {{ currentSizeType?.image || previewImage ? 'Change Image' : 'Upload Image' }}
                </label>
                <input id="size-type-image" type="file" accept="image/*" @change="handleImageUpload" class="hidden">
              </div>
            </div>
            <p v-if="sizeTypeStore.validationErrors.image" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ sizeTypeStore.validationErrors.image[0] }}
            </p>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Upload an image (JPG, PNG, max 2MB)
            </p>
          </div>

          <!-- Active Status - Radio Buttons -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <div class="flex items-center space-x-6">
              <label class="inline-flex items-center cursor-pointer">
                <input v-model="formData.is_active" type="radio" :value="true"
                  @change="clearValidationError('is_active')"
                  class="h-4 w-4 text-gray-600 focus:ring-green-600 border-green-300 dark:border-green-600 dark:bg-green-700">
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
              <label class="inline-flex items-center cursor-pointer">
                <input v-model="formData.is_active" type="radio" :value="false"
                  @change="clearValidationError('is_active')"
                  class="h-4 w-4 text-red-600 focus:ring-red-600 border-red-300 dark:border-red-600 dark:bg-red-700">
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
              </label>
            </div>
            <p v-if="sizeTypeStore.validationErrors.is_active" class="text-xs text-red-600 dark:text-red-400 mt-1">
              {{ sizeTypeStore.validationErrors.is_active[0] }}
            </p>
          </div>
        </div>

        <!-- Global Form Errors -->
        <div v-if="Object.keys(sizeTypeStore.validationErrors).length > 0" class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p class="text-sm text-red-600 dark:text-red-400 font-medium mb-1">
            Please fix the following errors:
          </p>
          <ul class="text-xs text-red-500 dark:text-red-400 space-y-1">
            <li v-for="(errors, field) in sizeTypeStore.validationErrors" :key="field">
              • {{ errors[0] }}
            </li>
          </ul>
        </div>

        <!-- Form Actions -->
        <div class="mt-6 flex justify-end space-x-3">
          <button type="button" @click="closeModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500">
            Cancel
          </button>
          <button type="submit" :disabled="sizeTypeStore.loading" :class="[
            'px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500',
            sizeTypeStore.loading ?
              'bg-gray-400 cursor-not-allowed' :
              'bg-gray-600 hover:bg-gray-700'
          ]">
            <span v-if="sizeTypeStore.loading">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              {{ modalMode === 'create' ? 'Creating...' : 'Updating...' }}
            </span>
            <span v-else>
              {{ modalMode === 'create' ? 'Create Size Type' : 'Update Size Type' }}
            </span>
          </button>
        </div>
      </form>
    </BaseModal>

    <!-- View Modal -->
    <BaseModal v-if="viewingSizeType" :show="showViewModal" maxWidth="xl"  title="Size Type Details" @close="closeViewModal">
      <div class="px-6 py-3">
        <div class="text-center mb-6">
          <div v-if="viewingSizeType.image" class="mb-4">
            <img :src="viewingSizeType.image" :alt="viewingSizeType.name"
              class="h-32 w-32 rounded-lg mx-auto object-cover border border-gray-200 dark:border-gray-700">
          </div>
          <div v-else
            class="h-32 w-32 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-ruler text-gray-400 text-3xl"></i>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ viewingSizeType.name }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ viewingSizeType.code }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</label>
            <p class="text-sm text-gray-900 dark:text-white">{{ viewingSizeType.id }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</label>
            <div class="mt-2">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <div :class="[
                    'w-4 h-4 rounded-full border mr-2',
                    viewingSizeType.is_active === 1 || viewingSizeType.is_active === true
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600'
                  ]"></div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    {{ viewingSizeType.is_active === 1 || viewingSizeType.is_active === true ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sequence</label>
            <p class="text-sm text-gray-900 dark:text-white">{{ viewingSizeType.sequence }}</p>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created By</label>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ viewingSizeType.created_by || 'System' }}
            </p>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created At</label>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ viewingSizeType.created_at_formatted || formatDate(viewingSizeType.created_at) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ viewingSizeType.created_at_human || getHumanDate(viewingSizeType.created_at) }}
            </p>
          </div>
          <div>
            <label class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Updated At</label>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ viewingSizeType.updated_at_formatted || formatDate(viewingSizeType.updated_at) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ viewingSizeType.updated_at_human || getHumanDate(viewingSizeType.updated_at) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button type="button" @click="closeViewModal"
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500">
          Close
        </button>
        <button @click="editSizeType(viewingSizeType)"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500">
          Edit Size Type
        </button>
      </div>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal :show="showDeleteModal" title="Delete Size Type" maxWidth="lg" :showClose="false"
      @close="closeDeleteModal">
      <div class="px-6 py-3">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-300 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Delete Size Type
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete <strong>{{ deletingSizeType?.name }}</strong>?
            This action cannot be undone.
          </p>
        </div>

        <div class="flex justify-end space-x-3">
          <button @click="closeDeleteModal"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500">
            Cancel
          </button>
          <button @click="handleDelete" :disabled="sizeTypeStore.loading" :class="[
            'px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500',
            sizeTypeStore.loading ?
              'bg-red-400 cursor-not-allowed' :
              'bg-red-600 hover:bg-red-700'
          ]">
            <span v-if="sizeTypeStore.loading">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              Deleting...
            </span>
            <span v-else>Delete Size Type</span>
          </button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useSizeTypeStore } from '@/stores/sizeTypeStore';
import BaseModal from '@/components/common/BaseModal.vue';
import Pagination from '@/components/common/Pagination.vue'; 
import Breadcrumb from './core/Breadcrumb.vue';

const sizeTypeStore = useSizeTypeStore();

// Modal states
const isModalOpen = ref(false);
const showViewModal = ref(false);
const showDeleteModal = ref(false);

// Pagination
const perPage = ref(10);
const currentPage = ref(1);
const searchQuery = ref('');
const debounceTimeout = ref(null);
 
const formData = ref({
  code: '',
  name: '',
  sequence: 1,
  image: null,
  is_active: 1
});

// Current size type being operated on
const currentSizeType = ref(null);
const viewingSizeType = ref(null);
const deletingSizeType = ref(null);
const modalMode = ref('create'); // 'create' or 'edit'
const previewImage = ref(null);

// Computed properties
const totalItems = computed(() => sizeTypeStore.pagination.total || 0);
const lastPage = computed(() => sizeTypeStore.pagination.last_page || 1);

// Calculate row number correctly with pagination
const calculateRowNumber = (index) => {
  if (sizeTypeStore.pagination.from && sizeTypeStore.pagination.from > 0) {
    return sizeTypeStore.pagination.from + index;
  }
  
  return (currentPage.value - 1) * perPage.value + index + 1;
};

// Function to clear validation error for a specific field
const clearValidationError = (fieldName) => {
  if (sizeTypeStore.validationErrors[fieldName]) {
    // Create a copy of validation errors
    const updatedErrors = { ...sizeTypeStore.validationErrors };
    // Remove the specific field error
    delete updatedErrors[fieldName];
    // Update the store's validation errors
    sizeTypeStore.validationErrors = updatedErrors;
  }
};

// Clear all validation errors
const clearAllValidationErrors = () => {
  sizeTypeStore.validationErrors = {};
};

// Fetch size types on component mount
onMounted(() => {
  fetchData();
});

// Watch for pagination changes
watch(() => sizeTypeStore.pagination.current_page, (newPage) => {
  currentPage.value = newPage;
});

watch(() => sizeTypeStore.pagination.per_page, (newPerPage) => {
  perPage.value = newPerPage;
});

// Fetch data function
const fetchData = () => {
  const params = {
    page: currentPage.value,
    per_page: perPage.value
  };

  if (searchQuery.value) {
    params.search = searchQuery.value;
  }

  sizeTypeStore.fetchSizeTypes(params);
};

// Open create modal
const openCreateModal = () => {
  resetForm();
  modalMode.value = 'create';
  isModalOpen.value = true;
  // Clear validation errors when opening modal
  clearAllValidationErrors();
};

// Edit size type
const editSizeType = (sizeType) => {
  currentSizeType.value = sizeType;
  modalMode.value = 'edit';

  // Populate form data - ensure is_active is a number
  formData.value = {
    code: sizeType.code,
    name: sizeType.name,
    sequence: sizeType.sequence,
    image: null,
    is_active: sizeType.is_active
  };

  isModalOpen.value = true;
  closeViewModal();
  // Clear validation errors when opening edit modal
  clearAllValidationErrors();
};

// View size type
const viewSizeType = (sizeType) => {
  viewingSizeType.value = sizeType;
  showViewModal.value = true;
};

// Confirm delete
const confirmDelete = (sizeType) => {
  deletingSizeType.value = sizeType;
  showDeleteModal.value = true;
};


const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
  clearAllValidationErrors();
};

const closeViewModal = () => {
  showViewModal.value = false;
  viewingSizeType.value = null;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  deletingSizeType.value = null;
};

// Reset form
const resetForm = () => {
  formData.value = {
    code: '',
    name: '',
    sequence: 1,
    image: null,
    is_active: 1  // Default to Active as number
  };
  previewImage.value = null;
  currentSizeType.value = null;
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Clear image validation error
    clearValidationError('image');
    
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      sizeTypeStore.validationErrors.image = ['File size must be less than 2MB'];
      return;
    }

    // Validate file type
    if (!file.type.match('image.*')) {
      sizeTypeStore.validationErrors.image = ['Only image files are allowed'];
      return;
    }

    formData.value.image = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

// Remove image
const removeImage = () => {
  formData.value.image = null;
  previewImage.value = null;
  if (currentSizeType.value) {
    currentSizeType.value.image = null;
  }
  // Clear image validation error when removing image
  clearValidationError('image');
};

// Handle form submission
const handleSubmit = async () => {
  // Clear all validation errors before submitting
  clearAllValidationErrors();
  
  // Prepare data for submission
  const submitData = {
    ...formData.value,
    is_active: formData.value.is_active ? 1 : 0
  };

  let result;

  if (modalMode.value === 'create') {
    result = await sizeTypeStore.createSizeType(submitData);
  } else {
    result = await sizeTypeStore.updateSizeType(currentSizeType.value.id, submitData);
  }
  
  if (result && result.success) {
    closeModal();
    fetchData();
  }
};

// Handle delete
const handleDelete = async () => {
  if (deletingSizeType.value) {
    const result = await sizeTypeStore.deleteSizeType(deletingSizeType.value.id);
    if (result.success) {
      closeDeleteModal();
      fetchData();
    }
  }
};

// Toggle active status
const toggleStatus = async (sizeType) => {
  await sizeTypeStore.toggleActiveStatus(sizeType);
  fetchData();
};

// Handle per page change
const handlePerPageChange = (newPerPage) => {
  perPage.value = newPerPage;
  currentPage.value = 1;
  fetchData();
};

// Go to page
const goToPage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    currentPage.value = page;
    fetchData();
  }
};

// Handle search with debounce
const handleSearch = () => {
  if (debounceTimeout.value) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = setTimeout(() => {
    currentPage.value = 1;
    fetchData();
  }, 300);
};

// Clear search
const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
  fetchData();
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Get human readable date
const getHumanDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};
</script>

<style scoped>

/* Smooth transition for validation error removal */
input, select, textarea {
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
</style>