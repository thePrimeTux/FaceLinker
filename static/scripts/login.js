togglePassword();

var toggle = "left"

function togglePassword(){
  const input = document.getElementById('login-pass')
  const eyeIcon = document.getElementById('login-eye')

  eyeIcon.addEventListener('click', () =>{
    if(input.type === 'password'){
       input.type = 'text'

       eyeIcon.classList.add('ri-eye-line')
       eyeIcon.classList.remove('ri-eye-off-line')
    } else{
       input.type = 'password'

       eyeIcon.classList.remove('ri-eye-line')
       eyeIcon.classList.add('ri-eye-off-line')
    }
 })
}

function toggleLogin() {
  const left = document.getElementById('left');
  const right = document.getElementById('right');
  const heading = document.getElementById('heading');
  const instruction = document.getElementById('instruction');
  const toggle_btn = document.getElementById('toggle-btn');
  const submit_btn = document.getElementById('submit');
  const login_options = document.getElementById('login-options');
  const form = document.getElementById('login-form');
  const alert = document.getElementById('alert');

  if (toggle === "left") {
    toggle = "right";
    right.style.animation = "right-slide-left 0.5s ease-in forwards";
    left.style.animation = "left-slide-right 0.5s ease-out forwards";
    heading.innerHTML = "Register";
    instruction.innerHTML = "Already a member?";
    toggle_btn.innerHTML = "Login";
    submit_btn.innerHTML = "Register";
    login_options.style.display = "none";
    alert.innerHTML = ""
    form.action = "/register";
  } else if (toggle === "right") {
    toggle = "left";
    right.style.animation = "right-slide-right 0.5s ease-out forwards";
    left.style.animation = "left-slide-left 0.5s ease-in forwards";
    heading.innerHTML = "Login";
    instruction.innerHTML = "Not a member yet?";
    toggle_btn.innerHTML = "Register";
    submit_btn.innerHTML = "Login";
    login_options.style.display = "flex";
    form.action = "/login";
  }
}

