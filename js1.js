function InspectionTemplateOnChange(executionContext) {
    var formContext = executionContext.getFormContext();
    /* var wrControl = formContext.getControl("WebResource_MyWebResource");
    if (wrControl) {
        wrControl.getContentWindow().then(
            function (contentWindow) {
                contentWindow.setClientApiContext(Xrm, formContext);
            }
        )
    } */
    Xrm.WebApi.retrieveRecord("msdyn_inspectiondefinition", "882ea8b1-b5d2-ed11-a7c7-0022482bc744", "?$select=msdyn_jsoncontent").then(
        function success(result) {
            console.log(result);
            // Columns
            var msdyn_inspectiondefinitionid = result["msdyn_inspectiondefinitionid"]; // Guid
            var msdyn_jsoncontent = result["msdyn_jsoncontent"]; // Multiline Text
            var decodedString = atob(msdyn_jsoncontent);

            console.log(decodedString);
            var decodedData = decodeURIComponent(decodedString);
            var jsonObject = JSON.parse(decodedData);
            console.log(jsonObject);

        },
        function (error) {
            console.log(error.message);
        }
    );
}