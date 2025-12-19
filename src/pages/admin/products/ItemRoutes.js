import ItemList from '@/pages/item/Item.vue';
import ViewItem from '@/pages/item/ViewItem.vue';
import AddItem from '@/pages/item/AddItem.vue';
import EditItem from '@/pages/item/EditItem.vue';

export default [
  {
    path: '/item',
    name: 'ItemList',
    component: ItemList,
  },
  {
    path: '/item/:id',
    name: 'ItemDetails',
    component: ViewItem,
    props: true,
  },
  {
    path: '/item/add',
    name: 'AddItem',
    component: AddItem,
  },
  {
    path: '/item/edit/:id',
    name: 'EditItem',
    component: EditItem,
    props: true,
  },
];