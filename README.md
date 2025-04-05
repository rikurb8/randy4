# System3

## Introduction
System3 is an all-in-one AI platform providing chat services, multimodal processing, code generation, and RAG in a unified environment. It enables automated workflows through events/schedules and features Randy, an AI assistant with memory and proactive monitoring capabilities.

## Why System3?
* Single gateway for all AI services
* Workflow automation, simple and complex
* Randy Management System
  ```python
  from pydantic import BaseModel, Field
  from typing import List, Dict, Optional, Any, Union
  from datetime import datetime
  from enum import Enum

  # Common models
  class Message(BaseModel):
      content: str
      role: str = "user"
      timestamp: datetime = Field(default_factory=datetime.now)

  class Response(BaseModel):
      content: str
      metadata: Dict[str, Any] = {}
      timestamp: datetime = Field(default_factory=datetime.now)

  class Summary(BaseModel):
      text: str
      key_points: List[str] = []
      entities: List[str] = []

  class Transcript(BaseModel):
      messages: List[Message]
      metadata: Dict[str, Any] = {}

  class Configuration(BaseModel):
      model_name: str = "default-model"
      temperature: float = 0.7
      max_tokens: int = 1000
      user_preferences: Dict[str, Any] = {}

  # Workflow models
  class TriggerType(str, Enum):
      WEBHOOK = "webhook"
      SCHEDULE = "schedule"
      EVENT = "event"

  class Trigger(BaseModel):
      type: TriggerType
      config: Dict[str, Any] = {}

  class Task(BaseModel):
      id: str = Field(default_factory=lambda: f"task_{datetime.now().timestamp()}")
      name: str
      description: str = ""
      run_command: str
      due_date: Optional[datetime] = None
      status: str = "waiting_execution"
      priority: str = "medium"
      metadata: Dict[str, Any] = {}

  class Workflow(BaseModel):
      name: str
      trigger: Trigger
      tasks: List[Task]
      created_at: datetime = Field(default_factory=datetime.now)
      updated_at: datetime = Field(default_factory=datetime.now)

  class ScheduledWorkflow(BaseModel):
      name: str
      workflow: Workflow
      cron_expression: str
      next_run: Optional[datetime] = None

  class TaskResult(BaseModel):
      task_id: str
      status: str
      output: Any = None
      error: Optional[str] = None
      execution_time: float = 0.0
      timestamp: datetime = Field(default_factory=datetime.now)
  ```

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



  * Randy has knowledge base and memory available
    * ingest documents, images, audio, data for searchability and analysis features
    * Short term and long term memory (mem0 library)
  * Proactive monitoring and alerting
  * Context aware suggestions
    
  * Available tools
    * [ ] Web search
    * [ ] RAG
    * [ ] Code generation
    * [ ] Image generation
    * [ ] Audio generation
    * [ ] Video generation

## Technical Structure
* `system3/`
  * `services/` - Core AI services
    * `chat/` - Models, handlers (websocket.py, rest_api.py), utils
    * `multimodal/` - Vision, audio processing, format converters
    * `codegen/` - Language handlers, completion engine, templates
    * `rag/` - Indexing, retrieval, data connectors
  * `workflows/` - Automation engine
    * `triggers/` - Schedulers (cron.py, interval.py), event handlers
    * `tasks/` - Executors, templates, registry
  * `randy/` - AI assistant
    * `interactions/` - Voice/text handlers, UIs
    * `memory/` - Context manager, user preferences, history
  * `diagnostics/` - Monitoring, logging, analytics

## Workflow Configuration
System3 workflows can be defined using either YAML configuration or code-based approaches:

### YAML Configuration
```yaml
name: document_processor
trigger:
  type: webhook
  endpoint: /api/documents/process
tasks:
  - name: extract_text
    service: multimodal.vision
    function: extract_text
    params:
      output_format: markdown
  - name: summarize
    service: chat
    function: generate_summary
    params:
      max_length: 300
  - name: store_results
    service: rag.indexing
    function: store_document
```

### Code-based Configuration
```python
from system3.workflows import Workflow, WebhookTrigger
from system3.services import multimodal, chat, rag

workflow = Workflow(
    name="document_processor",
    trigger=WebhookTrigger(endpoint="/api/documents/process"),
)

workflow.add_task(
    multimodal.vision.extract_text,
    name="extract_text",
    params={"output_format": "markdown"}
)

workflow.add_task(
    chat.generate_summary,
    name="summarize",
    params={"max_length": 300},
    depends_on=["extract_text"]
)

workflow.add_task(
    rag.indexing.store_document,
    name="store_results"
)

workflow.register()
```

## Use Cases
* **Research:** Complex topic exploration with RAG, knowledge synthesis
* **Search:** Natural language queries across multiple data sources
* **Content Generation:** Text, images, audio creation and conversion
* **Personal Assistant:** "Tilaa preferenssin mukaan ruokaa 1/2/3 päiväks, laita toimitus mun kalenteriin" (Order food based on preferences for 1-3 days with calendar integration)

## Future Plans
* Predictive analytics for anticipating user needs
* RL-based tuning of Randy's behaviors
* Enhanced system monitoring tools
* 