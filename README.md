# Clean Chakra React

A React project built with best practices, focusing on Clean Architecture, maintainability, and scalability.
Overview

This project integrates Clean Architecture principles with React and Chakra UI to ensure modular, reusable, and testable code. It also includes setup for Test Driven Development (TDD), SOLID principles, and Design Patterns to enforce good software practices.

## Main Concepts

* **Clean Architecture**: Organized around domain layers, allowing for high scalability and ease of maintenance.
* **Test Driven Development (TDD)**: Code driven by tests, ensuring each feature is tested and functioning as expected.
* **SOLID Principles**: Adheres to SOLID to ensure code flexibility and robustness.
* **Design Patterns**: Utilizes design patterns to solve common problems and enhance code readability and efficiency.

## Additional Concepts

* **Atomic Design**: Implements Atomic Design for building a scalable, reusable component system.
* **Husky**: Automates Git hooks to enforce code quality before committing.
* **Lint-staged**: Lints only staged files, ensuring faster checks and cleaner commits.
* **Storybook**: Allows for isolated component development and documentation.

## Project Structure
```
src
├── assets
├── components
├── contexts
├── data
├── domain
├── infra
├── main
└── presentation
```

* **Presentation**: UI components and screens.
* **Domain**: Business logic and use cases.
* **Data**: Repositories, APIs, and data handling.
* **Infra**: External services, third-party integrations.
* **Main**: Project initialization and setup.

## Project Documentation

* [Last Published Storybook](https://storybook-repo.vercel.app/?path=/docs/atoms-custom-button--docs)
* [Last Coverage Report](https://coverage-repo.vercel.app/)