export class Fields {

    constructor(item, element, block) {
        this.item = item;
        this.element = element;
        this.block = block;
    }

    fieldForComment = () => {
        console.log(this.item.name)
        const comment = document.createElement("input");
        comment.setAttribute("type", "text");
        comment.setAttribute("name", this.block + "_" + this.item.name + "_" + "comment");
        comment.setAttribute("placeholder", "Enter your comment");

        this.element.append(comment);
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

        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("id", this.item.name);
        fileInput.setAttribute("name", this.block + "_" + this.item.name + '_' + "image");

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result;
                fileInput.value = base64Data;
                console.log("Base64 data:", base64Data);
            };

            reader.readAsDataURL(file);
        });

        this.element.append(fileInput);
    }

    selectSatUnsatNA = () => {
        //For Select Dropdown
        console.log(this.block)
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

        selectElement.appendChild(option1);
        selectElement.appendChild(option2);
        selectElement.appendChild(option3);

        this.element.append(selectElement);
    }
}