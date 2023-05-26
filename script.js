import {Fields} from "./Fields.js";
import {getDataFromJson} from './getDataFromJSON.js';

const createTextField = (items, fieldset, block) => {
    const container = document.createElement('div');
    container.classList.add('form-group');

// Створюємо елемент <input> для поля вводу з класом "form-control"
    const inputElement = document.createElement('input');
    inputElement.type = items.type;
    inputElement.name = block.name + '_' + items.name + '_value';
    inputElement.setAttribute("required", true);
    if(items.placeHolder){
        inputElement.placeholder = items.placeHolder;

    }else{
        inputElement.placeholder = '';

    }
    inputElement.classList.add('form-control');

    const classForFields = new Fields(items, container, block.name);

    classForFields.titleForQuestion()
    container.appendChild(inputElement);
    classForFields.selectSatUnsatNA();
    classForFields.fieldForComment();
    classForFields.createFileField();
    fieldset.append(container);
}
const createDropDown = (item, fieldset, block) => {
    const newselect = document.createElement("select");
    const container = document.createElement('div');
    container.classList.add('form-group');

    // console.log(block.name)
    // newselect.setAttribute("name", block.name + '_' + item.name + '_value');
    newselect.setAttribute( "name", block.name + '_' + item.name + '_value');
    newselect.setAttribute("required", true);

    const defaultOption = document.createElement("option");
    defaultOption.text = "Select an option"; // Set the default value text
    defaultOption.value = ""
    defaultOption.selected = true; // Set it as the default selected option
    newselect.add(defaultOption);

    item.choices.forEach(value => {
        console.log(value === undefined)
        if(value !== undefined) {
            const optionElement = document.createElement("option");
            optionElement.text = value;
            newselect.add(optionElement);
        }
    });
    const classForFields = new Fields(item, container, block.name);
    classForFields.titleForQuestion()
    container.appendChild(newselect);
    classForFields.selectSatUnsatNA();
    classForFields.fieldForComment();
    classForFields.createFileField();
    fieldset.append(container);
}

const createCheckBox = (item, fieldset, block) => {
    const newselect = document.createElement("select");
    const container = document.createElement('div');
    container.classList.add('form-group');

    newselect.setAttribute("name", block.name + "_" + item.name + '_value');

    const defaultOption = document.createElement("option");
    defaultOption.text = "Select an option"; // Set the default value text
    defaultOption.value = ""
    defaultOption.selected = true; // Set it as the default selected option
    newselect.add(defaultOption);

    item.choices.forEach(value => {
        console.log(value === undefined)
        if(value !== undefined) {
            const optionElement = document.createElement("option");
            optionElement.text = value;
            newselect.add(optionElement);
        }
    });
    const classForFields = new Fields(item, container, block.name);
    classForFields.titleForQuestion()
    container.appendChild(newselect);
    classForFields.selectSatUnsatNA();
    classForFields.fieldForComment();
    classForFields.createFileField();
    fieldset.append(container);
}

const createFile = (item, fieldset, block) => {
    const divElement = document.createElement("div");
    const classForFields = new Fields(item, divElement, block.name);



    classForFields.titleForQuestion();
    classForFields.createFileField();
    classForFields.selectSatUnsatNA();
    classForFields.fieldForComment()

    fieldset.appendChild(divElement);
}

const createFieldSet = (item, form, fieldset, legend) => {
    const sectionTitleInput = document.createElement("input");

    sectionTitleInput.setAttribute("type", "text");
    sectionTitleInput.setAttribute("id", "first_sec01");
    sectionTitleInput.setAttribute("placeholder", "New Section");
    sectionTitleInput.setAttribute(
        "style",
        "border: 0px; color: royalblue; font-size: 15px; font-weight: bold;"
    );
    sectionTitleInput.value = item.name;

    legend.appendChild(sectionTitleInput);
    fieldset.appendChild(legend);
    form.append(fieldset)
}

const createBtnForNewBlock = (item, fieldset, block) => {
    console.log("BLOCK", block)
    //Add New Fields in Each Section
    const addButton = document.createElement("button");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("class", "add-btn");
    addButton.innerHTML =
        "<i class='fas fa-plus' style='font-size:10px'></i>";
    fieldset.appendChild(addButton);

    // Initialize counter variable
    let fieldCount = 0;

    addButton.addEventListener("click", function () {
        // Increment counter variable
        fieldCount++;
        createTextField({
            isRequired:false,
            name:"Question" + Math.floor(Math.random() * 10000000000),
            title:"",
            type:"text",
        }, fieldset, block)
        addButton.remove();
        createBtnForNewBlock(item, fieldset, block);

        // Initialize counter variable
    });
    // createBtnForNewBlock(item, fieldset, block)
    // form.insertBefore(fieldset, addSectionButton);
}

const createNewSection = (form) => {
        // Add a button to create a new section
    var addSectionButton = document.createElement("button");
    addSectionButton.setAttribute("type", "button");
    addSectionButton.setAttribute("style", "background-color:slategray;");
    addSectionButton.innerHTML =
        "<i class='fas fa-border-none' style='font-size: 24px;'></i>";
    form.append(addSectionButton);
        // Add event listener to create a new section when button is clicked
    addSectionButton.addEventListener("click", function () {
        var section = {
            title: "New-Section",
            fields: []
        };

        var fieldset = document.createElement("fieldset");
        var legend = document.createElement("legend");

        var sectionTitleInput = document.createElement("input");
        sectionTitleInput.setAttribute("type", "text");
        sectionTitleInput.setAttribute(
            "style",
            "border: 0px; color: royalblue; font-size: 15px; font-weight: bold;"
        );
        sectionTitleInput.value = section.title;
        sectionTitleInput.addEventListener("input", function () {
            section.title = sectionTitleInput.value;
        });

        legend.append(sectionTitleInput);
        fieldset.appendChild(legend);
        form.insertBefore(fieldset, addSectionButton)

        createBtnForNewBlock([], fieldset, {name: 'New-Block' + Math.floor(Math.random() * 10000000000)});
    });
}

getDataFromJson()
    .then(data => {
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("id", "myForm");
        form.setAttribute("action", "");

        console.log(form)
        // createFieldSet(data, form, fieldset, legend);
        data.pages.map(item => {
            const fieldset = document.createElement("fieldset");
            const  legend = document.createElement("legend");

            createFieldSet(item, form, fieldset, legend);
            item.elements.map(items => {
                switch (items.type){
                    case 'file':
                        createFile(items, fieldset, item);
                        break;
                    case 'dropdown':
                        createDropDown(items, fieldset, item);
                        break;
                    case 'checkbox':
                        createCheckBox(items, fieldset, item);
                        break;
                    case 'text':
                        createTextField(items, fieldset, item);
                        break;
                    default: console.log('havent function');
                }
            })
            createBtnForNewBlock(item, fieldset, item)
        })
        const formContainer = document.getElementById('form-container');

        createNewSection(form);

        const submitButton = document.createElement("button");
        submitButton.setAttribute("type", "button");
        submitButton.setAttribute("class", "submit-button");
        submitButton.setAttribute("style", "display: flex;margin-inline: auto;");

        submitButton.innerHTML = "<span> Submit </span>";

        submitButton.addEventListener("click", function() {
            const formData = new FormData(document.getElementById("myForm")); // Отримуємо дані з форми
            const serializedData = Object.fromEntries(formData); // Перетворюємо FormData на об'єкт
            console.log(serializedData)
            console.log(serializedData); // Виводимо дані в консоль або виконуємо інші дії з ними
            const pages = [];

            function findQuestion(page, questionName) {
                return page.elements.find(question => question.name === questionName);
            }

            Object.keys(serializedData).forEach(key => {
                const [pageName, questionNumber, field] = key.split("_");
                const fieldName = field.replace(/([A-Z])/g, "_$1").toLowerCase(); // Convert camelCase to snake_case

                let page = pages.find(page => page.name === pageName);
                if (!page) {
                    page = { name: pageName, elements: [] };
                    pages.push(page);
                }
                const questionName = questionNumber;
                let question = findQuestion(page, questionName);

                if (!question) {
                    question = { name: questionName };
                    page.elements.push(question);
                }
                    question.title = serializedData[key.replace(field, "title")];
                    question.Response = serializedData[key.replace(field, "Response")];
                    question.comments = serializedData[key.replace(field, "comment")];

                const file = serializedData[key.replace(field, "image")];
                const reader = new FileReader();

                reader.onload = () => {
                    const base64Data = reader.result;
                        question.image = base64Data === 'data:' ? '' : base64Data;
                };

                reader.readAsDataURL(file);

                // question.image = serializedData[key.replace(field, "image")];
            });
            console.log(pages);
        });

        form.append(submitButton)
        formContainer.append(form)

    })