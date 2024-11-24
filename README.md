# Angular Material Demo with RxJS Examples

A comprehensive Angular application demonstrating Material Design components, RxJS operators, and modern Angular best practices.

## Features

- 🎨 Angular Material Design
- 📦 Standalone Components
- 🔄 RxJS Operators Examples
- 🎯 Signal-based State Management
- 🚀 Lazy Loading
- 📱 Responsive Design
- 🔍 Search & Filtering
- 📄 Pagination

## Best Practices for Signal-Based Standalone Applications

### Do's ✅

#### Architecture

1. **State Management**

   - Keep state logic in dedicated services
   - Use computed signals for derived state
   - Implement state immutability
   - Use effect() for side effects

2. **Component Design**

   - Keep components focused and small
   - Use standalone components for better tree-shaking
   - Implement smart/dumb component pattern
   - Use signals for component state

3. **Performance**

   - Lazy load routes and features
   - Use trackBy with ngFor
   - Implement change detection strategies
   - Cache HTTP responses when appropriate

4. **Scalability**

   - Follow feature-based folder structure
   - Create shared modules for common functionality
   - Implement proper error boundaries
   - Use TypeScript strict mode

5. **Maintenance**
   - Document signal dependencies
   - Write unit tests for signal logic
   - Use consistent naming conventions
   - Keep services single-responsibility

## Signal-Based Architecture Best Practices

### Do's ✅

#### 1. Signal Design

- Keep signals private when possible to encapsulate state
- Use computed signals for derived state
- Implement proper cleanup in components
- Use effect() for handling side effects
- Follow unidirectional data flow

#### 2. Performance

- Batch related signal updates
- Use untracked() for performance optimization
- Implement proper change detection strategies
- Cache computed results when appropriate
- Avoid unnecessary signal updates

#### 3. State Management

- Centralize state in dedicated services
- Use computed signals for filtering/sorting
- Implement immutable state updates
- Handle loading and error states
- Cache API responses when appropriate

#### 4. Component Architecture

- Keep signal logic in services
- Use smart/dumb component pattern
- Implement proper cleanup
- Handle component lifecycle
- Follow single responsibility principle

#### 5. Testing

- Test signal logic in isolation
- Mock signal dependencies
- Test computed signal outputs
- Verify effect behaviors
- Test error scenarios

### Don'ts ❌

#### Architecture

1. **State Management**

   - Don't mix signals with BehaviorSubject/Subject
   - Avoid multiple sources of truth
   - Don't mutate signal values directly
   - Don't use signals for static data

2. **Component Design**

   - Don't create large monolithic components
   - Avoid deep component nesting
   - Don't mix template and business logic
   - Avoid two-way binding when unnecessary

3. **Performance**

   - Don't create unnecessary computed signals
   - Avoid excessive signal updates
   - Don't ignore memory leaks
   - Don't skip unsubscribing from observables

4. **Scalability**

   - Don't duplicate signal logic
   - Avoid tight coupling between components
   - Don't ignore TypeScript types
   - Avoid global state when unnecessary

5. **Maintenance**
   - Don't skip error handling
   - Avoid complex signal chains
   - Don't ignore code documentation
   - Avoid premature optimization

#### 1. Signal Anti-patterns

- Don't expose mutable signals publicly
- Avoid mixing signals with BehaviorSubject
- Don't create unnecessary computed signals
- Avoid circular signal dependencies
- Don't mutate signal values directly

#### 2. Performance Issues

- Don't create signals in templates
- Avoid excessive signal updates
- Don't skip cleanup in components
- Avoid deep signal dependencies
- Don't ignore memory leaks

#### 3. State Management

- Don't mix different state management patterns
- Avoid multiple sources of truth
- Don't skip error handling
- Avoid global state when unnecessary
- Don't ignore state initialization

#### 4. Component Design

- Don't create signals in loops
- Avoid complex signal chains
- Don't skip signal typing
- Avoid prop drilling with signals
- Don't ignore signal lifecycle

#### 5. Testing Mistakes

- Don't test implementation details
- Avoid testing computed internals
- Don't skip error case testing
- Avoid complex signal mocks
- Don't ignore cleanup testing
