import Vue from 'vue'
import VueRouter from 'vue-router'

import page404 from '../components/page404.vue'
import Home from '../views/MainMenuHome.vue'
import ContentEditing from '../views/ContentEditing/MainMenuContentEditing.vue'
import TestAdvice from '../views/ContentEditing/TestAdvice.vue'
import AddNewBlock from '../views/ContentEditing/AddNewBlock.vue'
import EditBlocks from '../views/ContentEditing/BlocksEdit.vue'
import EditAdvice from '../views/ContentEditing/AdviceEdit.vue'
import EditBlock from '../views/ContentEditing/BlockSettings.vue'
import EditText from '../views/ContentEditing/TextEditing.vue'
import TranslateText from '../views/ContentEditing/Translate.vue'
import KeysEditing from '../views/ContentEditing/KeysEditing.vue'
import EditInfographic from '../views/ContentEditing/InfographyEdit.vue'
import AddNewConsult from '../views/ContentEditing/AddNewAdvice.vue'
import ConsultTemplate from '../views/ContentEditing/AdviceTemplate.vue'
import TextBook from '../views/Textbook/MainMenuTextbook.vue'
import EditTextTextbook from '../views/Textbook/TextEditTextbook.vue'
import Publications from '../views/Publications/MainMenuPublications.vue'
import NewPublication from '../views/Publications/NewPublication.vue'
import PriceList from '../views/PriceManagement/MainMenuPriceList.vue'
import EditPrice from '../views/PriceManagement/EditPrice.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/Home' },
  { path: '/Home', component: Home },
  {
    path: '/ContentEditing', name: 'Content', component: ContentEditing,
    children: [
      { path: 'NewAdvice', name: 'ContentNewAdvice', component: AddNewConsult },
      { path: ':adviceName', name: 'ContentExist', component: ConsultTemplate },
      { path: ':adviceName/TestAdvice', name: 'TestAdvice', component: TestAdvice },
      { path: ':adviceName/NewBlock', name: 'ContentNewBlock', component: AddNewBlock },
      {
        path: ':advice_id/editText/:block_id/', name: 'ContentEditBlocks', component: EditBlocks, children: [
          { path: 'TextEditing', name: 'ContentEditText', component: EditText },
          { path: 'KeysEditing', name: 'ContentEditKeys', component: KeysEditing },
          { path: 'Settings', name: 'ContentEditBlock', component: EditBlock },
          { path: 'TextTranslate', name: 'ContentTranslateKeys', component: TranslateText },
          { path: 'InfographyEdit', name: 'ContentEditInfographic', component: EditInfographic },
        ]
      },
      { path: ':adviceName/EditAdvice/:id', name: 'ContentEditAdvice', component: EditAdvice }
    ]
  },
  { path: '/Textbook', component: TextBook },
  { path: '/Textbook/Edit/:id', name: 'EditTextTextbook', component: EditTextTextbook },
  { path: '/Publications', component: Publications },
  { path: '/Publications/New', name: 'NewPublication', component: NewPublication },
  { path: '/PriceList', component: PriceList },
  { path: '/PriceList/Edit/:id', name: 'EditPrice', component: EditPrice },
  { path: "*", name: 'Page404', component: page404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
