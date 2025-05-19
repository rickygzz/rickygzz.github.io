---
sidebar_position: 6
---

# Introduction

The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules, but both should depend on abstractions. This principle aims to reduce the coupling between different parts of a system, making the codebase more flexible and easier to maintain.

By adhering to DIP, developers are encouraged to rely on interfaces or abstract classes rather than concrete implementations. This allows for greater modularity, as changes in low-level modules do not directly impact high-level modules. As a result, the system becomes more resilient to changes and easier to extend with new features.

A common way to implement the Dependency Inversion Principle is through dependency injection. This technique involves providing the dependencies of a class from the outside, rather than having the class instantiate them directly. This approach further decouples the components and facilitates testing, as mock implementations can be easily substituted.

The benefits of applying DIP are especially evident in large and complex systems. When modules depend on abstractions, it becomes possible to swap out implementations without affecting the rest of the system. This leads to improved testability, as well as the ability to introduce new functionality with minimal disruption.

In summary, the Dependency Inversion Principle promotes a design where abstractions are the foundation of the system's architecture. By depending on abstractions rather than concrete details, software becomes more robust, adaptable, and easier to maintain over time.

# Coupling

Concrete classes should not be directly dependent on each other because this creates tight coupling in your codebase. When classes are highly coupled, a change in one class often requires changes in others, making the system harder to maintain, test, and extend. This tight interdependence can lead to fragile code that is difficult to refactor or reuse in different contexts.

To avoid highly coupled classes, you should program to abstractions rather than concrete implementations. This means that classes should depend on interfaces or abstract classes, not on specific classes. By introducing abstractions, you can decouple the implementation details from the usage, allowing you to swap out different implementations without affecting the rest of your code.

Dependency injection is a common technique to achieve this decoupling. Instead of a class creating its own dependencies, those dependencies are provided from the outside, typically through constructor parameters or setter methods. This approach makes your code more flexible, easier to test (since you can inject mock dependencies), and more resilient to change.


## Dependency injection

Dependency injection is normally performed in classes through:

1. *Constructor Injection*: Dependencies are provided as parameters to the class constructor. This is the most common and recommended approach.

2. *Setter Injection*: Dependencies are set via public setter methods after the object is constructed.

3. *Interface Injection*: The dependency provides an injector method that the class implements.

Constructor injection is preferred because it makes dependencies explicit and ensures the class cannot be used without its required dependencies.


## .NET Dependency Injection

Requires package Microsoft.Extensions.DependencyInjection.

### IServiceCollection and IServiceProvider

IServiceCollection is our dependency injection container. It contains the data needed to resolve an interface to an object of a concrete class.

Because of single reponsibility principle, ServiceCollection is only responsibile for cointaining these relationships. It does not actually create the actual object. `IServiceProvider` is responsible to create instances of objects.

In dependency injection, we rely on interfaces to reduce coupling and make our code more flexible and maintainable. By depending on abstractions (interfaces) rather than concrete implementations, it becomes easier to swap out components, test code, and extend functionality.

In .NET, the `IServiceCollection` interface is used to register services and their dependencies for dependency injection. It acts as a configuration container where you specify which implementation should be provided when a particular interface or abstraction is requested.

For example:

```
IServiceCollection services = new ServiceCollection();
services.AddTransient<IMyService, MyService>();
services.AddSingleton<ILogger, ConsoleLogger>();
```

Here, `IMyService` is registered with its implementation `MyService`, and `ILogger` is registered with `ConsoleLogger`. The `AddTransient()` method specifies that a new instance will be created each time the service is requested, while `AddSingleton()` ensures a single shared instance.

After registering services, you use IServiceProvider to build the service container and resolve instances at runtime:

```
IServiceProvider serviceProvider = services.BuildServiceProvider();
IMyService myService = serviceProvider.GetService<IMyService>();
```

This allows you to retrieve fully constructed objects with all their dependencies automatically injected, following the principles of dependency inversion and loose coupling.

The difference between `GetService()` and `GetRequiredService()` is that `GetService()` returns null if the provider cannot create an instance of the requested type, whereas `GetRequiredService()` throws an exception in that case.

### AddSingleton

When you register a service with `AddSingleton()`, only one instance of the service is created and shared throughout the entire lifetime of the application. The first time the service is requested, a new instance is created. For all subsequent requests, the same instance is returned. This is useful for stateless or thread-safe services that should be shared globally.


### AddTransient and AddScoped

The main difference between `AddTransient()` and `AddScoped()` is the lifetime and reuse of the service instance:

* `AddTransient`: A new instance of the service is created every time it is requested. Use this for lightweight, stateless services.

* `AddScoped`: A single instance is created and shared within the same scope. In .NET a scope is typically a single web request. A new instance is created for each new scope. For other types of applications, let's say WinForms, all scoped services behave like singletons unless you manually create a scope using `IServiceScopeFactory`, such as when opening a new form.

For these two, the lifetime of the lifetime of the object is not the lifetime of the application. For `AddTransient()` every time the interface is injected, a new instance will be created regardless of whether it is a new thread or it is a new request. For `AddScoped()` a new instance will be created every time the user visits a new page in your application.

### ILogger

`ILogger` is a core logging abstraction provided by `Microsoft.Extensions.Logging` in .NET. It allows developers to write log messages in a consistent and structured way, independent of the underlying logging framework or destination.

By using `ILogger`, applications can easily switch between different logging providers, such as console, file, or cloud-based logging systems, without changing the application code. This abstraction is essential for building maintainable and flexible applications that require robust logging capabilities.

One of the key benefits of ILogger is its seamless integration with dependency injection. In modern .NET applications, you can inject an `ILogger<T>` into your classes, where `T` is the type of the class receiving the logger. This approach ensures that each class gets a logger instance that is automatically associated with its context, making it easier to filter and analyze log messages. The dependency injection container manages the creation and lifetime of the logger, so developers do not need to manually instantiate or configure loggers throughout the codebase.

The use of ILogger promotes adherence to the Dependency Inversion Principle, one of the SOLID principles of object-oriented design. By depending on the `ILogger` abstraction rather than a concrete logging implementation, your code becomes more modular and testable. For example, during unit testing, you can easily substitute the real logger with a mock or stub implementation, allowing you to verify logging behavior without producing actual log output.

`ILogger` supports various log levels, such as Trace, Debug, Information, Warning, Error, and Critical. This granularity allows developers to control the verbosity of log output and focus on messages that are relevant for a particular environment or scenario. Additionally, `ILogger` supports structured logging, enabling you to include contextual information and properties in your log messages, which can be invaluable for diagnosing issues in production systems.

`ILogger` is a powerful and flexible logging abstraction that fits naturally into the .NET dependency injection ecosystem. It simplifies logging practices, enhances maintainability, and supports best practices in software design. By leveraging `ILogger`, developers can build applications that are easier to monitor, troubleshoot, and evolve over time, while keeping logging concerns decoupled from business logic.

### IOptions

`IOptions` is a core interface in .NET used for accessing configuration settings in a type-safe manner. It allows developers to bind configuration sections from sources like `appsettings.json`, environment variables, or user secrets to strongly-typed classes.

By using `IOptions<T>`, where `T` is a class representing your configuration, you can inject configuration values directly into your services or controllers, promoting clean code and reducing the need for manual parsing or mapping of configuration data.

The `IOptions<T>` interface provides a simple way to access configuration values that are loaded once at application startup and remain constant throughout the application's lifetime. This is ideal for settings that do not change while the application is running, such as connection strings, API keys, or feature flags. When you inject `IOptions<T>` into a class, you access the configuration values through the Value property, which holds the bound configuration object.

However, in scenarios where configuration values might change during the application's lifetime—such as in web applications that reload settings without restarting—you may need more flexibility. This is where `IOptionsSnapshot<T>` comes in. `IOptionsSnapshot<T>` is designed for use with scoped lifetimes (such as per web request in ASP.NET Core). It provides a fresh snapshot of the configuration values for each scope, allowing you to see updated settings if the configuration source changes between requests. This is particularly useful for multi-tenant applications or scenarios where configuration is expected to change frequently and should be reflected in new requests.

`IOptionsSnapshot<T>` is only available in services with a scoped lifetime, such as controllers in .NET Core. When you inject `IOptionsSnapshot<T>`, you get the latest configuration values as they were at the start of the current scope. This means that changes to configuration sources (like a modified appsettings.json file) will be picked up on the next request, but not during the current one. This approach balances performance with the need for up-to-date configuration.

For even more dynamic scenarios, .NET provides `IOptionsMonitor<T>`. This interface allows you to observe configuration changes in real time and react to them immediately, without waiting for a new scope or request. `IOptionsMonitor<T>` exposes a CurrentValue property for accessing the latest configuration and provides an OnChange event that you can subscribe to in order to execute custom logic whenever the configuration changes. This is especially useful for background services, long-running processes, or applications that need to adapt instantly to configuration updates.

`IOptionsMonitor<T>` is typically used in singleton or transient services, where configuration changes must be reflected immediately. For example, you might use `IOptionsMonitor<T>` to reload logging settings, update cache expiration policies, or change external service endpoints on the fly. By subscribing to the OnChange event, your application can respond proactively to configuration changes, improving flexibility and reducing downtime.

`IOptions<T>`, `IOptionsSnapshot<T>`, and `IOptionsMonitor<T>` provide a powerful set of tools for managing configuration in .NET applications. `IOptions<T>` is best for static, application-wide settings; `IOptionsSnapshot<T>` is ideal for per-request configuration updates in **scoped services**; and `IOptionsMonitor<T>` is perfect for scenarios where real-time configuration changes are required. By choosing the appropriate options interface, you can ensure your application is both robust and adaptable to changing requirements.