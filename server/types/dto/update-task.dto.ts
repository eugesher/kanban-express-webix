export default interface IUpdateTaskDto {
  id: string;
  text: string;
  status: string;
  user_id: string;
  webix_operation: 'update';
}
