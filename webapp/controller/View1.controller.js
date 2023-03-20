sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, DateFormat) {
        "use strict";

        return Controller.extend("localdataproject.localdatacrudoperationproject.controller.View1", {
            onInit: function () {
                //For Everytime different value
                this.giStudentId = 0;

                // student is var which is declared global
                this.student = {
                    id: this.giStudentId,
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    gender: 0,
                    genderText: "Female",
                    date1: "",
                    fatherName: "",
                    contactNumber: "",
                    alternativeNumber: ""
                };
                // global var for sending that data into model(model which has been binded in the view)
                this.data = {
                    students: [],
                    student: this.student
                };
            },

            onAfterRendering: function () {
                var oModel = new sap.ui.model.json.JSONModel(this.data);
                this.getView().setModel(oModel);
            },

            handleEditStatement: function (oEvent) {
                debugger;
                // this data(oCurrentStudent) is which we get from the row
                var oCurrentStudent = oEvent.getSource().getBindingContext().getObject();
                // setting data into the dialog box for editing
                this.newStudentDialog.getModel().setData(oCurrentStudent);
                this.newStudentDialog.open();
                this.gbEditing = true;
            },

            // oEvent is a default parameter
            handleAddStudent: function (oEvent) {
                debugger;
                if (!this.newStudentDialog) {

                    // To read the fragment & open a dialogbox(this is a global var, which can be accessed anywhere in this particular controller)
                    this.newStudentDialog = sap.ui.xmlfragment("localdataproject.localdatacrudoperationproject.fragments.fragment1", this);

                    // This binding is to set data in dialog box
                    var oModel = new sap.ui.model.json.JSONModel();
                    this.newStudentDialog.setModel(oModel);

                }
                this.student.id = this.giStudentId;
                var data = JSON.parse(JSON.stringify(this.student));
                // This binding is to set data in view
                this.newStudentDialog.getModel().setData(data);
                this.newStudentDialog.open();
            },


            handleCancelBtnPress: function () {
                // this is a global var, which can be accessed anywhere in this particular controller
                this.newStudentDialog.close();
            },

            onlyInteger: function (oEvent) {
                var value = oEvent.getSource().getValue().replace(/[^\d]/g, '');
                oEvent.getSource().setValue(value);
            },

            handleSaveBtnPress: function (oEvent) {
                //get the model
                var oModel = oEvent.getSource().getModel();
                //get the data from model
                var oDialogData = oModel.getData();
                var oViewData = this.getView().getModel().getData();
                var letter2 = /^[A-Za-z]*$/;
                var isNum = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

                // MM/DD/YYYY
                // let dateformat = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
                // DD/MM/YYYY
                let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

                if (this.gbEditing) {
                    for (var i = 0; i < oViewData.students.length > 0; i++) {
                        var temp = oViewData.students[i];
                        if (temp.id == oDialogData.id) {
                            temp = oDialogData;
                            oViewData.students[i] = temp;
                            break;
                        }
                    }
                    if (oDialogData.firstName == "") {
                        MessageBox.error("Please Enter your first name");
                        return false;
                    }
                    if (oDialogData.firstName.match(letter2) === null) {
                        MessageBox.error("Please Enter firstname in Alphabet only");                       
                        oDialogData.firstName = "";
                        return false;
                    }
                    if (oDialogData.middleName == "") {
                        MessageBox.error("Please Enter your Middle name");                         
                        return false;
                    }
                    if (oDialogData.middleName.match(letter2) === null) {
                        MessageBox.error("Please Enter middlename in Alphabet only");                        
                        return false;
                    }
                    if (oDialogData.lastName == "") {
                        MessageBox.error("Please Enter your last name");                        
                        return false;
                    }
                    if (oDialogData.lastName.match(letter2) === null) {
                        MessageBox.error("Please Enter lastname in Alphabet only");                       
                        return false;
                    }
                    if (oDialogData.date1 == "") {
                        MessageBox.error("Please insert any date ");                        
                        return false;
                    }
                    if (oDialogData.date1.match(dateformat) === null) {
                        MessageBox.error("Please insert Date in correct format(MM/DD/YYYY): ");                        
                        return false;
                    }
                    if (oDialogData.fatherName == "") {
                        MessageBox.error("Please Enter your Father's Name ");                        
                        return false;
                    }
                    if (oDialogData.fatherName.match(letter2) === null) {
                        MessageBox.error("Please Enter fathername in Alphabet only ");                        
                        return false;
                    }
                    if (oDialogData.contactNumber == "") {
                        MessageBox.error("Please Enter your contact number");                        
                        return false;
                    }
                    if (oDialogData.contactNumber.match(isNum) === null) {
                        MessageBox.error("Please Enter only numeric value of 10 digit in contact number");                     
                        return false;
                    }
                    if (oDialogData.contactNumber.length > 10) {
                        MessageBox.error("Only 10 digits are allowed in contact number");                        
                        return false;
                    }
                    if (oDialogData.alternativeNumber == "") {
                        MessageBox.error("Please Enter your alternative number");                        
                        return false;
                    }
                    if (oDialogData.alternativeNumber.length > 10) {
                        MessageBox.error("Please enter only 10 digits in alternate number");                        
                        return false;
                    }

                    this.gbEditing = false;
                    this.getView().getModel().setData(oViewData);
                    this.newStudentDialog.close();
                    return;
                }
                oDialogData.genderText = (oDialogData.genderText) ? "Male" : "Female";

                if (oDialogData.firstName == "") {
                    MessageBox.error("Please Enter your first name");
                    return false;
                }
                if (oDialogData.firstName.match(letter2) === null) {
                    MessageBox.error("Please Enter firstname in Alphabet only");
                    //   oDialogData.firstName = "" ;
                    return false;
                }
                if (oDialogData.middleName == "") {
                    MessageBox.error("Please Enter Middle name");                    
                    return false;
                }
                if (oDialogData.middleName.match(letter2) === null) {
                    MessageBox.error("Please Enter middlename in Alphabet only");                    
                    return false;
                }
                if (oDialogData.lastName == "") {
                    MessageBox.error("Please Enter your last name");                    
                    return false;
                }
                if (oDialogData.lastName.match(letter2) === null) {
                    MessageBox.error("Please Enter lastname in Alphabet only");                    
                    return false;
                }
                if (oDialogData.date1 == "") {
                    MessageBox.error("Please insert any date");                    
                    return false;
                }

                if (oDialogData.date1.match(dateformat) === null) {
                    MessageBox.error("Please insert Date in correct format(MM/DD/YYYY):");                    
                    return false;
                }

                if (oDialogData.fatherName == "") {
                    MessageBox.error("Please Enter your Father's Name");                    
                    return false;
                }

                 if (oDialogData.fatherName.match(letter2) === null) {
                   MessageBox.error("Please Enter fathername in Alphabet only");
                     return false;
                 }

                if (oDialogData.contactNumber == "") {
                    MessageBox.error("Please Enter your contact number");                    
                    return false;
                }

                if (oDialogData.contactNumber.length > 10) {
                    MessageBox.error("Only 10 digits are allowed in contact number");
                    return false;
                }

                if (oDialogData.contactNumber.match(isNum) === null) {
                    MessageBox.error("Please Enter only numeric value of 10 digit in Contact Number");
                    return false;
                }

                if (oDialogData.alternativeNumber == "") {
                    MessageBox.error("Please Enter your alternative number");
                    return false;
                }

                if (oDialogData.alternativeNumber.length > 10) {
                    enabled: "false";
                    MessageBox.error("Please Enter only 10 digits in alternate number");
                    return false;
                }

                oViewData.students.push(oDialogData);
                this.getView().getModel().setData(oViewData);
                // For storing everytime different value
                this.giStudentId++;
                this.newStudentDialog.close();
            },

            handleDeleteStatement: function (oEvent) {
                var oCurrentStudent = oEvent.getSource().getBindingContext().getObject();
                var oViewData = this.getView().getModel().getData();
                for (var i = 0; i < oViewData.students.length; i++) {
                    var temp = oViewData.students[i];
                    if (temp.id === oCurrentStudent.id) {
                        //  MessageToast.show("Record Deleted!")
                        oViewData.students.splice(i, 1);
                        alert("Are you sure, you want to delete? ");
                        break;
                    }
                }
                this.getView().getModel().setData(oViewData);
            }
        });
    });

