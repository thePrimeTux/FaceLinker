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
  console.log(toggle)
  left = document.getElementById('left');
  right = document.getElementById('right');
  heading = document.getElementById('heading');
  instruction = document.getElementById('instruction');
  toggle_btn = document.getElementById('toggle-btn');
  submit_btn = document.getElementById('submit');
  login_options = document.getElementById('login-options');
  if (toggle === "left") {
    toggle = "right";
    right.style.animation = "right-slide-left 0.5s ease-in forwards";
    left.style.animation = "left-slide-right 0.5s ease-out forwards";
    heading.innerHTML = "Register";
    instruction.innerHTML = "Already a member?";
    toggle_btn.innerHTML = "Login";
    submit_btn.innerHTML = "Register";
    login_options.style.display = "none";
  } else if (toggle === "right") {
    toggle = "left";
    right.style.animation = "right-slide-right 0.5s ease-out forwards";
    left.style.animation = "left-slide-left 0.5s ease-in forwards";
    heading.innerHTML = "Login";
    instruction.innerHTML = "Not a member yet?";
    toggle_btn.innerHTML = "Register";
    submit_btn.innerHTML = "Login";
    login_options.style.display = "flex";
  }
}

