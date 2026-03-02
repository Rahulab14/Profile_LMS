# Low-Level Design (LLD)

## 1. Architecture Diagram
```
+--------------------+        HTTP/JSON        +----------------------+
|  React Frontend    | <=====================> |   Node.js Backend    |
|  (Vite+Tailwind)   |                         |  (Express+SQLite)    |
+---------+----------+                         +----------+-----------+
          |                                               |
          | (Real-time reload)                            | (SQL Gen)
          v                                               v
+---------+----------+                         +----------+-----------+
|   Chatbot Widget   |                         |   Gemini / OpenAI    |
| (Model Selection)  |                         |   (via ai.service)   |
+--------------------+                         +----------------------+
```

## 2. API Contracts

### Authentication
- `POST /auth/register` -> `{ name: "...", email: "...", password: "..." }`
- `POST /auth/login` -> `{ email: "...", password: "..." }` | Returns: `{ token: "...", user: {} }`

### Profile Management
- `GET /profile/me` (Header: Bearer Token) | Returns: `{ personal_info: {}, education: {}, course_info: {} }`
- `PUT /profile/update` (Header: Bearer Token) | Body: `{ personal_info: {}, education: {}, course_info: {} }`

### Chatbot
- `POST /chat/query` (Header: Bearer Token) | Body: `{ message: "...", model: "gemini|openai" }` | Returns: `{ reply: "...", success: true, updateOccurred: true }`

## 3. Database Schema
Managed via `src/config/db.js`. 
- **users**: `id, email, password_hash`
- **personal_info**: `user_id, name, dob, gender, email`
- **education**: `user_id, board_10, percentage_10, board_12, percentage_12`
- **course_info**: `user_id, course_enrolled, application_status, courses_count, modules_count, certificates_count`

## 4. NLP -> SQL Mapping Logic
The `ai.service.js` utilizes either Google Gemini (1.5-flash) or OpenAI (gpt-4o-mini) to translate user intent into JSON:
```json
{
  "sql": "UPDATE education SET percentage_10 = 90 WHERE user_id = 1",
  "message": "I've updated your 10th result to 90%.",
  "updateOccurred": true
}
```
The backend executes the query if it is a sanctioned `SELECT` or `UPDATE` operation, restricted by the `user_id` scope to ensure data privacy and integrity.
