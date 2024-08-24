# Feedback Form System - Low-Level Design

## 1. Project Structure

```
feedback-form-system/
├── src/
│ ├── assets/
│ ├── screens/
│ │ ├── Login.jsx
│ │ ├── admin/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── FormBuilder.jsx
│ │ │ └── FormDetail.jsx
│ │ ├── website/
│ │ │ ├── Home.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Services.jsx
│ │ │ └── Contact.jsx
│ ├── components/
│ │ ├── FormFieldComponents/
│ │ │ ├── StarRating.jsx
│ │ │ ├── SmileRating.jsx
│ │ │ ├── TextArea.jsx
│ │ │ ├── RadioButtons.jsx
│ │ │ ├── Categories.jsx
│ │ │ ├── NumericalRating.jsx
│ │ │ └── SingleLineInput.jsx
│ │ └── common/
│ │ ├── FeedbackModal.jsx
│ │ └── Navigation.jsx
│ ├── contexts/
│ │ └── FeedbackFormContext.js
│ ├── hooks/
│ │ ├── useFirestore.js
│ │ └── useFormLogic.js
│ ├── utils/
│ │ ├── formValidation.js
│ │ └── logicHandler.js
│ ├── services/
│ │ └── firebase.js
│ ├── App.js
│ └── index.js
├── public/
│ └── index.html
├── package.json
└── README.md
```

## 2. Component Breakdown

### 2.0 Login Components

#### Login.jsx

- Login screen with username and password
- for admin (username: admin, password: admin)
- for user (username: user, password: user)

### 2.1 Admin Components

#### Dashboard.jsx

- Displays list of all feedback forms
- Option to add new feedback forms
- Uses Material UI components for layout and styling

#### FormBuilder.jsx

- Handles form creation and editing
- Manages state for form fields (max 7)
- Implements drag-and-drop functionality for field reordering
- Handles logic application (page-specific, timed display, etc.)
- Uses Material UI components for form elements and styling

#### FormDetail.jsx

- Displays user submissions with timestamps
- Shows form creation date, viewed count, and submission count
- Displays applied logic
- Uses Material UI for data presentation

#### FormFieldComponents/

- Individual components for each field type (StarRating, SmileRating, etc.)
- Each component handles its own state and validation
- Implements edit/delete functionality
- Uses Material UI form components

### 2.2 Website Components

#### Home.jsx, About.jsx, Services.jsx, Contact.jsx

- Basic website pages
- Implement Material UI for layout and styling

#### FeedbackModal.jsx

- Renders the feedback form in a modal
- Handles form submission and modal closing logic
- Uses Material UI Dialog component

### 2.3 Common Components

#### Navigation.jsx

- Implements website navigation
- Uses Material UI AppBar and Drawer components

## 3. Context and Hooks

### FeedbackFormContext.jsx

- Manages global state for feedback forms
- Provides methods for CRUD operations on forms

### useFirestore.js

- Custom hook for Firestore operations
- Handles data fetching, storing, and updating

### useFormLogic.js

- Custom hook for managing form logic
- Determines when to show feedback form based on set conditions

## 4. Utilities

### formValidation.js

- Implements validation logic for form fields
- Handles custom error messages

### logicHandler.js

- Manages the logic for when to display feedback forms
- Implements page-specific, timed display, and date-based logic

## 5. Services

### firebase.js

- Initializes Firebase/Firestore
- Exports methods for database operations

## 6. Data Models

### Feedback Form

```javascript
{
  id: string,
  title: string,
  fields: [
    {
      type: string,
      label: string,
      required: boolean,
      errorMessage: string,
      options: array // for radio buttons and categories
    }
  ],
  logic: {
    type: string,
    value: any
  },
  createdAt: timestamp,
  viewCount: number,
  submissionCount: number
}
```

## 7. Key Functionalities

### Form Builder:

Implement drag-and-drop using react-beautiful-dnd
Use Material UI components for form fields
Implement field-specific validation and error handling

### Logic Application:

Create a flexible system for applying and managing display logic
Implement logic checks in the website components

### Form Submission:

Handle form submission in FeedbackModal.js
Update Firestore with submission data and counts

### Admin Dashboard:

Fetch and display form data from Firestore
Implement sorting and filtering options

### Website Integration:

Implement logic to show feedback form based on set conditions
Ensure form is not shown again after submission or closing

## 8. Third-party Libraries

**Material UI:** For UI components and styling

**Firebase/Firestore:** For database operations

**react-beautiful-dnd:** For drag-and-drop functionality

**react-router-dom:** For routing in the admin panel and website
