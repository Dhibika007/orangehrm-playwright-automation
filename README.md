# OrangeHRM Automation Framework – Playwright (TypeScript)

## Overview

This project contains automated UI test cases for the OrangeHRM demo application using **Playwright with TypeScript**.

The framework follows the **Page Object Model (POM)** design pattern with reusable component abstractions to ensure scalability, maintainability, and clean separation of concerns.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

## Project Structure

├── pageObjects
│ ├── pages
│ │ ├── DashboardPage.ts
│ │ └── PIMPage.ts
│ └── components
│ ├── LoginComponent.ts
│ ├── EmployeeFormComponent.ts
│ └── EmployeeTableComponent.ts
│
├── tests
│ ├── auth.setup.ts
│ ├── dashboard.spec.ts
│ └── employee-workflow.spec.ts
│
├── utils
│ └── testdata.ts
│
├── playwright.config.ts
└── README.md


---

## Framework Highlights

- Dedicated authentication setup using `auth.setup.ts`
- Session reuse via `storageState.json`
- Component-level abstraction for reusable UI sections
- Dynamic test data generation
- Explicit synchronization for improved stability

---

## Installation & Setup

### 1. Clone the repository

git clone <repository-url>
cd <repository-name>


### 2. Install dependencies

npm install


### 3. Install Playwright browsers

## Running Tests

### Run all tests

npx playwright test


### Run a specific test file

npx playwright test tests/dashboard.spec.ts

### To run headed mode
npx playwright test --headed

### To run in specific browser
npx playwright test --project=chromium

### Run Tests in UI Mode
npx playwright test --ui

### Run Tests in Debug Mode
npx playwright test --debug


---

## Authentication Handling

Authentication is handled through a dedicated setup project:

- `auth.setup.ts` performs login
- Authenticated session is saved as `storageState.json`
- All test projects reuse this session

---

## Test Coverage

- Login validation
- Dashboard verification
- PIM module navigation
- Add Employee
- Mandatory field validation
- Search Employee
- Delete Employee

## Author

Dhibika Gopi
