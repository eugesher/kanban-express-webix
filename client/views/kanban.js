import { JetView } from 'webix-jet';
import { data } from 'models/records';

export default class KanbanView extends JetView {
  config() {
    return {
      view: 'kanban',
      editor: true,
      type: 'space',
      //the structure of columns on the board
      cols: [
        { header: 'Backlog', body: { view: 'kanbanlist', status: 'new' } },
        { header: 'In Progress', body: { view: 'kanbanlist', status: 'work' } },
        { header: 'Testing', body: { view: 'kanbanlist', status: 'test' } },
        { header: 'Done', body: { view: 'kanbanlist', status: 'done' } },
      ],
      url: '/api/data',
    };
  }
  init(view) {
    view.parse(data);
  }
}
