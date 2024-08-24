### **Task Brief**

Develop a system where users can create multiple feedback forms with a minimum of 1 and a maximum of 7 fields, including Star Rating, Smile Rating, Text Area, Radio Buttons, Categories, Numerical Rating, and Single Line Input. Each field should allow editing of labels, required status, and error messages. Users can rearrange fields using drag-and-drop, with edit/delete. Users can apply a minimum of one logic or more (e.g., specific pages, timed display). Once the form is submitted or the modal is closed, the form should not be shown again.

### **Figma design link :**

https://www.figma.com/design/5WH64DX6tESBP8lv3K35s5/Custom-Feedback-Form-Builder?node-id=0-1&t=CIm1RPxv2Mmw93SG-1

### **Admin Panel Pages:**

1. Dashboard:

   - List all feedback forms created by the user.
   - Include an option to add new feedback forms.

2. Form Creation and Editing:

   - Users can create and edit forms with a minimum of 1 and a maximum of 7 fields.
   - Fields include: Star Rating, Smile Rating, Text Area, Radio Buttons, Categories, Numerical Rating, and Single Line Input.
   - Text Area, Numeric Rating, Star Rating, Smiley Rating, Single Line Input allow users to change the label, set required fields, and define custom error messages.
   - Radio Button and Categories allow users to change the label, set required fields, define error messages, and edit options.
   - Same field types can be added multiple times in the same form (e.g., adding two or more star ratings).
   - If the “required” field is active, show the error message field to add a custom message.
   - Fields can be rearranged using drag-and-drop, with edit/delete options.
   - Users can apply at least one or more logic options (e.g., display on specific pages, timed display or specific dates).
   - Once the feedback form is published, hide the publish button. When editing the form again, only show the Save button.

3. Feedback Form Detail Page:

   - Display all user submissions with timestamps.
     Show the form’s creation date, viewed count, and submission count.
     Display the logic applied to the form (e.g., specific pages, timed display, or specific dates).

### **Website:**

Display the feedback form in a modal on the website, triggered based on logic set in the admin panel (e.g., specific pages, timed display, etc.).
Once a form is submitted or the modal is closed, prevent it from showing again.
When creating the website, you can use any free online resources. Ensure it contains multiple pages such as Home, About, Services, and Contact Us.
Feedback Storage:
Use Firebase Firestore or another database to store user submissions with timestamps, viewed count, and submission count.
Store the complete form structure and field values for future management.

### **UI Library:**

Use Material UI or any UI library of your choice for styling and layout of the admin panel.
Note: Admin panel and website should be developed within the same project. and No need to integrate admin login functionality.

### **Deliverables:**

Source code in a GitHub repository.
Host the project on Vercel, Netlify, or another platform, and share the link.
Judging Criteria:
Functionality: Correct form creation, storage, and display logic.
User Experience: Easy-to-use admin panel and feedback management.
Code Quality: Maintainable and well-structured code.
Performance: Efficiently handle multiple forms and feedback data.
Error Handling: Proper validation and user-friendly error messages.
