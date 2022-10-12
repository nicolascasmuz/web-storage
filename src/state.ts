export const state = {
  data: {
    tasks: [],
  },
  listeners: [],
  /* init() {
    const localData: any = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData));
    localStorage.clear();
  }, */
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    /* localStorage.setItem("saved-state", JSON.stringify(newState)); */
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => !t.deleted);
  },
  addTask(title) {
    const currentState = this.getState();
    currentState.tasks.push({ title });
    this.setState(currentState);
  },
};
