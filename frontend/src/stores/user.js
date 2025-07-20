import { reactive } from 'vue';

const state = reactive({
  currentUser: null,
  role: '',
});

export function useUserStore() {
  return {
    state,

    setUser(user) {
      state.currentUser = user;
      state.role = user.role;

      localStorage.setItem("user", JSON.stringify(user));
    },

    loadUserFromLocal() {
      const saved = localStorage.getItem("user");
      if (saved) {
        const user = JSON.parse(saved);
        state.currentUser = user;
        state.role = user.role;
      }
    },

    logout() {
      state.currentUser = null;
      state.role = '';
      localStorage.removeItem("user");
    },
  };
}
