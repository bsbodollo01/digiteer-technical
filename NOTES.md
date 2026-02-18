# Full-Stack Evaluator Notes

## What I Implemented
- Backend:
  - TasksController with full CRUD (Create, Read, Update, Delete)
  - GetById endpoint for CreatedAtAction
  - UserId validation to prevent foreign key errors
- Frontend:
  - `tasksApi.js` service layer using axios
  - `Tasks.jsx` component
    - Loading, error, and empty states
    - Task creation, deletion, and toggle completion
    - Partial data handling (title or isDone missing)
- Environment configuration:
  - `.env` with `VITE_API_BASE_URL` for frontend

## What’s Missing / Could be Improved
- Authentication (currently uses hardcoded `userId: 1`)
- Update and create forms could be split into separate components
- Styling/UI enhancements for better user experience

# Full-Stack Evaluator Notes

## How to Test Your Changes

Follow these steps to run both the backend and frontend and test the full functionality:

---

### 1️⃣ Backend Setup (ASP.NET Core)
1. Navigate to the backend folder:

`cd backend`

2. Restore NuGet packages:

`dotnet restore`

3. Run the backend API:

`dotnet run`

4. Verify the API is running (By default, it should be available at:):

`https://localhost:5001`
`http://localhost:5000`

Test endpoints with a browser or Postman:

`GET /tasks` → should return an empty list initially

`POST /tasks` → create a new task (must include userId)

`PUT /tasks/{id}` → update a task

`DELETE /tasks/{id}` → remove a task

### 1️⃣ Frontend Setup (React + Vite)
1. Navigate to the frontend folder:

`cd frontend`

2. Install dependencies:

`npm install`

3. Create an .env file in the frontend root if it doesn’t exist:

`VITE_API_BASE_URL=http://localhost:5000`

Note: Make sure the URL matches your backend running port.

4. Start the frontend:

`npm run dev`

5. Open your browser and visit the URL shown (usually http://localhost:5173/).

### Testing the Task Features

1. View tasks

When the page loads, you should see a list of tasks.

If no tasks exist, it should display:

`No tasks found. Add one below!`


2. Create a task

Enter a task title in the form and click Add Task.

The new task should appear in the list immediately.

Task is associated with a valid userId (default 1 in testing).

3. Toggle completion

Click on the task title to mark it as done/not done.

The strike-through style and ✅/❌ icon should update instantly.

4. Delete a task

Click the Delete button next to a task.

Confirm deletion in the prompt.

Task should disappear from the list.

5. Error handling

Try stopping the backend and refreshing the frontend:

You should see an error message:

`Failed to load tasks. Please try again.`


Test submitting a task with empty title → browser prevents submission.

6. Partial data handling

API may return tasks missing title or isDone.

Component displays "Untitled Task" for missing titles and defaults isDone to false.