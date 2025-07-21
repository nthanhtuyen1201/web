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
      this.state.currentUser = null;
      this.state.role = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("role");
    }

  };
}
