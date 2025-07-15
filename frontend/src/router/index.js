import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BookList from "@/views/BookList.vue";
import BorrowList from "@/views/BorrowList.vue";
import ManageBooks from "@/views/admin/ManageBooks.vue";
import ManageBorrows from "@/views/admin/ManageBorrows.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  { path: "/books", name: "booklist", component: BookList },
  { path: "/borrow-history", name: "borrowlist", component: BorrowList },
  {
    path: "/admin/books",
    name: "managebooks",
    component: ManageBooks,
    meta: { requiresAuth: true, role: "nhanvien" },
  },
  {
    path: "/admin/borrows",
    name: "manageborrows",
    component: ManageBorrows,
    meta: { requiresAuth: true, role: "nhanvien" },
  },
  { path: "/:pathMatch(.*)*", name: "notfound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (to.meta.requiresAuth && !user) {
    return next("/login");
  }
  if (to.meta.role && user?.role !== to.meta.role) {
    return next("/");
  }
  next();
});

export default router;
