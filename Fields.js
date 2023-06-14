export class Fields {

    constructor(item, element, block) {
        this.item = item;
        this.element = element;
        this.block = block;
    }

    fieldForComment = () => {
        const comment = document.createElement("input");
        comment.setAttribute("type", "text");
        comment.setAttribute("name", this.block + "_" + this.item.name + "_" + "comment");
        comment.setAttribute("placeholder", "Enter your comment");

        this.element.append(comment);
    }

    fieldForColor = () => {
        const color = document.createElement("input")
        color.setAttribute("type", "color")
        color.setAttribute("name", this.block + "_" + this.item.name + "_" + "color")

        return color;
    }

    titleForQuestion = () => {
        //For Label of Field
        var newLabel = document.createElement("input");
        newLabel.setAttribute("type", "text");
        newLabel.setAttribute(
            "id",
            "dynamic_lab_" + Math.floor(Math.random() * 10000000000)
        );
        // newLabel.setAttribute("disabled", true)
        newLabel.setAttribute("name", this.block + "_" + this.item.name + "_title");
        if(this.item.title){
            newLabel.setAttribute("value", this.item.title);

        }else{
            newLabel.setAttribute("value", "New Section");
        }
        newLabel.setAttribute(
            "style",
            "border: 0px; color: mediumseagreen; font-size: 15px; font-weight: bold;"
        );

        this.element.append(newLabel);
    }

    createFileField = () => {
        const fileInput = document.createElement("input");
        const selectedFiles = [];

        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("id", this.item.name);
        fileInput.setAttribute("name", this.block + "_" + this.item.name + '_' + "image");
        fileInput.setAttribute("multiple", true);

        this.element.append(fileInput);
    }

    selectSatUnsatNA = () => {
        //For Select Dropdown
        const selectElement = document.createElement("select");
        selectElement.name = this.block + "_" + this.item.name + "_" + 'Response';
        const defaultOption = document.createElement("option");
        defaultOption.text = "Select an option"; // Set the default value text
        defaultOption.value = ""
        defaultOption.selected = true; // Set it as the default selected option
        selectElement.add(defaultOption);

        const option1 = document.createElement("option");
        option1.setAttribute("value", "SAT");
        option1.innerHTML = "SAT";

        const option2 = document.createElement("option");
        option2.setAttribute("value", "UNSAT");
        option2.innerHTML = "UNSAT";

        const option3 = document.createElement("option");
        option3.setAttribute("value", "NA");
        option3.innerHTML = "NA";
        selectElement.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            let color = document.createElement("input")
            color.setAttribute("type", "color")
            color.setAttribute("name", this.block + "_" + this.item.name + "_" + "color")
            color.setAttribute("id", this.block + "_" + this.item.name + "_" + "colorID")
            // if(event.target.value)
            if(event.target.value === "UNSAT"){
                selectElement.after(color);
            }else{
                const del = document.getElementById(this.block + "_" + this.item.name + "_" + "colorID");
                del.remove();
            }
            // Виконати код, який потрібно виконати при зміні значення
            // Наприклад, викликати функцію або оновити інші елементи сторінки
        });

        selectElement.appendChild(option1);
        selectElement.appendChild(option2);
        selectElement.appendChild(option3);

        this.element.append(selectElement);
    }
}