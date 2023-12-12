//your JS code here. If required.
const codeContainer = document.querySelector(".code-container");
codeContainer.addEventListener("submit", (event) => {

    event.preventDefault();

    setTimeout(postSubmitEvent, 400);

    function postSubmitEvent() {
        alert("submitted otp");
        codeContainer.reset();
        inputList[0].focus();
    }

})

const inputList = Array.from(codeContainer.querySelectorAll("input"));
// first input is focused by default
inputList[0].focus();

for (let inputElement of inputList) {    

    inputElement.addEventListener("input", inputEventHandler.bind(inputElement));

    inputElement.addEventListener("keydown", tabAndBackspaceHandler.bind(inputElement));
}

function inputEventHandler(event) {
    this.value = event.data;

    // if(onSubmitValidation()) {
    //     codeContainer.requestSubmit();
    //
    this.blur();

    if (this.nextElementSibling) {
        this.nextElementSibling.focus();
    }
    else {
        if (onSubmitValidation()) {
            codeContainer.requestSubmit();
        }
        else {
            setTimeout(()=> {
                alert("all fields not filled");
            }, 100);
        }
    }
}

function tabAndBackspaceHandler(event) {
    console.log(event);

    if (event.code === 'Tab') {
        event.preventDefault();
    }
    if (event.code === 'Backspace') {
        // default action and then go to previous input

        event.preventDefault();

        this.value = this.value.slice(0, -1);

        if (this.previousElementSibling) {
            this.blur();
            this.previousElementSibling.focus();
        }
    }
}

function onSubmitValidation() {
    if (inputList.find((element) => {
        return (element.value === '');
    }) != undefined) {
        console.error("blank field in otp");
        return false;
    }
    return true;
}
