export const state = {
  data: {
    idCounter: 0,
    tasks: [],
  },
  listeners: [],
  init() {
    const localData: any = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData));
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  getTasks() {
    const currentState = this.getState();
    return currentState.tasks;
  },
  addTask(title) {
    const currentState = this.getState();
    currentState.tasks.push({ title: title, id: currentState.idCounter });
    currentState.idCounter = currentState.idCounter + 1;
    this.setState(currentState);
  },
  deleteTask(id: number) {
    const currentState = this.getState();
    const notDeletedTasks = currentState.tasks.filter((task) => {
      return task.id != id ? task : null;
    });
    currentState.tasks = notDeletedTasks;
    this.setState(currentState);
  },
};
