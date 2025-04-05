# System 3 general notes

System 3 is a general purpose system with various capabilities, the aim is to provide all the tools needed for a easier life. System3 knows how to host your businnessses and hobbies, software can be deployed in the cloud (Cloudflare Workers, need to find best way to host containers) or locally (kubernetes, docker compose, what?).

It provides a chat interface (first cli, then api and web ui) and a set of tools for interacting with the system.

Goal is to be a easily runnable Docker image. Features might require certain CPU or GPU capabilities, this should be documented. Inteded use is on high end Apple Silicon M-series chips, lite version for RPi etc.

## Technical stuff
- Deploy Dockerizable apps locally
  - Initially just run Docker Compose with bash script? Ideally some Kubernetes setup later on (k3s, ...)
- Monitoring
  - System3 dashboard
    - high level overview
    - monitor usage
    
    - 
  - Prometheus, Grafana, whats latest best?
  - Logs
  - Metrics
  - Tracing
  - Alerts
  - Dashboards
# General
System 3 is a general purpose system with various capabilities, the aim is to provide all the tools needed for a easier life. Provides chat interface to interact with the latest SOTA models. Automate anything you need, system can curate feeds, remind you of important things, generate code, ...



## Structure
- randy the assistant
  - core
    - interactions with system
      - cli
      - api
      - web ui
    - python libraries: rich, typer, ...
    - general capabilities:
      - chat interface, have ad hoc chats, see tool usage, cost, etcs, nice benchmark ui, evals, ...
        - model, "what models can i use?", "use best openai/anthropic"
          - local models, "find newest/best local models"
          - SOTA models (openai, anthropic, google, ...)
          - fine tuned
        - best tools
          - web search
          - custom mcp services
          - ...
        - automations
          - watch new interesting youtube videos, gives ultra curated suggestions
          - watch new interesting github repos, gives ultra curated suggestions
          - tell me about new emails when i need to know
          - "remember to water your plants"
          - codegen agent workflows
  - future interfaces
    - api
      - python libraries: fastapi, ...
      - can be used by other systems
    - web ui
      - tech to be decided, ideas: monsterui/fasthtml, typescript (react, svelte, ...)
      - can be used by human users

### System3 Core

System3 Core is the main component of System3. It is a chat interface that allows you to interact with the system.


### TODO:
- [ ] Add monitoring