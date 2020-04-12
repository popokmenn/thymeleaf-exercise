

const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
var btnSignIn = document.getElementById("btn-signin");

const inputHandler = function (e) {
    if ($('#username').val().length > 4 && $('#password').val().length > 4) {
        btnSignIn.className = "btn btn-primary btn-block";
    } else {
        btnSignIn.className = "btn btn-primary btn-block disabled";
    }
}

$(document).ready(function () {
    inputUsername.addEventListener('input', inputHandler);
    inputUsername.addEventListener('propertychange', inputHandler);
    inputPassword.addEventListener('input', inputHandler);
    inputPassword.addEventListener('propertychange', inputHandler);

    $.validator.setDefaults({
        submitHandler: function () {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            // MD5 encrypt
            var encrptedText = CryptoJS.MD5(password)

            $.ajax({
                url: '/user/login?password=' + encrptedText.toString().toUpperCase() + '&username=' + username,
                method: 'post',
                contentType: 'application/json',
                success: function (res, status, xhr) {
                    if (res) {
                        window.open("/", "_self")
                    }
                },
                error: function (xhr, status, error) {
                    console.log(JSON.parse(xhr.responseText));
                }
            });
        }
    });
    $('#login-form').validate({
        rules: {
            usernaame: {
                required: true,
                minlength: 5
            },
            password: {
                required: true,
                minlength: 5
            },
        },
        messages: {
            usernaame: {
                required: "Please enter a valid username",
                email: "Please enter a vaild email address"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});