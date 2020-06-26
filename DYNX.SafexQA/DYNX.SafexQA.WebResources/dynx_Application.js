var DYNX = DYNX || { _namespace: true }
DYNX.Entity = { _namespace: true }
DYNX.Entity.Application = (function () {

    // *******************************************************
    // Application Form functions 
    // *******************************************************


    var formContext;
    // form onload event
    function form_onLoad(executionContext) {
        formContext = executionContext.getFormContext();

    }

    // Generate Document on click of button
    function GenerateDocument(executionContext,Id) {

        Xrm.Utility.showProgressIndicator("Generating Document In Progress..");
        var formContext = executionContext;
        var entityName = "dynx_applications";
        var actionName = "dynx_DynxGenerateDocument";
        var data = { "TemplateName": "Something"};
    
        var globalContext = Xrm.Utility.getGlobalContext();
        var urlPath =  globalContext.getClientUrl();

        var errorText = "";
        var response = null;
        actionName = entityName + "(" + Id[0].replace('{', '').replace('}', '') + ")/Microsoft.Dynamics.CRM." + actionName;
        //Create request
        var req = new XMLHttpRequest();
        req.open("POST", urlPath + "/api/data/v9.1/" + actionName, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        req.onreadystatechange = function () {

            if (this.readyState == 4 /* complete */) {
                req.onreadystatechange = null;

                if (this.status == 200 || this.status == 204) {                   
                    var entityFormOptions = {};
                       entityFormOptions["entityName"] = "dynx_application";
                       entityFormOptions["entityId"] = Id[0].replace('{', '').replace('}', '');
                       Xrm.Navigation.openForm(entityFormOptions, null);
                       Xrm.Utility.closeProgressIndicator();
                       return;

                } else {
                    Xrm.Utility.closeProgressIndicator();
                }
            }
        };
        if (data != null)
            req.send(JSON.stringify(data));
        else
            req.send();

    }
    //Public event handler
    return {
        form_onload: form_onLoad,
        GenerateDocument: GenerateDocument
    }
})();


