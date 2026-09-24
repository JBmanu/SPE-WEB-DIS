# Folder & Gradle Configuration

## Microservices Architecture + Hexagonal Architecture (Ports and Adapters)
```
project/
│
├── service-A/
│   ├── cmd/
│   │  └── main.go
│   ├── adapters/                # External dependencies
│   │   ├── api/                 # REST / GraphQL
│   │   ├── database/
│   │   └── messaging/
│   ├── core/                    # Business rules
│   │   ├── domain/
│   │   ├── services/
│   │   └── ports/               # Interfaces
│   └── infrastructure/
│       └── config/
│
├── service-B/
│   ├── cmd/
│      └── main.go
│   ├── adapters/                # External dependencies
│   │   ├── api/                 # REST / GraphQL
│   │   ├── database/
│   │   └── messaging/
│   ├── core/                    # Business rules
│   │   ├── domain/
│   │   ├── services/
│   │   └── ports/               # Interfaces
│   └── infrastructure/
│       └── config/
│
└── shared/
    ├── auth/
    ├── logging/
    └── monitoring/
```

Source: [gihub repo](https://github.com/faizdotid/software-architecture-folder-structures#9-cqrs)

## Gradle config [gradle doc](https://docs.gradle.org/current/userguide/multi_project_builds.html)
One root project containing one gradle suproject for each service.