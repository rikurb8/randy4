# Randy Management System
> A system for managing Randy, a chatbot. Randy is a chatbot that can be used to manage the system.

## Next Steps
[ ] Refine manager-randy functionality, group in to larger modules

## Specs

* manager-randy
  * send_message(message: str, history: list[dict] = None, context: dict = None) -> Response
  * send_voice_message(voice: bytes, history: list[dict] = None, context: dict = None) -> Response

  * list_chat_history(user_id: str) -> list[dict]
  * clear_chat_history(user_id: str) -> None
  
  * get_chat_summary(chat_id: str) -> Summary
  * get_chat_transcript(chat_id: str) -> Transcript

  * get_configuration() -> Configuration
  * update_configuration(configuration: Configuration) -> None
  
  * randy-service
    * get_randy_status() -> Status
    * get_randy_memory() -> Memory
    * get_randy_preferences() -> Preferences
    * update_randy_preferences(preferences: Preferences) -> None
    * get_configuration() -> Configuration
    * update_configuration(configuration: Configuration) -> None 
    * get_randy_history() -> History
    * clear_randy_history() -> None

* workflow-service
  * create_workflow(name: str, trigger: Trigger, tasks: list[Task]) -> Workflow
  * get_workflow(name: str) -> Workflow
  * update_workflow(name: str, trigger: Trigger = None, tasks: list[Task] = None) -> Workflow
  * delete_workflow(name: str) -> None
  * list_workflows() -> list[Workflow]

  * add_task_to_workflow(workflow_name: str, task: Task, order: int = -1) -> Workflow
  * trigger_workflow(name: str, data: dict = None) -> WorkflowResult
  * schedule_workflow(name: str, cron_expression: str) -> ScheduledResult

  * get_scheduled_workflows() -> list[ScheduledWorkflow]
  * delete_scheduled_workflow(name: str) -> None

* task-service
  - Task is any sort of action that can be executed by the system. A node.js function, a python function, a shell command, etc. Task is called with given context and returns a TaskResult(output, status, error, execution_time, timestamp).
  
  * create_task(name: str, description: str, run_command: str, due_date: datetime = None, status: str = "waiting_execution") -> Task
  * get_task(task_id: str) -> Task
  * update_task(task_id: str, status: str = None, priority: str = None, due_date: datetime = None) -> Task
  * delete_task(task_id: str) -> None
  * list_tasks() -> list[Task]

  * execute_task(task_id: str, data: dict = None) -> TaskResult
  * schedule_task(task_id: str, cron_expression: str) -> ScheduledResult

* diagnostics-service
  * get_health() -> Health
  * get_diagnostics() -> Diagnostics

