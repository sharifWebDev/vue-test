import SizeTypeList from './SizeTypeList.vue';
import SizeTypeDetails from './SizeTypeDetails.vue';
import SizeTypeForm from '../../components/SizeTypeForm.vue';

export default [
  {
    path: '/hk-prod-size-types',
    name: 'SizeTypeList',
    component: SizeTypeList,
  },
  {
    path: '/hk-prod-size-types/:id',
    name: 'SizeTypeDetails',
    component: SizeTypeDetails,
    props: true,
  },
  {
    path: '/hk-prod-size-types/add',
    name: 'AddSizeType',
    component: SizeTypeForm,
  },
  {
    path: '/hk-prod-size-types/edit/:id',
    name: 'EditSizeType',
    component: SizeTypeForm,
    props: true,
  },
];
