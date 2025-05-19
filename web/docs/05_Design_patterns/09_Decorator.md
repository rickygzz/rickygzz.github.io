---
sidebar_position: 9
---

# Decorator pattern


The essence of the decorator pattern lies in enhancing existing functionality through composition rather than duplication. 

Decorator pattern allows you to enhance or modify the functionality of a class without altering its existing structure, thus preserving the way it interacts with other components in the system


## Questions

1. What is the primary reason to apply the Decorator pattern?

To add behavior to a class while retaining its public interface.

2. How can we ensure that Decorator is calling the right behavior of the decorated object?

By holding a reference to the decorated object and delegating calls through it.