---
sidebar_position: 2
---

# Questions

1. What principle is resolved with dependency injection?

2. What principle is resolved through the use of abstractions?

A common way to achieve the Open/Closed Principle is through the use of abstraction, such as interfaces or abstract classes. By depending on abstractions rather than concrete implementations, it becomes easier to introduce new behaviors by creating new subclasses or implementations, rather than changing existing code.

3. What principle is resolved with the use of design patterns such as Strategy, Decorator, and Factory?

Applying the Open/Closed Principle encourages the use of design patterns such as Strategy, Decorator, and Factory. These patterns provide mechanisms to extend the behavior of a system without modifying its core logic, making it easier to adapt to changing requirements.

4. What principle is resolved with polymorphism and inheritance?

LSP emphasizes the importance of inheritance and polymorphism in object-oriented programming. When a subclass extends a superclass, it should not only inherit its behavior but also guarantee that it does not violate any expectations set by the superclass. This means that the subclass should honor the contracts, invariants, and behaviors defined by the parent class.

5. What principle is primarily resolved using dependency injection?

Dependency injection primarily addresses the Dependency Inversion Principle (DIP). By injecting dependencies, high-level modules do not depend on low-level modules but rather on abstractions, promoting loose coupling and easier maintainability.

Dependency injection can also support the Open / Closed Principle indirectly. By depending on abstractions and injecting dependnecies, your code becomes easier to extend (open for extension) without modifying existing code (closed for modification).