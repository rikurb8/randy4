# System3

## Introduction
System3 is an all-in-one AI platform providing chat services, multimodal processing, code generation, and RAG in a unified environment. It enables automated workflows through events/schedules and features Randy, an AI assistant with memory and proactive monitoring capabilities.

## Why System3?
* Unified AI services platform
* Simple workflow automation
* Intuitive AI assistant (Randy)
* Persistent context and proactive assistance

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