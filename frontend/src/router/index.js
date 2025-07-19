import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import BookList from '../views/BookList.vue';
import BorrowList from '../views/BorrowList.vue';
import ManageBooks from '../views/admin/ManageBooks.vue';
import ManageBorrows from '../views/admin/ManageBorrows.vue';
import ManagePublishers from '../views/admin/ManagePublishers.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/books', name: 'books', component: BookList },
  { path: '/borrows', name: 'borrows', component: BorrowList },
  { path: '/admin/books', name: 'admin-books', component: ManageBooks },
  { path: '/admin/borrows', name: 'admin-borrows', component: ManageBorrows },
  { path: '/admin/publishers', name: 'admin-publishers', component: ManagePublishers },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
