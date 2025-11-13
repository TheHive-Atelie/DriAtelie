import { routes } from '../router.js';

class SimpleRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = routes[0];
    this.listeners = [];
    this.basePath = '/web';
  }

  push(path) {
    const route = this.routes.find(r => r.path === path);
    if (route) {
      this.currentRoute = route;
      this.notifyListeners();
      window.history.pushState(null, '', this.basePath + path);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentRoute));
  }
}

export const router = new SimpleRouter(routes);

export const RouterView = {
  template: `<component :is="currentComponent"></component>`,
  data() {
    return {
      currentComponent: router.currentRoute.component
    }
  },
  created() {
    router.subscribe((route) => {
      this.currentComponent = route.component;
    });
  }
};
