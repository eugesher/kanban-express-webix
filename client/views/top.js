import { JetView, plugins } from 'webix-jet';

export default class TopView extends JetView {
  config() {
    const menu = {
      view: 'menu',
      id: 'top:menu',
      width: 180,
      layout: 'y',
      select: true,
      template: "<span class='webix_icon fa-#icon#'></span> #value# ",
      data: [{ value: 'Kanban', id: 'kanban' }],
    };

    const logout = {
      view: 'button',
      label: 'Logout',
      click: () => this.show('/logout'),
    };

    return {
      rows: [
        {
          type: 'wide',
          padding: { top: 4 },
          cols: [{ rows: [menu, logout] }, { $subview: true }],
        },
      ],
    };
  }
  init() {
    this.use(plugins.Menu, 'top:menu');
  }
}
