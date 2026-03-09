GitHub Issues Tracker:

### **API Endpoints:**

### **All Issues:**

- https://phi-lab-server.vercel.app/api/v1/lab/issues

### **Single Issue:**

- https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}

- Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33

### **Search Issue:** https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

- Example: https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications

---

## 📝 Main Requirements

## 🎨 Design Part

## Login Page

- Create a login page containing a logo, title, and sub-title
- Below that, there will be 2 inputs, a sign-in button, and a demo credential to sign in. Follow the Figma for this page
- Styled as per Figma

## Main Page:

### Navbar:

- Navbar with website logo/name on the left
- Search input and button on the right

### Tab Section like Figma:

- 3 tab ( All, Open, Closed) at the top of this section.(**All**, **Open**, **Closed**)

- Below the tab, there will be an icon, the issue count, some text on the left, and an open and closed marker on the right

- Responsiveness: The website should be responsive for mobile devices. It is totally up to you.

---

## ⚙️ Functionalities

- In login page, there will be default admin credentials (username, password). You need to sign in using these credentials.

- Load all issues and display as per Figma

- On clicking on an open or closed tab, it will load the issues data of the related tab and show it in a display-like card in a 4-column layout like Figma. By default, it will show all data

- Each card shows:
  - Title
  - Description
  - Status
  - Category
  - Author
  - Priority
  - Label
  - CreatedAt
- Clicking on a tree name in a card will open a modal and show all the information about that Issue.

## 🛠️ Technology Stack

- **HTML**
- **CSS** (Vanilla/Tailwind/DaisyUI)
- **JavaScript** (Vanilla)

## 🔑 Demo Credentials

```text
Username: admin
Password: admin123


```

1.What is the difference between var, let, and const?
Ans:- Basically, they all are used to store data, but the main difference is how they behave with Scope and Re-assignment.

1. var: It is the old way of declaring variables. It is Function Scoped, which means it doesn't care about blocks like if or for. Also, we can declare the same variable name again and again, which can create confusion in big projects.

2. let: It is the modern and safer version of var. It is Block Scoped, so it only works inside the curly braces { } where it is defined. We cannot re-declare it in the same block, but we can update its value later.

3. const: It is used for values that should stay the same. Once we assign a value to a const, we can't change it. Like let, it is also Block Scoped.

2.What is the spread operator (...)?
Ans:- The Spread Operator is just three dots (...), but it’s super useful.
The 3 main things it does:

1.Making a Quick Copy:
Instead of manually copying every item, we can just do const copy = [...originalArray];. It creates a brand new copy so if you change one, the other stays safe.

2.Combining Arrays:
If we have two lists (like fruits and vegetables) and we want to put them into one big list, we just "spread" both of them: const groceryList = [...fruits, ...vegetables];.

3.Updating Objects:
We use it a lot to update an object. For example, if we want to change only the "status" of an issue but keep the "title" and "id" the same, we spread the old object and just change that one part.

3.What is the difference between map(), filter(), and forEach()?
Ans:- Actually, all three are used to loop through an array, but they have different purposes. Here is how I understand them:

1. forEach() – The "Just do it" loop
   Think of forEach like a simple for loop. It goes through every item in the array and does something (like a console.log or updating a variable).

Key Point: It doesn't return anything. It just executes a function for each element.

Example: Using it to print all the issue titles in the console.

2. map() – The "Transformer"
   map is used when we want to create a new array by changing every item of an existing array.

Key Point: It always returns a new array of the same length.

Example: In our project, we used map() to convert the labels array into HTML tags (like <span>). It took the label name and "transformed" it into a piece of HTML.

3. filter() – The "Selector"
   As the name suggests, filter is used to pick only specific items from an array based on a condition.

Key Point: It returns a new array, but only with the items that pass the "test."

Example: When we clicked the "Open" button, we used filter() to create a new list that only includes issues where status === "open".

4. What is an arrow function?
   Ans:- In simple words, an Arrow Function is a newer and shorter way to write functions in JavaScript. It was introduced in ES6 to make the code look cleaner and more readable. Instead of using the function keyword, we use a "fat arrow" =>.
   Why it’s better (In my opinion):

1.Cleaner Code: We don't have to write the word function or use curly braces {} and return if the function is only one line.

2.Implicit Return: If the function has only one line of code, it automatically returns the value without needing the return keyword.

3.Modern Look: It makes the code look more professional, especially when using things like map or filter.

5.What are template literals?
Ans:- Template literals are a modern way to handle strings in JavaScript. Instead of using single quotes (' ') or double quotes (" "), we use backticks (`). It makes working with strings much easier, especially when we need to mix variables with text.

-- Dynamic Variables: Instead of using the plus sign (+) many times to join text and variables, we can just use the ${variable} syntax. It’s way cleaner.

-- Multi-line Strings: Before template literals, if we wanted to write something on a new line, we had to use \n. With backticks, we can just press "Enter" and write on the next line—it works perfectly.

-- HTML Templates: It’s great for creating HTML dynamically from JavaScript.
