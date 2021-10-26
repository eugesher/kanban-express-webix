import { JetView } from 'webix-jet';

export default class KanbanView extends JetView {
  config() {
    return {
      view: 'kanban',
      editor: true,
      type: 'space',
      userList: { yCount: 5 },
      cols: [
        { header: 'Backlog', body: { view: 'kanbanlist', status: 'new' } },
        { header: 'In Progress', body: { view: 'kanbanlist', status: 'work' } },
        { header: 'Testing', body: { view: 'kanbanlist', status: 'test' } },
        { header: 'Done', body: { view: 'kanbanlist', status: 'done' } },
      ],
      users: '/api/users',
      url: '/api/tasks',
      save: '/api/tasks/update',
    };
  }
}
