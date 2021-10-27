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

    const addCard = {
      view: 'button',
      css: 'webix_primary',
      label: 'Add new card',
      click: () => {
        $$('board').showEditor();
      },
    };

    const removeCard = {
      view: 'button',
      css: 'webix_danger',
      label: 'Remove selected',
      click: () => {
        const id = $$('board').getSelectedId();
        if (!id) {
          return webix.alert('Please selected a card that you want to remove!');
        }
        $$('board').remove(id);
      },
    };

    return {
      rows: [
        {
          type: 'wide',
          padding: { top: 4 },
          cols: [
            { rows: [addCard, removeCard, menu, logout] },
            { $subview: true },
          ],
        },
      ],
    };
  }
  init() {
    this.use(plugins.Menu, 'top:menu');
  }
}
