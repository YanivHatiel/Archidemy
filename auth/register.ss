
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Register</title>
</head>
<body>

  <h1>Register</h1>
  <form id="registerForm">
    <label for="email">University Email:</label>
    <input type="email" id="email" placeholder="name@university.edu" required />

    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="Enter password" required />

    <button type="submit">Register</button>
  </form>

  <p id="message"></p>

  <script type="module">
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

    const auth = getAuth();

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email.endsWith("@university.edu")) {
        document.getElementById('message').innerText = "Please use a valid university email address.";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        document.getElementById('message').innerText = "Registration successful! Please check your email for verification.";
      } catch (error) {
        document.getElementById('message').innerText = `Error: ${error.message}`;
      }
    });
  </script>
</body>
</html>
